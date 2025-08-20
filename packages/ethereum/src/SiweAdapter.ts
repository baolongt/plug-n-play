// Sign-In with Ethereum (SIWE) Adapter for IC
import { Adapter, Wallet } from "../../../src/types/index.d";
import type { GlobalPnpConfig } from "../../../src/types/index.d";
import { ActorSubclass } from "@dfinity/agent";
import {
  Ed25519KeyIdentity,
  DelegationIdentity,
  DelegationChain,
} from "@dfinity/identity";
import { SiweManager } from "ic-siwe-js";
import { createWalletClient, custom, type WalletClient } from "viem";
import { mainnet } from "viem/chains";
import { BaseSiwxAdapter } from "../../../src/adapters/BaseSiwxAdapter";
import { deriveAccountId } from "../../../src/utils";

// Check if we're in a browser environment
const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";

export interface SiweAdapterConfig extends GlobalPnpConfig {
  siweProviderCanisterId?: string;
  providerCanisterId?: string;
  maxTimeToLive?: bigint;
  derivationOrigin?: string;
}

export class SiweAdapter extends BaseSiwxAdapter<SiweAdapterConfig> {
  public walletName: string;
  public logo: string;
  public readonly id: string;
  static supportedChains: Adapter.Chain[] = [
    Adapter.Chain.ICP,
    Adapter.Chain.ETH,
  ];

  private siweManager: SiweManager | null = null;
  private ethereumAddress: string | null = null;
  private connectingPromise: Promise<Wallet.Account> | null = null;

  // Prefer SIWE-specific canister keys to avoid accidentally picking SIWS
  protected resolveProviderCanisterId(): string {
    const cfg: any = this.config as any;
    const canisterId = cfg.providerCanisterId || cfg.siweProviderCanisterId || cfg.siwsProviderCanisterId;
    if (!canisterId) {
      throw new Error("SIWE provider canister ID not configured");
    }
    return String(canisterId);
  }

  constructor(args: Adapter.ConstructorArgs & { config: SiweAdapterConfig }) {
    super(args);
    this.id = args.adapter.id || "siwe";
    this.walletName = args.adapter.walletName || "SIWE";
    this.logo = args.adapter.logo || "";
    this.config = args.config;
    
    this.setState(Adapter.Status.READY);
  }

  // Implement abstract methods from BaseDelegationAdapter
  protected async onStorageRestored(
    sessionKey: Ed25519KeyIdentity,
    delegationChain: DelegationChain
  ): Promise<void> {
    // Restore the Ethereum address
    const storedEthAddress = await this.readExternalAddress(`${this.id}-eth-address`);
    if (storedEthAddress) this.ethereumAddress = storedEthAddress;
  }

  protected async onClearStoredSession(): Promise<void> {
    // Clear SIWE-specific data
    this.ethereumAddress = null;
    await this.storage.remove(`${this.id}-eth-address`);
    if (this.siweManager) {
      this.siweManager.clear();
    }
  }

  async isConnected(): Promise<boolean> {
    return (
      this.identity !== null &&
      !this.identity.getPrincipal().isAnonymous()
    );
  }

