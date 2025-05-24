import { Principal } from "@dfinity/principal";
import { Actor, HttpAgent, type ActorSubclass } from "@dfinity/agent";
import { Ed25519KeyIdentity, DelegationChain, DelegationIdentity } from "@dfinity/identity";
import { type Wallet, Adapter } from "../../types/index.d";
import { PostMessageTransport } from "@slide-computer/signer-web";
import { SignerAgent } from "@slide-computer/signer-agent";
import { Signer } from "@slide-computer/signer";
import { SignerError } from "@slide-computer/signer";
import { BaseDelegationAdapter } from "../BaseDelegationAdapter";
import { 
  createAccountFromPrincipal, 
  isPrincipalAnonymous,
  fetchRootKeyIfNeeded
} from "../../utils/icUtils";
import { NFIDAdapterConfig } from "../../types/AdapterConfigs";

export class NFIDAdapter extends BaseDelegationAdapter<NFIDAdapterConfig> {
  private agent: HttpAgent;
  private signerAgent: SignerAgent<Signer> | null;
  private signer: Signer | null;
  private transport: PostMessageTransport | null;

  constructor(args: Adapter.ConstructorArgs) {
    super(args);

    // Get transport config with defaults for missing values
    const transportConfig = {
      ...this.adapter.config.transport
    };

    // Create transport with the configured URL and transport settings
    this.transport = new PostMessageTransport({
      url: this.adapter.config.signerUrl,
      ...transportConfig,
    });

    // Create signer with the transport
    this.signer = new Signer({
      transport: this.transport,
    });

    // Agent interacting with the Signer/NFID uses the provider URL
    const signerHttpAgent = HttpAgent.createSync({ host: this.adapter.config.hostUrl });

    this.signerAgent = SignerAgent.createSync({
      signer: this.signer,
      account: Principal.anonymous(), // Start anonymous
      agent: signerHttpAgent,
    });

    // General purpose agent for non-signed/initial actions
    this.agent = HttpAgent.createSync({ host: this.adapter.config.hostUrl });

    this.setState(Adapter.Status.READY);
  }

  // Implement abstract method from BaseDelegationAdapter
  protected async onStorageRestored(sessionKey: Ed25519KeyIdentity, delegationChain: DelegationChain): Promise<void> {
    this.signerAgent = SignerAgent.createSync({
      signer: this.signer!,
      account: this.identity!.getPrincipal(),
      agent: HttpAgent.createSync({ host: this.adapter.config.hostUrl }),
    });
  }

  // Implement abstract method from BaseDelegationAdapter
  protected async onClearStoredSession(): Promise<void> {
    this.signerAgent = null;
  }

  async openChannel(): Promise<void> {
	if (this.signer) {
		await this.signer.openChannel();
	}
  }

  async isConnected(): Promise<boolean> {
    return this.identity !== null && this.state === Adapter.Status.CONNECTED;
  }

  async getPrincipal(): Promise<string> {
    if (!this.identity) {
      throw new Error("NFID Adapter: Not connected. Call connect() first.");
    }
    return this.identity.getPrincipal().toText();
  }

  unwrapResponse = <T extends any>(response: any): T => {
    if ("error" in response) {
      throw new SignerError(response.error);
    }
    if ("result" in response) {
      return response.result;
    }
    throw new SignerError({
      code: 500,
      message: "Invalid response",
    });
  };

