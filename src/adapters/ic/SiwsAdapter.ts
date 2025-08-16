// Placeholder for the Solana SIWS Adapter
import { Adapter, Wallet } from "../../types/index.d";
import {
  HttpAgent,
  ActorSubclass,
  AnonymousIdentity,
  Identity,
  Actor,
} from "@dfinity/agent";
import {
  WalletAdapterNetwork,
  type Adapter as SolanaAdapter,
  type MessageSignerWalletAdapterProps,
  WalletReadyState,
} from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import { 
  Connection, 
  PublicKey, 
  Transaction,
  TransactionInstruction,
  SystemProgram, 
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  SendOptions 
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAccount,
  TokenAccountNotFoundError
} from "@solana/spl-token";
import {
  Ed25519KeyIdentity,
  DelegationIdentity,
  DelegationChain,
  Delegation,
} from "@dfinity/identity";
import bs58 from "bs58";
import { formatSiwsMessage } from "../../utils/utils";
import type { _SERVICE as SiwsProviderService } from "../../did/ic_siws_provider";
import { idlFactory as siwsProviderIdlFactory } from "../../did/ic_siws_provider.did.js";
import { BaseDelegationAdapter } from "../BaseDelegationAdapter";
import { SiwsAdapterConfig } from "../../types/AdapterConfigs";
import { TokenManager, SplTokenBalance } from "../../managers/SplTokenManager";
import { deriveAccountId } from "../../utils/icUtils";

// Check if we're in a browser environment
const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";

// Define SIWS Provider Actor interface using generated types
type SiwsProviderActor = ActorSubclass<SiwsProviderService>;

export class SiwsAdapter extends BaseDelegationAdapter<SiwsAdapterConfig> {
  public walletName: string;
  public logo: string;
  public readonly id: string;
  static supportedChains: Adapter.Chain[] = [
    Adapter.Chain.ICP,
    Adapter.Chain.SOL,
  ];

  private solanaAdapter: Promise<SolanaAdapter> | null = null;
  private solanaConnection: Connection;
  private solanaAddress: string | null = null;
  private tokenManager: TokenManager;

  constructor(args: Adapter.ConstructorArgs & { config: SiwsAdapterConfig }) {
    super(args);
    this.id = args.adapter.id;
    this.walletName = args.adapter.walletName;
    this.logo = args.adapter.logo;
    this.config = args.config;
    
    this.initializeConnection();
    
    if (isBrowser && this.id !== "walletconnectSiws") {
      this.initializeSolanaAdapter();
    }

    this.setState(Adapter.Status.READY);
  }

  private initializeConnection(): void {
    const network = this.config.solanaNetwork || WalletAdapterNetwork.Mainnet;
    const endpoint =
      network === WalletAdapterNetwork.Mainnet
        ? "https://wiser-omniscient-thunder.solana-mainnet.quiknode.pro/c3a27d9cb72eb335a30e3407d576ef64e61b4e8d"
        : "https://api.devnet.solana.com";
    this.solanaConnection = new Connection(endpoint);
    this.tokenManager = new TokenManager(this.solanaConnection);
  }

  private initializeSolanaAdapter(): void {
    const network = this.config.solanaNetwork || WalletAdapterNetwork.Mainnet;
    this.solanaAdapter = this.createSolanaAdapter(network);
    this.setupWalletListeners();
  }

  private async ensureSolanaAdapter(): Promise<SolanaAdapter> {
    if (!this.solanaAdapter) {
      const network = this.config.solanaNetwork || WalletAdapterNetwork.Mainnet;
      this.solanaAdapter = this.createSolanaAdapter(network);
      this.setupWalletListeners();
    }
    return this.solanaAdapter;
  }

  private async ensureConnected(): Promise<SolanaAdapter> {
    const adapter = await this.ensureSolanaAdapter();
    if (!adapter.connected || !adapter.publicKey) {
      throw new Error("Wallet not connected");
    }
    return adapter;
  }

  private async buildTransaction(
    instructions: TransactionInstruction[],
    feePayer: PublicKey
  ): Promise<Transaction> {
    const transaction = new Transaction().add(...instructions);
    const { blockhash } = await this.solanaConnection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = feePayer;
    return transaction;
  }

