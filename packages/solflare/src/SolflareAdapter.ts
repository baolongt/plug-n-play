// Solflare Wallet Adapter for SIWS (Sign-In with Solana)
import {
  BaseSiwxAdapter,
  Adapter,
  Wallet,
  AdapterConstructorArgs,
  deriveAccountId,
  formatSiwsMessage
} from '@windoge98/plug-n-play';
import { ActorSubclass, AnonymousIdentity, type Identity } from "@dfinity/agent";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Connection, PublicKey } from "@solana/web3.js";
import { Ed25519KeyIdentity, DelegationIdentity, DelegationChain } from "@dfinity/identity";
import bs58 from "bs58";
// @ts-ignore - DID file import
import { idlFactory as siwsProviderIdlFactory } from './did/ic_siws_provider.did.js';
// @ts-ignore - DID type import  
import type { _SERVICE as SiwsProviderService } from './did/ic_siws_provider';

// Configuration specific to Solflare
export interface SolflareAdapterConfig {
  enabled: boolean;
  solanaNetwork?: WalletAdapterNetwork;
  siwsProviderCanisterId?: string;
  providerCanisterId?: string;
  rpcEndpoint?: string;
}

/**
 * Solflare Wallet adapter implementation for SIWS (Sign-In with Solana)
 * Extends BaseSiwxAdapter to provide IC integration via Solana signatures
 */
export class SolflareAdapter extends BaseSiwxAdapter<SolflareAdapterConfig> {
  public readonly id: string = 'solflare';
  private solanaAdapter: SolflareWalletAdapter | null = null;
  private solanaConnection: Connection;
  private solanaAddress: string | null = null;
  private connectingPromise: Promise<Wallet.Account> | null = null;

  constructor(args: AdapterConstructorArgs<SolflareAdapterConfig>) {
    super(args);
    this.solanaConnection = this.initializeConnection();
    this.initializeSolanaAdapter();
    this.setState(Adapter.Status.READY);
  }

  private initializeConnection(): Connection {
    const network = this.config.solanaNetwork || WalletAdapterNetwork.Mainnet;
    const endpoint = this.config.rpcEndpoint || 
      (network === WalletAdapterNetwork.Mainnet
        ? "https://api.mainnet-beta.solana.com"
        : "https://api.devnet.solana.com");
    return new Connection(endpoint);
  }

  private initializeSolanaAdapter(): void {
    const network = this.config.solanaNetwork || WalletAdapterNetwork.Mainnet;
    this.solanaAdapter = new SolflareWalletAdapter({ network });
    this.setupWalletListeners();
  }

  private setupWalletListeners(): void {
    if (!this.solanaAdapter) return;
    this.solanaAdapter.on("connect", this.handleSolanaConnect);
    this.solanaAdapter.on("disconnect", this.handleSolanaDisconnect);
    this.solanaAdapter.on("error", this.handleSolanaError);
  }

  private removeWalletListeners(): void {
    if (!this.solanaAdapter) return;
    this.solanaAdapter.off("connect", this.handleSolanaConnect);
    this.solanaAdapter.off("disconnect", this.handleSolanaDisconnect);
    this.solanaAdapter.off("error", this.handleSolanaError);
  }

  private handleSolanaConnect = (_publicKey: PublicKey) => {
    this.logger.debug("Solflare connected to Solana");
  };

  private handleSolanaDisconnect = () => {
    this.logger.debug("Solflare disconnected from Solana");
    this.setState(Adapter.Status.DISCONNECTED);
  };

  private handleSolanaError = (error: Error) => {
    this.logger.error("Solflare error:", error);
    this.setState(Adapter.Status.ERROR);
  };

  async connect(): Promise<Wallet.Account> {
    // Prevent concurrent connections
    if (this.connectingPromise) {
      return this.connectingPromise;
    }

    this.connectingPromise = this.performConnect();
    
    try {
      const result = await this.connectingPromise;
      return result;
    } finally {
      this.connectingPromise = null;
    }
  }