  async connect(): Promise<Wallet.Account> {
    // If we're already connected, return the current account
    if (this.identity && this.state === Adapter.Status.CONNECTED) {
      return createAccountFromPrincipal(this.identity.getPrincipal());
    }

    // Try to restore from storage first
    // Note: restoreFromStorage itself doesn't throw on "not found", but connect should proceed.
    // It will set state to CONNECTED if successful.
    if (!this.identity) { // Check if not already connected by a previous restore attempt (e.g. in constructor)
        try {
            await this.restoreFromStorage();
            if (this.identity && this.state === Adapter.Status.CONNECTED) {
                 return createAccountFromPrincipal(this.identity.getPrincipal());
            }
        } catch (error) {
            // restoreFromStorage already logs its errors and clears session.
            console.debug("[NFID] Failed to restore from storage during connect call:", error);
        }
    }
    
    // If after attempting restore, we are now connected, return.
    if (this.identity && this.state === Adapter.Status.CONNECTED) {
      return createAccountFromPrincipal(this.identity.getPrincipal());
    }


    this.setState(Adapter.Status.CONNECTING);

    if (!this.signer || !this.transport || !this.agent) {
      this.setState(Adapter.Status.ERROR);
      throw new Error("NFID Adapter not initialized correctly.");
    }

    try {
      await this.signer.openChannel();
      
      // Generate a new session key ONLY if one wasn't restored/doesn't exist.
      // However, for NFID flow, a new session key is typically generated for each new delegation request.
      this.sessionKey = Ed25519KeyIdentity.generate(); 

      const maxTimeToLiveNs =
        this.adapter.config.delegationTimeout !== undefined
          ? BigInt(Date.now() * 1_000_000) +
            BigInt(this.adapter.config.delegationTimeout)
          : BigInt(Date.now() * 1_000_000) +
            BigInt(48 * 60 * 60 * 1_000_000_000); 

      const delegationChain = await this.signer.delegation({
        publicKey: this.sessionKey.getPublicKey().toDer(),
        targets: Array.isArray(this.adapter.config.delegationTargets) 
          ? this.adapter.config.delegationTargets
              .filter((target): target is string => typeof target === 'string' && target.length > 0)
              .map(target => Principal.fromText(target))
          : [],
        maxTimeToLive: maxTimeToLiveNs,
      });

      await this.storeSession(this.sessionKey, delegationChain);

      const delegationIdentity = DelegationIdentity.fromDelegation(
        this.sessionKey,
        delegationChain
      );

      this.signerAgent = SignerAgent.createSync({
        signer: this.signer,
        account: delegationIdentity.getPrincipal(),
        agent: HttpAgent.createSync({ host: this.adapter.config.hostUrl }), 
      });

      this.identity = delegationIdentity;

      if (this.adapter.config.fetchRootKey) { 
        await fetchRootKeyIfNeeded(this.agent, true);
      }

      const principal = delegationIdentity.getPrincipal();

      if (isPrincipalAnonymous(principal)) {
        this.setState(Adapter.Status.READY);
        await this.clearStoredSession(); // Clear stored session data
        throw new Error(
          "Failed to authenticate with NFID - got anonymous principal"
        );
      }

      this.setState(Adapter.Status.CONNECTED);
      return createAccountFromPrincipal(principal);
    } catch (error) {
      console.error("[NFID] Connection failed:", error);
      await this.clearStoredSession(); // Ensure cleanup
      if (this.signer) {
        try {
          this.signer.closeChannel();
        } catch (e) {
          console.debug("[NFID] Error closing channel on connect failure:", e);
        }
      }
      this.setState(Adapter.Status.READY);
      throw error;
    }
  }

  undelegatedActor<T>(canisterId: string, idlFactory: any): ActorSubclass<T> {
    const agent = HttpAgent.createSync({
      identity: this.identity,
      host: this.adapter.config.hostUrl, 
      verifyQuerySignatures: this.adapter.config.verifyQuerySignatures, 
    });
    const actor = Actor.createActor<T>(idlFactory, {
      agent: agent,
      canisterId,
    });
    return actor;
  }

  // Implementation for BaseIcAdapter actor caching
  protected createActorInternal<T>(
    canisterId: string,
    idlFactory: any,
    options?: { requiresSigning?: boolean }
  ): ActorSubclass<T> {
    const requiresSigning = options?.requiresSigning !== false; // Default to true
    if (!this.identity) {
      throw new Error("Not connected. Identity not available.");
    }
    if (!this.signerAgent && requiresSigning) {
      throw new Error("Signer agent not available. Please connect first.");
    }
    if (!this.adapter.config.hostUrl) {
      throw new Error("Host URL configuration is missing.");
    }

    try {
      // Check if canister id is in the delegation targets
      const inTargets = this.identity
        .getDelegation()
        .delegations.some((d) =>
          d.delegation.targets?.some((p) => p.toText() === canisterId)
        );

      // Determine if we should use undelegated actor
      if ((inTargets && !requiresSigning) || (!inTargets && !requiresSigning)) {
        return this.undelegatedActor<T>(canisterId, idlFactory);
      }

      // Create actor with delegation identity for authenticated calls
      if (requiresSigning) {
        return Actor.createActor<T>(idlFactory, {
          agent: this.signerAgent,
          canisterId,
        });
      }

      // Fallback case
      return Actor.createActor<T>(idlFactory, {
        agent: this.signerAgent,
        canisterId,
      });
    } catch (error) {
      console.error("Error creating actor:", error);
      throw new Error(
        `Failed to create actor: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  // disconnect is handled by BaseIcAdapter, implement internal methods instead
  protected async disconnectInternal(): Promise<void> {
    console.debug("[NFID] Disconnecting internally...");
    await this.clearStoredSession(); // Clear stored session data
    // this.identity, this.signerAgent, this.sessionKey are nulled in clearStoredSession

    try {
      if (this.signer) {
        this.signer.closeChannel(); 
      }
    } catch (error) {
      console.error("[NFID] Error during disconnect internal cleanup:", error);
    }
    // State change will be handled by BaseAdapter's disconnect method
  }

  protected cleanupInternal(): void {
    // This method is called by BaseAdapter's disconnect AFTER disconnectInternal.
    // clearStoredSession already handles most of this.
    // Nullify resources not directly tied to a specific session but to the adapter instance if needed.
    // For NFID, most are session-specific or re-initialized.
    // this.transport and this.signer are more persistent but re-created on constructor for now.
    // If they were meant to survive across multiple connect/disconnect cycles without re-instantiation,
    // their cleanup would be more nuanced. Given current structure, this is likely fine.
    console.debug("[NFID] Performing final cleanup (transport/signer are re-created on new instance).");
    // this.transport = null; // Potentially, if not re-created on new adapter instance
    // this.signer = null;    // Potentially
  }
}