  // Implement abstract methods from BaseDelegationAdapter
  protected async onStorageRestored(sessionKey: Ed25519KeyIdentity, delegationChain: DelegationChain): Promise<void> {
    // Restore the Solana address
    const storedSolanaAddress = await this.storage.get(`${this.id}-solana-address`);
    if (storedSolanaAddress && typeof storedSolanaAddress === 'string') {
      this.solanaAddress = storedSolanaAddress;
    } else {
      // If solana address is missing, the restoration is incomplete
      throw new Error("Solana address missing from storage during restore");
    }
  }

  protected async onClearStoredSession(): Promise<void> {
    // Clear SIWS-specific data
    this.solanaAddress = null;
    await this.storage.remove(`${this.id}-solana-address`);
  }

  private async createSolanaAdapter(
    network: WalletAdapterNetwork,
  ): Promise<SolanaAdapter> {
    if (!isBrowser) {
      throw new Error(
        "Cannot create Solana adapter in non-browser environment",
      );
    }

    switch (this.id) {
      case "phantomSiws":
        return new PhantomWalletAdapter();
      case "solflareSiws":
        return new SolflareWalletAdapter({ network });
      case "backpackSiws":
        return new BackpackWalletAdapter();
      case "walletconnectSiws": {
        const { WalletConnectWalletAdapter } = await import(
          "@solana/wallet-adapter-walletconnect"
        );
        const wcAdapter = new WalletConnectWalletAdapter({
          network: network as
            | WalletAdapterNetwork.Mainnet
            | WalletAdapterNetwork.Devnet,
          options: {
            relayUrl: "wss://relay.walletconnect.com",
            projectId: this.config.projectId || "",
            metadata: {
              name: this.config.appName || "W98 dApp",
              description:
                this.config.appDescription ||
                "A dApp using WalletConnect for Solana",
              url: this.config.appUrl || "https://w98.io",
              icons: this.config.appIcons || ["https://w98.io/logo.png"],
            },
          },
        });
        this.logger.debug(
          `WalletConnect adapter created with config:`,
          wcAdapter,
        );
        return wcAdapter;
      }
      default:
        throw new Error(`Unsupported SIWS adapter ID: ${this.id}`);
    }
  }

  private setupWalletListeners(): void {
    if (!this.solanaAdapter) return;
    this.solanaAdapter.then((adapter) => {
      adapter.on("connect", this.handleSolanaConnect);
      adapter.on("disconnect", this.handleSolanaDisconnect);
      adapter.on("error", this.handleSolanaError);
    });
  }

  private removeWalletListeners(): void {
    if (!this.solanaAdapter) return;
    this.solanaAdapter.then((adapter) => {
      adapter.off("connect", this.handleSolanaConnect);
      adapter.off("disconnect", this.handleSolanaDisconnect);
      adapter.off("error", this.handleSolanaError);
    });
  }

  private handleSolanaConnect = (publicKey: PublicKey): void => {
    this.solanaAddress = publicKey.toBase58();
  };

  private handleSolanaDisconnect = (): void => {
    if (
      this.state !== Adapter.Status.DISCONNECTING &&
      this.state !== Adapter.Status.DISCONNECTED
    ) {
      this.disconnect();
    }
  };

  private handleSolanaError = (error: any): void => {
    this.logger.error(`Solana wallet error`, error, {
      wallet: this.walletName,
    });
    this.setState(Adapter.Status.ERROR);
    this.disconnect();
  };

  async isConnected(): Promise<boolean> {
    if (!this.solanaAdapter) return false;
    const adapter = await this.solanaAdapter;
    return (
      adapter.connected &&
      this.identity !== null &&
      !this.identity.getPrincipal().isAnonymous()
    );
  }

