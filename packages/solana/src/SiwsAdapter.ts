// Solana SIWS Adapter using ic-siws-js library
import { Adapter, Wallet } from "../../../src/types/index.d";
import { ActorSubclass, AnonymousIdentity, type Identity } from "@dfinity/agent";
import {
  WalletAdapterNetwork,
  type Adapter as SolanaAdapter,
  WalletReadyState,
} from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { 
  Connection, 
  PublicKey, 
  Transaction,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";
// SPL token imports removed - functionality no longer supported
import {
  Ed25519KeyIdentity,
  DelegationIdentity,
} from "@dfinity/identity";
import bs58 from "bs58";
// ic-siws-js imports removed
import { BaseSiwxAdapter } from "../../../src/adapters/BaseSiwxAdapter";
import { SiwsAdapterConfig } from "../../../src/types/AdapterConfigs";
// SPL token manager removed
import { deriveAccountId, formatSiwsMessage } from "../../../src/utils";
import type { _SERVICE as SiwsProviderService } from "../../../src/did/ic_siws_provider";
import { idlFactory as siwsProviderIdlFactory } from "../../../src/did/ic_siws_provider.did.js";

// Check if we're in a browser environment
const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";

export class SiwsAdapter extends BaseSiwxAdapter<SiwsAdapterConfig> {
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
  private stateUnsubscribe: any | null = null;
  private connectingPromise: Promise<Wallet.Account> | null = null;

  // Prefer SIWS-specific canister keys
  protected resolveProviderCanisterId(): string {
    const cfg: any = this.config as any;
    const canisterId = cfg.providerCanisterId || cfg.siwsProviderCanisterId;
    if (!canisterId) {
      throw new Error("SIWS provider canister ID not configured.");
    }
    return String(canisterId);
  }
  // Token manager removed - SPL functionality no longer supported

  constructor(args: Adapter.ConstructorArgs & { config: SiwsAdapterConfig }) {
    super(args);
    this.id = args.adapter.id;
    this.walletName = args.adapter.walletName;
    this.logo = args.adapter.logo;
    this.config = args.config;
    
    this.initializeConnection();
    
    // No SIWS Manager initialization; manual flow
    
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
    // Token manager initialization removed
  }

  private initializeSolanaAdapter(): void {
    const network = this.config.solanaNetwork || WalletAdapterNetwork.Mainnet;
    this.solanaAdapter = this.createSolanaAdapter(network);
    this.setupWalletListeners();
  }

  private setupStateListener(): void { /* no-op */ }
  
  // Clean up on adapter destruction
  destroy(): void {
    if (this.stateUnsubscribe) {
      // ic-siws-js returns a Subscription object with an unsubscribe method
      if (typeof this.stateUnsubscribe.unsubscribe === 'function') {
        this.stateUnsubscribe.unsubscribe();
      } else if (typeof this.stateUnsubscribe === 'function') {
        this.stateUnsubscribe();
      }
      this.stateUnsubscribe = null;
    }
    this.removeWalletListeners();
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

  // Transaction building method removed - no longer needed

  // Implement abstract methods from BaseDelegationAdapter
  protected async onStorageRestored(sessionKey: Ed25519KeyIdentity, delegationChain: any): Promise<void> {
    const storedSolanaAddress = await this.readExternalAddress(`${this.id}-solana-address`);
    if (storedSolanaAddress) this.solanaAddress = storedSolanaAddress;
  }

  protected async onClearStoredSession(): Promise<void> {
    // Clear SIWS-specific data
    this.solanaAddress = null;
    await this.storage.remove(`${this.id}-solana-address`);
    
    // No SIWS manager session to clear
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
    if (this.connectingPromise) return this.connectingPromise;

    this.connectingPromise = (async () => {
    if (!isBrowser) {
      throw new Error("Cannot connect to wallet in non-browser environment");
    }

    // Validate provider canister using shared resolver
    this.resolveProviderCanisterId();

    // If we're already connected, return the current account
    if (this.identity && this.state === Adapter.Status.CONNECTED) {
      const principal = this.identity.getPrincipal();
      return {
        owner: principal.toText(),
        subaccount: deriveAccountId(principal),
      };
    }

    this.setState(Adapter.Status.CONNECTING);

    try {
      // Ensure Solana adapter is ready
      const adapter = await this.ensureSolanaAdapter();
      
      // Connect the Solana wallet first if not already connected
      if (!adapter.connected) {
        this.logger.debug(`Connecting to ${this.walletName} wallet...`);
        
        // Special handling for WalletConnect
        if (this.id === "walletconnectSiws" && adapter.readyState !== WalletReadyState.Loadable) {
          this.logger.debug("Waiting for WalletConnect to be ready...");
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
        
        try {
          await adapter.connect();
        } catch (error: any) {
          this.logger.error(`Wallet connection error`, error, {
            wallet: this.walletName,
          });
          
          if (
            error.name === "WalletWindowClosedError" ||
            error.message?.includes("User rejected the request") ||
            error.message?.includes("Wallet closed")
          ) {
            this.setState(Adapter.Status.DISCONNECTED);
            throw new Error("Connection cancelled by user");
          }
          
          this.setState(Adapter.Status.ERROR);
          throw error;
        }
      }
      
      // Verify connection was successful
      if (!adapter.publicKey) {
        throw new Error("Solana wallet connected but no public key available");
      }
      
      // Verify adapter supports message signing (required for SIWS)
      if (!("signMessage" in adapter)) {
        this.logger.error(`Adapter does not support signMessage`, undefined, {
          wallet: this.walletName,
          adapterMethods: Object.getOwnPropertyNames(Object.getPrototypeOf(adapter))
        });
        throw new Error(`Wallet adapter '${this.walletName}' does not support message signing required for SIWS`);
      }
      
      // Handle SIWS manually for broad wallet compatibility
      this.logger.debug(`Wallet adapter info`, {
        wallet: this.walletName,
        publicKey: adapter.publicKey?.toBase58(),
        hasSignMessage: "signMessage" in adapter,
        hasSignIn: "signIn" in adapter
      });

      // Manual SIWS flow (old working approach): prepare -> sign -> login -> get delegation
      const address = adapter.publicKey.toBase58();
      this.solanaAddress = address;
      await this.storeExternalAddress(`${this.id}-solana-address`, address);

      const { identity, sessionKey } = await this.performSiwsLogin(address, adapter);
      this.identity = identity;
      this.sessionKey = sessionKey;

      const principal = identity.getPrincipal();
      this.setState(Adapter.Status.CONNECTED);
      return {
        owner: principal.toText(),
        subaccount: deriveAccountId(principal),
      };
    } catch (error) {
      this.logger.error(`Connect process failed`, error as Error, {
        wallet: this.walletName,
      });
      
      this.setState(Adapter.Status.ERROR);
      throw error;
    } finally {
      this.connectingPromise = null;
    }
  })();

    return this.connectingPromise;
  }

  // ===== Manual SIWS implementation (fallback compatible with more wallets) =====

  private async createSiwsProviderActor(identity?: Identity): Promise<ActorSubclass<SiwsProviderService>> {
    const id = identity ?? new AnonymousIdentity();
    return this.createProviderActor<SiwsProviderService>(siwsProviderIdlFactory, id);
  }

  private async signSiwsMessage(siwsMessage: any, adapter: SolanaAdapter): Promise<string> {
    const messageText = formatSiwsMessage(siwsMessage);
    const messageBytes = new TextEncoder().encode(messageText);

    if (!("signMessage" in adapter)) {
      throw new Error(`Connected Solana adapter '${this.walletName}' does not support signMessage.`);
    }

    const signatureBytes: any = await (adapter as any).signMessage(messageBytes);

    // Normalize to base58
    if (signatureBytes?.signature instanceof Uint8Array) {
      return bs58.encode(signatureBytes.signature);
    }
    if (signatureBytes instanceof Uint8Array) {
      return bs58.encode(signatureBytes);
    }
    if (signatureBytes instanceof ArrayBuffer) {
      return bs58.encode(new Uint8Array(signatureBytes));
    }
    if (Array.isArray(signatureBytes) || (typeof signatureBytes === "object" && "length" in signatureBytes)) {
      return bs58.encode(new Uint8Array(signatureBytes as any));
    }
    // Fallback best-effort
    try {
      const arr = Object.values(signatureBytes as any).map((v: any) => Number(v));
      return bs58.encode(Uint8Array.from(arr));
    } catch (e) {
      this.logger.error(`Error encoding signature`, e as Error, { wallet: this.walletName });
      throw new Error(`Failed to encode signature from ${this.walletName}: ${(e as Error).message}`);
    }
  }

  // Delegation identity construction is provided by BaseSiwxAdapter

  private async performSiwsLogin(
    address: string,
    adapter: SolanaAdapter,
  ): Promise<{ identity: DelegationIdentity; sessionKey: Ed25519KeyIdentity }> {
    const actor = await this.createSiwsProviderActor();

    // 1) Prepare login
    const prepareResult = await actor.siws_prepare_login(address);
    if ("Err" in prepareResult) {
      throw new Error(`SIWS Prepare Login failed: ${prepareResult.Err}`);
    }

    // 2) Sign message
    const signature = await this.signSiwsMessage(prepareResult.Ok, adapter);

    // 3) Generate session identity and do login
    const sessionIdentity = Ed25519KeyIdentity.generate();
    const sessionPublicKeyDer = sessionIdentity.getPublicKey().toDer();

    const loginResult = await actor.siws_login(
      signature,
      address,
      new Uint8Array(sessionPublicKeyDer),
      prepareResult.Ok.nonce,
    );
    if ("Err" in loginResult) {
      throw new Error(`SIWS Login failed: ${loginResult.Err}`);
    }

    // 4) Fetch signed delegation
    const delegationResult = await actor.siws_get_delegation(
      address,
      new Uint8Array(sessionPublicKeyDer),
      loginResult.Ok.expiration,
    );
    if ("Err" in delegationResult) {
      throw new Error(`SIWS Get Delegation failed: ${delegationResult.Err}`);
    }

    // 5) Build identity
    const identity = this.createDelegationIdentity(
      delegationResult.Ok,
      sessionIdentity,
      new Uint8Array(loginResult.Ok.user_canister_pubkey).buffer as ArrayBuffer,
    );

    return { identity, sessionKey: sessionIdentity };
  }

  // Implement disconnectInternal to leverage base class disconnect
  protected async disconnectInternal(): Promise<void> {
    // Ensure base clears stored delegation session and identity
    await super.disconnectInternal();
    // No SIWS manager session to clear
    
    // Disconnect Solana adapter
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
    
    // Clear local state
    this.identity = null;
    this.solanaAddress = null;
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
    const agent = this.buildHttpAgentSync({ identity: this.identity ?? undefined });
    return this.createActorWithAgent<T>(agent as any, canisterId, idl);
  }

  async getSolBalance(): Promise<{ amount: number; usdValue?: number }> {
    // SOL balance functionality removed
    return { amount: 0, usdValue: 0 };
  }

  async getSplTokenBalances(): Promise<any[]> {
    // SPL token balance functionality removed
    return [];
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