  private async performConnect(): Promise<Wallet.Account> {
    this.setState(Adapter.Status.CONNECTING);

    try {
      if (!this.solanaAdapter) {
        throw new Error("Solflare adapter not initialized");
      }

      // Connect to Solflare
      await this.solanaAdapter.connect();
      
      if (!this.solanaAdapter.publicKey) {
        throw new Error("Failed to get public key from Solflare");
      }

      const address = this.solanaAdapter.publicKey.toBase58();
      this.solanaAddress = address;

      // Perform SIWS login
      const { identity, sessionKey } = await this.performSiwsLogin(address, this.solanaAdapter);
      this.identity = identity;
      this.sessionKey = sessionKey;

      // Store the Solana address for later use
      await this.storage.set(`${this.id}-solana-address`, address);

      const principal = identity.getPrincipal();
      this.setState(Adapter.Status.CONNECTED);
      
      return {
        owner: principal.toText(),
        subaccount: deriveAccountId(principal),
      };
    } catch (error) {
      this.setState(Adapter.Status.ERROR);
      this.logger.error("Failed to connect Solflare:", error as Error);
      throw error;
    }
  }

  private async performSiwsLogin(
    address: string,
    adapter: SolflareWalletAdapter
  ): Promise<{ identity: DelegationIdentity; sessionKey: Ed25519KeyIdentity }> {
    const actor = await this.createSiwsProviderActor();

    // 1) Prepare login
    const prepareResult = await actor.siws_prepare_login(address);
    if ("Err" in prepareResult) {
      throw new Error(`SIWS Prepare Login failed: ${prepareResult.Err}`);
    }

    // 2) Sign message
    const messageText = formatSiwsMessage(prepareResult.Ok);
    const messageBytes = new TextEncoder().encode(messageText);
    
    if (!adapter.signMessage) {
      throw new Error("Solflare wallet does not support message signing");
    }

    const signatureBytes: any = await adapter.signMessage(messageBytes);
    const signature = bs58.encode(signatureBytes);

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
      new Uint8Array(loginResult.Ok.user_canister_pubkey).buffer as ArrayBuffer
    );

    return { identity, sessionKey: sessionIdentity };
  }

  private async createSiwsProviderActor(identity?: Identity): Promise<ActorSubclass<SiwsProviderService>> {
    const id = identity ?? new AnonymousIdentity();
    return this.createProviderActor<SiwsProviderService>(siwsProviderIdlFactory, id);
  }

  async isConnected(): Promise<boolean> {
    return this.identity !== null && 
           !this.identity.getPrincipal().isAnonymous() &&
           this.solanaAdapter?.connected === true;
  }

  async getPrincipal(): Promise<string> {
    if (!this.identity) {
      throw new Error("Not connected");
    }
    return this.identity.getPrincipal().toText();
  }

  async getAccountId(): Promise<string> {
    if (!this.identity) {
      throw new Error("Not connected");
    }
    const principal = this.identity.getPrincipal();
    return deriveAccountId(principal);
  }

  async getAddresses(): Promise<Adapter.Addresses> {
    const principal = this.identity?.getPrincipal();
    return {
      sol: {
        address: this.solanaAddress,
        network: this.config.solanaNetwork === WalletAdapterNetwork.Devnet ? 'devnet' : 'mainnet',
      },
      icp: {
        address: principal?.toText(),
        subaccount: principal ? deriveAccountId(principal) : undefined,
      },
    };
  }

  protected async disconnectInternal(): Promise<void> {
    if (this.solanaAdapter) {
      try {
        await this.solanaAdapter.disconnect();
      } catch (error) {
        this.logger.warn("Error disconnecting Solflare:", error as Error);
      }
    }
    this.solanaAddress = null;
    await this.storage.remove(`${this.id}-solana-address`);
    await super.disconnectInternal();
  }

  protected createActorInternal<T>(
    canisterId: string,
    idl: any,
    options?: { requiresSigning?: boolean }
  ): ActorSubclass<T> {
    const requiresSigning = options?.requiresSigning ?? true;
    if (requiresSigning && !this.identity) {
      throw new Error("Cannot create signed actor: Not connected");
    }
    const agent = this.buildHttpAgentSync({ identity: this.identity ?? undefined });
    return this.createActorWithAgent<T>(agent as any, canisterId, idl);
  }

  protected async onStorageRestored(_sessionKey: Ed25519KeyIdentity, _delegationChain: DelegationChain): Promise<void> {
    const storedSolanaAddress = await this.storage.get(`${this.id}-solana-address`);
    if (storedSolanaAddress && typeof storedSolanaAddress === 'string') {
      this.solanaAddress = storedSolanaAddress;
    }
  }

  protected async onClearStoredSession(): Promise<void> {
    this.solanaAddress = null;
    await this.storage.remove(`${this.id}-solana-address`);
  }

  destroy(): void {
    this.removeWalletListeners();
    if (this.solanaAdapter) {
      this.solanaAdapter.disconnect().catch(() => {});
      this.solanaAdapter = null;
    }
  }
}