  async connect(): Promise<Wallet.Account> {
    if (!isBrowser) {
      throw new Error("Cannot connect to wallet in non-browser environment");
    }

    // If we're already connected, return the current account
    if (this.identity && this.state === Adapter.Status.CONNECTED) {
      const principal = this.identity.getPrincipal();
      return {
        owner: principal.toText(),
        subaccount: deriveAccountId(principal),
      };
    }

    // Try to restore from storage first
    if (!this.identity) {
      try {
        await super.restoreFromStorage();
        if (this.identity && this.state === Adapter.Status.CONNECTED) {
          const principal = this.identity.getPrincipal();
          return {
            owner: principal.toText(),
            subaccount: deriveAccountId(principal),
          };
        }
      } catch (error) {
        this.logger.debug(`[${this.id}] Failed to restore from storage during connect attempt:`, error);
        // Ensure partial state is cleared if restore fails mid-connect
        await this.clearStoredSession();
      }
    }

    await this.ensureSolanaAdapter();

    // Simplify state management
    const validStates = [Adapter.Status.READY, Adapter.Status.INIT, Adapter.Status.DISCONNECTED];
    if (!validStates.includes(this.state)) {
      this.logger.warn(`[${this.id}] Connect called from unexpected state ${this.state}.`);
      if (this.state === Adapter.Status.CONNECTING) {
        throw new Error("Adapter is already in the process of connecting.");
      }
      this.setState(Adapter.Status.READY);
    }

    this.setState(Adapter.Status.CONNECTING);

    try {
      const adapter = await this.solanaAdapter;
      if (!adapter) {
        throw new Error("Solana adapter not initialized");
      }

      if (!adapter.connected) {
        try {
          if (
            this.id === "walletconnectSiws" &&
            adapter.readyState !== WalletReadyState.Loadable
          ) {
            await new Promise((resolve) => setTimeout(resolve, 200));
          }

          await adapter.connect();
        } catch (error) {
          this.logger.error(`Wallet connection error`, error as Error, {
            wallet: this.walletName,
          });

          if (
            error.name === "WalletWindowClosedError" ||
            error.message?.includes("User rejected the request") ||
            error.message?.includes("Wallet closed")
          ) {
            this.logger.warn(
              `Connection cancelled by user (modal closed or rejected).`,
              { wallet: this.walletName },
            );
            this.setState(Adapter.Status.DISCONNECTED);
            const cancelError = new Error("Connection cancelled by user");
            cancelError.name = "UserCancelledError";
            throw cancelError;
          }

          this.setState(Adapter.Status.ERROR);
          if (adapter.connected) {
            try {
              await adapter.disconnect();
            } catch (disconnectError) {
              this.logger.error(
                `Error during cleanup disconnect`,
                disconnectError as Error,
                { wallet: this.walletName },
              );
            }
          }
          throw error;
        }
      } else {
        this.logger.debug(`Adapter already connected.`, {
          wallet: this.walletName,
        });
      }

      if (!adapter.publicKey) {
        throw new Error(
          "Solana wallet connected, but public key is unavailable.",
        );
      }
      this.solanaAddress = adapter.publicKey.toBase58();
      
      // Store Solana address
      await this.storage.set(`${this.id}-solana-address`, this.solanaAddress);

      const siwsResult = await this.performSiwsLogin(this.solanaAddress);
      this.identity = siwsResult.identity;
      this.sessionKey = siwsResult.sessionKey;

      // Use base class storeSession method
      await this.storeSession(this.sessionKey, this.identity.getDelegation());

      const principal = this.identity.getPrincipal();
      if (!principal || principal.isAnonymous()) {
        await this.clearStoredSession(); // Clear any partial data
        throw new Error("SIWS login failed: Resulted in anonymous principal.");
      }
      
      this.logger.debug(`[${this.id}] Successfully connected and session stored.`);
      this.setState(Adapter.Status.CONNECTED);
      return {
        owner: principal.toText(),
        subaccount: deriveAccountId(principal),
      };
    } catch (error) {
      this.logger.error(`Overall connect process failed`, error as Error, {
        wallet: this.walletName,
      });
      
      await this.clearStoredSession(); // Ensure cleanup on any connect error

      if (error.name === "UserCancelledError") {
        this.setState(Adapter.Status.DISCONNECTED);
      } else {
        this.setState(Adapter.Status.ERROR);
      }

      if (this.solanaAdapter) {
        try {
          const adapter = await this.solanaAdapter;
          if (adapter && adapter.connected && error.name !== "UserCancelledError") {
            await adapter.disconnect();
          }
        } catch (cleanupError) {
          this.logger.error(
            `Error during final cleanup disconnect`,
            cleanupError as Error,
            { wallet: this.walletName },
          );
        }
      }

      throw error;
    }
  }

