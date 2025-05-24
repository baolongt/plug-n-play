import { Principal } from "@dfinity/principal";
import { Actor, HttpAgent, type ActorSubclass } from "@dfinity/agent";
import { SignerAgent } from "@slide-computer/signer-agent";
import { Signer } from "@slide-computer/signer";
import { BaseAdapter } from "./BaseAdapter";
import { AdapterSpecificConfig } from "../types/AdapterConfigs";
import { Adapter, Wallet } from "../types/index.d";
import { createAccountFromPrincipal, withRetry } from "../utils/icUtils";

/**
 * Base class for adapters that use the Signer/SignerAgent pattern
 */
export abstract class BaseSignerAdapter<T extends AdapterSpecificConfig = AdapterSpecificConfig> extends BaseAdapter<T> {
  protected signer: Signer | null = null;
  protected agent: HttpAgent | SignerAgent<any> | null = null;
  protected signerAgent: SignerAgent<Signer> | null = null;
  protected transport: any = null;
  protected principalStorageKey: string;

  constructor(args: any) {
    super(args);
    this.principalStorageKey = `${this.adapter.id}_principal`;
  }

  async openChannel(): Promise<void> {
    if (this.signer) {
      await this.signer.openChannel();
    }
  }

  async isConnected(): Promise<boolean> {
    return this.agent !== null && this.signer !== null && this.signerAgent !== null;
  }

  async getPrincipal(): Promise<string> {
    if (!this.signerAgent) {
      // Try to recreate signerAgent if missing
      if (this.transport && this.signer && this.adapter.config.hostUrl) {
        this.agent = HttpAgent.createSync({ host: this.adapter.config.hostUrl });
        this.signerAgent = SignerAgent.createSync({
          signer: this.signer,
          account: Principal.anonymous(),
          agent: this.agent,
        });
      } else {
        throw new Error(`${this.adapter.walletName} signer agent not initialized or connected`);
      }
    }
    const principal = await this.signerAgent.getPrincipal();
    return principal.toText();
  }

  protected async connectWithStoredPrincipal(): Promise<Principal | null> {
    const storedPrincipal = localStorage.getItem(this.principalStorageKey);
    
    if (storedPrincipal && storedPrincipal !== "null") {
      try {
        const principal = Principal.fromText(storedPrincipal);
        if (this.signerAgent) {
          this.signerAgent.replaceAccount(principal);
        }
        return principal;
      } catch (e) {
        localStorage.removeItem(this.principalStorageKey);
        // Fall through to normal connection flow
        return null;
      }
    }
    return null;
  }

  protected async connectWithAccounts(): Promise<Principal> {
    const accounts = await withRetry(() => this.signerAgent!.signer.accounts());
    if (!accounts || accounts.length === 0) {
      await this.disconnect();
      throw new Error(`No accounts returned from ${this.adapter.walletName}`);
    }

    const principal = accounts[0].owner;
    localStorage.setItem(this.principalStorageKey, principal.toText());
    if (this.signerAgent) {
      this.signerAgent.replaceAccount(principal);
    }
    return principal;
  }

  async connect(): Promise<Wallet.Account> {
    this.setState(Adapter.Status.CONNECTING);
    try {
      // Ensure transport is initialized
      await this.ensureTransportInitialized();
      
      if (!this.signerAgent || !this.signerAgent.signer) {
        throw new Error(`${this.adapter.walletName} signer agent not initialized. Please ensure extension is installed.`);
      }
      
      // Try to connect with stored principal first
      let principal = await this.connectWithStoredPrincipal();
      
      // If no stored principal or it failed, get accounts
      if (!principal) {
        principal = await this.connectWithAccounts();
      }

      if (principal.isAnonymous()) {
        this.setState(Adapter.Status.READY);
        throw new Error(
          `Failed to authenticate with ${this.adapter.walletName} - got anonymous principal`
        );
      }

      if (this.adapter.config.fetchRootKey) {
        if (!this.signerAgent) throw new Error("Signer agent not ready for fetchRootKey");
        await this.signerAgent.fetchRootKey();
      }
      
      this.setState(Adapter.Status.CONNECTED);
      return createAccountFromPrincipal(principal);
    } catch (error) {
      this.logger.error(`[${this.adapter.walletName}] Connection error:`, error);
      await this.disconnect();
      throw error;
    }
  }

  protected createActorInternal<T>(
    canisterId: string,
    idlFactory: any,
    options?: { requiresSigning?: boolean }
  ): ActorSubclass<T> {
    if (!this.signerAgent) {
      throw new Error(`No signer agent available. Please connect first.`);
    }
    try {
      return Actor.createActor<T>(idlFactory, {
        agent: this.signerAgent,
        canisterId,
      });
    } catch (error) {
      this.logger.error(`[${this.adapter.walletName}] Actor creation error:`, error);
      throw error;
    }
  }

  protected async disconnectInternal(): Promise<void> {
    if (this.signer) {
      try {
        this.signer.closeChannel();
      } catch (error) {
        this.logger.warn(`[${this.adapter.walletName}] Error closing signer channel:`, error);
      }
    }
    // Clear stored principal on disconnect
    localStorage.removeItem(this.principalStorageKey);
  }

  protected cleanupInternal(): void {
    // Reset agents but keep transport and signer for faster reconnection
    this.agent = null;
    this.signerAgent = null;
  }

  // Abstract method for ensuring transport is initialized
  protected abstract ensureTransportInitialized(): Promise<void>;
} 