import { StoicTransport } from "@slide-computer/signer-transport-stoic";
import { SignerAgent } from "@slide-computer/signer-agent";
import { Signer } from "@slide-computer/signer";
import { Principal } from "@dfinity/principal";
import { HttpAgent } from "@dfinity/agent";
import { BaseSignerAdapter } from "../BaseSignerAdapter";
import { StoicAdapterConfig } from "../../types/AdapterConfigs";
import { Adapter } from "../../types/index.d";

export class StoicAdapter extends BaseSignerAdapter<StoicAdapterConfig> {
  protected transport: StoicTransport | null = null;
  private connection: any = null;

  constructor(args: any) {
    super(args);
    // Transport will be initialized asynchronously when needed
  }

  private async initializeTransport(): Promise<void> {
    if (this.transport && this.connection?.connected) return; // Already initialized and connected
    
    this.agent = HttpAgent.createSync({ host: this.adapter.config.hostUrl });
    
    // Create the transport using the static create method
    this.transport = await StoicTransport.create({
      agent: this.agent,
      maxTimeToLive: this.adapter.config.maxTimeToLive,
      keyType: this.adapter.config.keyType || 'ECDSA'
    });
    
    // Get the connection from the transport
    this.connection = this.transport.connection;
    
    // Connect the transport if not already connected
    if (!this.connection.connected) {
      await this.connection.connect();
    }
    
    this.signer = new Signer({
      transport: this.transport
    });
    
    this.signerAgent = SignerAgent.createSync({
      signer: this.signer,
      account: Principal.anonymous(),
      agent: this.agent,
    });
    
    this.setState(Adapter.Status.READY);
  }

  protected async ensureTransportInitialized(): Promise<void> {
    await this.initializeTransport();
  }

  async openChannel(): Promise<void> {
    await this.ensureTransportInitialized();
    
    // The transport should already be connected at this point
    // Just call the base class openChannel
    await super.openChannel();
  }

  async isConnected(): Promise<boolean> {
    return this.connection?.connected ?? false;
  }

  protected async disconnectInternal(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.disconnect();
      } catch (error) {
        this.logger.warn(`[${this.adapter.walletName}] Error disconnecting:`, error);
      }
    }
    await super.disconnectInternal();
  }

  protected cleanupInternal(): void {
    super.cleanupInternal();
    this.connection = null;
  }
}