  // Implement disconnectInternal to leverage base class disconnect
  protected async disconnectInternal(): Promise<void> {
    if (this.solanaAdapter) {
      try {
        const adapter = await this.solanaAdapter;
        if (adapter.connected) {
          this.removeWalletListeners();
          await adapter.disconnect();
          this.setupWalletListeners();
        }
      } catch (error) {
        this.logger.warn(`Error during Solana disconnect`, {
          error,
          wallet: this.walletName,
        });
      }
    }
  }

  async getPrincipal(): Promise<string> {
    if (!this.identity) {
      throw new Error("Not connected or SIWS flow not completed.");
    }
    return this.identity.getPrincipal().toText();
  }

  async getAccountId(): Promise<string> {
    const principal = await this.getPrincipal();
    if (!principal)
      throw new Error("Principal not available to derive account ID");
    return deriveAccountId(principal);
  }

  async getSolanaAddress(): Promise<string> {
    if (!this.solanaAddress) {
      throw new Error("Not connected or Solana address not available.");
    }
    return this.solanaAddress;
  }

  async getAddresses(): Promise<Adapter.Addresses> {
    const principal = this.identity?.getPrincipal();
    return {
      sol: {
        address: this.solanaAddress,
        network: this.config.solanaNetwork,
      },
      icp: {
        address: principal?.toText(),
        subaccount: principal ? deriveAccountId(principal) : undefined,
      },
    };
  }

  protected createActorInternal<T>(
    canisterId: string,
    idl: any,
    options?: { requiresSigning?: boolean },
  ): ActorSubclass<T> {
    const requiresSigning = options?.requiresSigning ?? true;
    if (requiresSigning && !this.identity) {
      throw new Error(
        "Cannot create signed actor: Not connected or SIWS flow not completed.",
      );
    }

    const agent = HttpAgent.createSync({
      host: this.config.hostUrl,
      identity: this.identity,
      verifyQuerySignatures: this.config.verifyQuerySignatures,
    });

    if (this.config.fetchRootKey) {
      agent.fetchRootKey();
    }

    return Actor.createActor<T>(idl, { agent, canisterId });
  }

  async getSolBalance(): Promise<{ amount: number; usdValue?: number }> {
    try {
      const adapter = await this.ensureConnected();
      return this.tokenManager.getSolBalance(adapter.publicKey!);
    } catch {
      return { amount: 0, usdValue: 0 };
    }
  }

  async getSplTokenBalances(): Promise<SplTokenBalance[]> {
    try {
      const adapter = await this.ensureConnected();
      return this.tokenManager.getSplTokenBalances(adapter.publicKey!);
    } catch {
      return [];
    }
  }

  private createSiwsProviderActor(identity?: Identity): SiwsProviderActor {
    if (!this.config.siwsProviderCanisterId) {
      throw new Error("SIWS provider canister ID not configured.");
    }
    const agent = HttpAgent.createSync({
      host: this.config.hostUrl,
      identity: identity ?? new AnonymousIdentity(),
      verifyQuerySignatures: this.config.verifyQuerySignatures,
    });
    if (this.config.fetchRootKey) {
      agent.fetchRootKey();
    }
    return Actor.createActor<SiwsProviderService>(siwsProviderIdlFactory, {
      agent,
      canisterId: this.config.siwsProviderCanisterId,
    });
  }