  async connect(): Promise<Wallet.Account> {
    // Prevent concurrent connections that can race prepare/login
    if (this.connectingPromise) return this.connectingPromise;

    this.connectingPromise = (async () => {
    if (!isBrowser) {
      throw new Error("Cannot connect to wallet in non-browser environment");
    }

    // If we're already connected, return the current account
    if (this.identity && this.state === Adapter.Status.CONNECTED) {
      const principal = (this.identity as DelegationIdentity).getPrincipal();
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
          const principal = (this.identity as DelegationIdentity).getPrincipal();
          return {
            owner: principal.toText(),
            subaccount: deriveAccountId(principal),
          };
        }
      } catch (error) {
        this.logger.debug(`[${this.id}] Failed to restore from storage during connect attempt:`, error);
        await this.clearStoredSession();
      }
    }

    this.setState(Adapter.Status.CONNECTING);

    try {
      // Check if MetaMask is available
      const win = window as any;
      if (!win.ethereum) {
        throw new Error("MetaMask is not installed. Please install MetaMask to use this wallet.");
      }

      // Initialize SIWE Manager
      const canisterId = this.resolveProviderCanisterId();

      this.siweManager = new SiweManager(
        canisterId,
        {
          host: this.config.hostUrl,
        }
      );

      // Create a wallet client for MetaMask
      const walletClient = createWalletClient({
        chain: mainnet,
        transport: custom(win.ethereum)
      });

      // First, request account access from MetaMask
      const accounts = await walletClient.requestAddresses();
      if (!accounts || accounts.length === 0) {
        throw new Error("No Ethereum accounts available");
      }
      
      // Store the address immediately
      this.ethereumAddress = accounts[0];

      // Set the wallet client for the SIWE manager AFTER we have account access
      this.siweManager.setWalletClient(walletClient);

      // Now login with SIWE - this will:
      // 1. Prepare the SIWE message
      // 2. Sign the message with the already-connected wallet
      // 3. Create the delegation identity
      const delegationIdentity = await this.siweManager.login();
      
      if (!delegationIdentity) {
        throw new Error("SIWE login failed");
      }

      this.identity = delegationIdentity;
      
      // Get the Ethereum address from the state store
      // Access the internal state store to get the identity address
      const stateStore = (this.siweManager as any).siweStateStore || (this.siweManager as any).stateStore;
      if (stateStore) {
        const state = stateStore.getSnapshot ? stateStore.getSnapshot() : stateStore.get?.();
        if (state?.identityAddress) {
          const addr: string = state.identityAddress as string;
          this.ethereumAddress = addr;
          await this.storeExternalAddress(`${this.id}-eth-address`, addr);
        }
      }

      // Get the session key from the delegation identity
      const delegationChain = delegationIdentity.getDelegation();
      const sessionKey = (delegationIdentity as any)._inner;
      if (sessionKey instanceof Ed25519KeyIdentity) {
        this.sessionKey = sessionKey;
        await this.storeSession(this.sessionKey, delegationChain);
      }

      const principal = (this.identity as DelegationIdentity).getPrincipal();
      if (!principal || principal.isAnonymous()) {
        await this.clearStoredSession();
        throw new Error("SIWE login failed: Resulted in anonymous principal.");
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
      
      await this.clearStoredSession();
      this.setState(Adapter.Status.ERROR);
      throw error;
    } finally {
      this.connectingPromise = null;
    }
  })();

    return this.connectingPromise;
  }

  protected async disconnectInternal(): Promise<void> {
    // Ensure base clears stored delegation session and identity
    await super.disconnectInternal();
    if (this.siweManager) {
      this.siweManager.clear();
    }
    this.ethereumAddress = null;
    this.siweManager = null;
  }

  async getPrincipal(): Promise<string> {
    if (!this.identity) {
      throw new Error("Not connected or SIWE flow not completed.");
    }
    return this.identity.getPrincipal().toText();
  }

  async getAccountId(): Promise<string> {
    const principal = await this.getPrincipal();
    if (!principal) {
      throw new Error("Principal not available to derive account ID");
    }
    return deriveAccountId(principal);
  }

  async getEthereumAddress(): Promise<string> {
    if (!this.ethereumAddress) {
      throw new Error("Not connected or Ethereum address not available.");
    }
    return this.ethereumAddress;
  }

  async getAddresses(): Promise<Adapter.Addresses> {
    const principal = this.identity?.getPrincipal();
    return {
      eth: {
        address: this.ethereumAddress,
        network: "mainnet",
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
        "Cannot create signed actor: Not connected or SIWE flow not completed.",
      );
    }
    const agent = this.buildHttpAgentSync({ identity: this.identity ?? undefined });
    return this.createActorWithAgent<T>(agent as any, canisterId, idl);
  }
}