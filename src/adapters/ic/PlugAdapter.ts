// src/adapters/PlugAdapter.ts

import { BrowserExtensionTransport } from "@slide-computer/signer-extension";
import { SignerAgent } from "@slide-computer/signer-agent";
import { Signer } from "@slide-computer/signer";
import { Principal } from "@dfinity/principal";
import { HttpAgent } from "@dfinity/agent";
import { BaseSignerAdapter } from "../BaseSignerAdapter";
import { PlugAdapterConfig } from "../../types/AdapterConfigs";
import { Adapter } from "../../types/index.d";

// Plug's UUID for ICRC-94 support
const PLUG_UUID = "71edc834-bab2-4d59-8860-c36a01fee7b8";

export class PlugAdapter extends BaseSignerAdapter<PlugAdapterConfig> {
  protected transport: BrowserExtensionTransport | null = null;

  constructor(args: any) {
    super(args);
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

  protected async ensureTransportInitialized(): Promise<void> {
    if (!this.transport || !this.signer) {
      await this.initializeTransport();
    }
  }
}