  private async signSiwsMessage(siwsMessage: any): Promise<string> {
    const messageText = formatSiwsMessage(siwsMessage);
    const messageBytes = new TextEncoder().encode(messageText);

    if (!this.solanaAdapter) {
      throw new Error("Solana adapter not connected.");
    }

    const adapter = await this.solanaAdapter;

    if (!("signMessage" in adapter)) {
      throw new Error(
        `Connected Solana adapter '${this.walletName}' does not support signMessage.`,
      );
    }

    const signerAdapter = adapter as typeof adapter &
      MessageSignerWalletAdapterProps<string>;
    const signatureBytes = await signerAdapter.signMessage(messageBytes);

    try {
      if (
        typeof signatureBytes === "object" &&
        "signature" in signatureBytes &&
        signatureBytes.signature instanceof Uint8Array
      ) {
        return bs58.encode(signatureBytes.signature);
      }

      if (signatureBytes instanceof Uint8Array) {
        return bs58.encode(signatureBytes);
      }

      if ((signatureBytes as any) instanceof ArrayBuffer) {
        return bs58.encode(new Uint8Array(signatureBytes as any));
      }

      if (
        Array.isArray(signatureBytes) ||
        (typeof signatureBytes === "object" && "length" in signatureBytes)
      ) {
        return bs58.encode(new Uint8Array(signatureBytes as any));
      }

      this.logger.warn(
        `Unexpected signature bytes type: ${typeof signatureBytes}`,
        { signatureBytes, wallet: this.walletName },
      );

      const fallbackArray = Object.values(signatureBytes as any).map((val) =>
        Number(val),
      );
      return bs58.encode(Uint8Array.from(fallbackArray));
    } catch (e) {
      this.logger.error(`Error encoding signature`, e as Error, {
        wallet: this.walletName,
      });
      throw new Error(
        `Failed to encode signature from ${this.walletName}: ${e.message}`,
      );
    }
  }


  private createDelegationIdentity(
    signedDelegation: any,
    sessionIdentity: Ed25519KeyIdentity,
    userCanisterPublicKeyDer: ArrayBuffer,
  ): DelegationIdentity {
    const delegation = new Delegation(
      signedDelegation.delegation.pubkey.slice().buffer,
      signedDelegation.delegation.expiration,
      signedDelegation.delegation.targets.length > 0
        ? signedDelegation.delegation.targets[0]
        : undefined,
    );

    const delegations = [
      {
        delegation: delegation,
        signature: signedDelegation.signature.slice().buffer as any,
      },
    ];

    const delegationChain = DelegationChain.fromDelegations(
      delegations,
      userCanisterPublicKeyDer,
    );

    const identity = DelegationIdentity.fromDelegation(
      sessionIdentity,
      delegationChain,
    );

    return identity;
  }

  private async performSiwsLogin(
    address: string,
  ): Promise<{ identity: DelegationIdentity; sessionKey: Ed25519KeyIdentity }> {
    const actor = this.createSiwsProviderActor();
    
    // Step 1: Prepare and sign message
    const { siwsMessage, signature } = await this.prepareAndSignMessage(actor, address);
    
    // Step 2: Generate session identity
    const sessionIdentity = Ed25519KeyIdentity.generate();
    const sessionPublicKeyDer = sessionIdentity.getPublicKey().toDer();
    
    // Step 3: Login and get delegation
    const loginResult = await actor.siws_login(
      signature,
      address,
      new Uint8Array(sessionPublicKeyDer),
      siwsMessage.nonce,
    );
    
    if ("Err" in loginResult) {
      throw new Error(`SIWS Login failed: ${JSON.stringify(loginResult.Err)}`);
    }
    
    // Step 4: Get signed delegation
    const delegationResult = await actor.siws_get_delegation(
      address,
      new Uint8Array(sessionPublicKeyDer),
      loginResult.Ok.expiration,
    );
    
    if ("Err" in delegationResult) {
      throw new Error(`SIWS Get Delegation failed: ${JSON.stringify(delegationResult.Err)}`);
    }
    
    // Step 5: Create delegation identity
    const delegationIdentity = this.createDelegationIdentity(
      delegationResult.Ok,
      sessionIdentity,
      new Uint8Array(loginResult.Ok.user_canister_pubkey).buffer as ArrayBuffer,
    );

    return { identity: delegationIdentity, sessionKey: sessionIdentity };
  }

  private async prepareAndSignMessage(
    actor: SiwsProviderActor,
    address: string
  ): Promise<{ siwsMessage: any; signature: string }> {
    // Prepare login
    const prepareResult = await actor.siws_prepare_login(address);
    if ("Err" in prepareResult) {
      throw new Error(`SIWS Prepare Login failed: ${JSON.stringify(prepareResult.Err)}`);
    }
    
    // Sign message
    const signature = await this.signSiwsMessage(prepareResult.Ok);
    
    return { siwsMessage: prepareResult.Ok, signature };
  }

