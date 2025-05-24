import { PostMessageTransport } from "@slide-computer/signer-web";
import { SignerAgent } from "@slide-computer/signer-agent";
import { Signer } from "@slide-computer/signer";
import { Principal } from "@dfinity/principal";
import { HttpAgent } from "@dfinity/agent";
import { BaseSignerAdapter } from "../BaseSignerAdapter";
import { OisyAdapterConfig } from "../../types/AdapterConfigs";
import { Adapter } from "../../types/index.d";
import { deriveAccountId } from "../../utils/icUtils";

export class OisyAdapter extends BaseSignerAdapter<OisyAdapterConfig> {
  protected transport: PostMessageTransport | null = null;

  constructor(args: any) {
    super(args);
    this.initializeTransport();
  }

  private initializeTransport(): void {
    const signerUrl = this.adapter.config.signerUrl ?? "https://oisy.com/sign";
    this.agent = HttpAgent.createSync({ host: this.adapter.config.hostUrl });
    
    // Get transport config with defaults for missing values
    const transportConfig = {
      ...this.adapter.config.transport
    };
    
    this.transport = new PostMessageTransport({
      url: signerUrl,
      ...transportConfig,
    });
    
    this.signer = new Signer({
      transport: this.transport
    });
    
    this.signerAgent = SignerAgent.createSync({
      signer: this.signer,
      account: Principal.anonymous(),
      agent: this.agent,
    });
  }

  protected async ensureTransportInitialized(): Promise<void> {
    if (!this.transport || !this.signer) {
      this.initializeTransport();
    }
  }

  // Override the base class method with a specific implementation
  async getAccountId(): Promise<string> {
    const principal = await this.getPrincipal();
    return deriveAccountId(principal);
  }
}
