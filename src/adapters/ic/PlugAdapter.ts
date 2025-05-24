// src/adapters/PlugAdapter.ts

import { ActorSubclass, Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { Adapter, Wallet } from "../../types/index.d";
import { BaseAdapter } from "../BaseAdapter";
import { createAccountFromPrincipal, withRetry } from "../../utils/icUtils";
import { PlugAdapterConfig } from "../../types/AdapterConfigs";
import { BrowserExtensionTransport } from "@slide-computer/signer-extension";
import { SignerAgent } from "@slide-computer/signer-agent";
import { Signer } from "@slide-computer/signer";

// Plug's UUID for ICRC-94 support
const PLUG_UUID = "71edc834-bab2-4d59-8860-c36a01fee7b8";

// Extend BaseIcAdapter
export class PlugAdapter extends BaseAdapter<PlugAdapterConfig> implements Adapter.Interface {
  private static readonly PLUG_PRINCIPAL_KEY = "plug_principal"; // Key for localStorage
  
  private signer: Signer | null = null;
  private agent: HttpAgent | SignerAgent<any> | null = null;
  private signerAgent: SignerAgent<Signer> | null = null;
  private transport: BrowserExtensionTransport | null = null;

  // Constructor calls super and does Plug specific initialization
  constructor(args: Adapter.ConstructorArgs) {
    super(args); // Call base constructor with args
    this.initializeTransport();
  }

  // Initialize transport and signer
  private async initializeTransport(): Promise<void> {
    try {
      // Create browser extension transport for Plug
      this.transport = await BrowserExtensionTransport.findTransport({
        uuid: PLUG_UUID,
        window: window,
      });
      
      this.signer = new Signer({
        transport: this.transport
      });
      
      this.agent = HttpAgent.createSync({ host: this.adapter.config.hostUrl });
      this.signerAgent = SignerAgent.createSync({
        signer: this.signer,
        account: Principal.anonymous(),
        agent: this.agent,
      });
      
      this.setState(Adapter.Status.READY);
    } catch (error) {
      console.warn("[Plug] Failed to initialize transport:", error);
      this.setState(Adapter.Status.INIT);
    }
  }

  async openChannel(): Promise<void> {
    if (this.signer) {
      await this.signer.openChannel();
    }
  }

  async connect(): Promise<Wallet.Account> {
    this.setState(Adapter.Status.CONNECTING);
    try {
      // Ensure transport is initialized
      if (!this.transport || !this.signer) {
        await this.initializeTransport();
      }
      
      if (!this.signerAgent || !this.signerAgent.signer) {
        throw new Error("Plug signer agent not initialized. Please ensure Plug extension is installed.");
      }
      
      let principal: Principal;
      const storedPrincipal = localStorage.getItem(PlugAdapter.PLUG_PRINCIPAL_KEY);

      if (storedPrincipal && storedPrincipal !== "null") {
        try {
          principal = Principal.fromText(storedPrincipal);
          this.signerAgent.replaceAccount(principal);
        } catch (e) {
          localStorage.removeItem(PlugAdapter.PLUG_PRINCIPAL_KEY);
          // Fall through to normal connection flow
          const accounts = await this.signerAgent.signer.accounts();
          if (!accounts || accounts.length === 0) {
            await this.disconnect();
            throw new Error("No accounts returned from Plug");
          }
          principal = accounts[0].owner;
          localStorage.setItem(PlugAdapter.PLUG_PRINCIPAL_KEY, principal.toText());
          this.signerAgent.replaceAccount(principal);
        }
      } else {
        const accounts = await withRetry(() => this.signerAgent!.signer.accounts());
        if (!accounts || accounts.length === 0) {
          await this.disconnect();
          throw new Error("No accounts returned from Plug");
        }

        principal = accounts[0].owner;
        localStorage.setItem(PlugAdapter.PLUG_PRINCIPAL_KEY, principal.toText());
        this.signerAgent.replaceAccount(principal);
      }

      if (principal.isAnonymous()) {
        this.setState(Adapter.Status.READY);
        throw new Error(
          "Failed to authenticate with Plug - got anonymous principal"
        );
      }

      if (this.adapter.config.fetchRootKey) {
        if (!this.signerAgent) throw new Error("Signer agent not ready for fetchRootKey");
        await this.signerAgent.fetchRootKey();
      }
      
      this.setState(Adapter.Status.CONNECTED);
      return createAccountFromPrincipal(principal);
    } catch (error) {
      console.error("[Plug] Connection error:", error);
      await this.disconnect();
      throw error;
    }
  }
  
  // disconnect method is inherited, uses disconnectInternal and cleanupInternal

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
        throw new Error("Plug signer agent not initialized or connected");
      }
    }
    const principal = await this.signerAgent.getPrincipal();
    return principal.toText();
  }

  // getAccountId is inherited

  // Implementation of the required abstract method from BaseAdapter
  protected createActorInternal<T>(
    canisterId: string,
    idlFactory: any,
    options?: { requiresSigning?: boolean }
  ): ActorSubclass<T> {
    if (!this.signerAgent) {
      throw new Error("No signer agent available. Please connect first.");
    }
    try {
      const agentToUse = this.signerAgent;
      
      return Actor.createActor<T>(idlFactory, {
        agent: agentToUse,
        canisterId,
      });
    } catch (error) {
      console.error("[Plug] Actor creation error:", error);
      throw error;
    }
  }

  async isConnected(): Promise<boolean> {
    return this.agent !== null && this.signer !== null && this.signerAgent !== null;
  }

  // Plug specific disconnect logic
  protected async disconnectInternal(): Promise<void> {
    if (this.signer) {
      try {
        this.signer.closeChannel();
      } catch (error) {
        console.warn("[Plug] Error closing signer channel:", error);
      }
    }
    // Clear stored principal on disconnect
    localStorage.removeItem(PlugAdapter.PLUG_PRINCIPAL_KEY);
  }

  // Plug specific cleanup (resetting internal state)
  protected cleanupInternal(): void {
    // Reset agents but keep transport and signer for faster reconnection
    this.agent = null;
    this.signerAgent = null;
  }
}