  async sendSol(
    toAddress: string,
    amountInSol: number,
    options?: SendOptions
  ): Promise<string> {
    const adapter = await this.ensureConnected();

    try {
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: adapter.publicKey!,
        toPubkey: new PublicKey(toAddress),
        lamports: Math.floor(amountInSol * LAMPORTS_PER_SOL),
      });

      const transaction = await this.buildTransaction(
        [transferInstruction],
        adapter.publicKey!
      );

      const signature = await adapter.sendTransaction(
        transaction,
        this.solanaConnection,
        options
      );

      const latestBlockhash = await this.solanaConnection.getLatestBlockhash();
      await this.solanaConnection.confirmTransaction({
        signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      });
      return signature;
    } catch (error) {
      this.logger.error(`Failed to send SOL`, error as Error, {
        wallet: this.walletName,
        toAddress,
        amount: amountInSol,
      });
      throw error;
    }
  }

  async sendSplToken(
    mintAddress: string,
    toAddress: string,
    amount: number,
    decimals: number,
    options?: SendOptions
  ): Promise<string> {
    const adapter = await this.ensureConnected();

    try {
      const mint = new PublicKey(mintAddress);
      const recipient = new PublicKey(toAddress);
      const instructions: TransactionInstruction[] = [];

      const senderTokenAccount = await getAssociatedTokenAddress(
        mint,
        adapter.publicKey!,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      const recipientTokenAccount = await getAssociatedTokenAddress(
        mint,
        recipient,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      // Check if recipient token account exists
      try {
        await getAccount(
          this.solanaConnection,
          recipientTokenAccount,
          'confirmed',
          TOKEN_PROGRAM_ID
        );
      } catch (error) {
        if (error instanceof TokenAccountNotFoundError) {
          instructions.push(
            createAssociatedTokenAccountInstruction(
              adapter.publicKey!,
              recipientTokenAccount,
              recipient,
              mint,
              TOKEN_PROGRAM_ID,
              ASSOCIATED_TOKEN_PROGRAM_ID
            )
          );
        } else {
          throw error;
        }
      }

      // Add transfer instruction
      const transferAmount = Math.floor(amount * Math.pow(10, decimals));
      instructions.push(
        createTransferInstruction(
          senderTokenAccount,
          recipientTokenAccount,
          adapter.publicKey!,
          transferAmount,
          [],
          TOKEN_PROGRAM_ID
        )
      );

      const transaction = await this.buildTransaction(
        instructions,
        adapter.publicKey!
      );

      const signature = await adapter.sendTransaction(
        transaction,
        this.solanaConnection,
        options
      );

      const latestBlockhash = await this.solanaConnection.getLatestBlockhash();
      await this.solanaConnection.confirmTransaction({
        signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      });
      return signature;
    } catch (error) {
      this.logger.error(`Failed to send SPL token`, error as Error, {
        wallet: this.walletName,
        mintAddress,
        toAddress,
        amount,
        decimals,
      });
      throw error;
    }
  }

  async estimateTransactionFee(
    transaction: Transaction
  ): Promise<number> {
    const adapter = await this.ensureConnected();

    try {
      const { blockhash } = await this.solanaConnection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = adapter.publicKey!;

      const message = transaction.compileMessage();
      const fee = await this.solanaConnection.getFeeForMessage(message, 'confirmed');
      
      if (fee.value === null) {
        throw new Error("Unable to estimate fee");
      }
      
      return fee.value / LAMPORTS_PER_SOL;
    } catch (error) {
      this.logger.error(`Failed to estimate transaction fee`, error as Error, {
        wallet: this.walletName,
      });
      throw error;
    }
  }

  // Helper method to get transaction status
  async getTransactionStatus(signature: string): Promise<{
    confirmed: boolean;
    slot?: number;
    err?: any;
  }> {
    try {
      const status = await this.solanaConnection.getSignatureStatus(signature);
      
      if (!status.value) {
        return { confirmed: false };
      }
      
      return {
        confirmed: status.value.confirmationStatus === 'confirmed' || 
                  status.value.confirmationStatus === 'finalized',
        slot: status.value.slot,
        err: status.value.err,
      };
    } catch (error) {
      this.logger.error(`Failed to get transaction status`, error as Error, {
        wallet: this.walletName,
        signature,
      });
      throw error;
    }
  }
}

