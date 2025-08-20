// src/adapters/BaseSiwxAdapter.ts

import { Ed25519KeyIdentity, Delegation, DelegationChain, DelegationIdentity } from "@dfinity/identity";
import { type ActorSubclass, type Identity } from "@dfinity/agent";
import { BaseDelegationAdapter } from "./BaseDelegationAdapter";

/**
 * Base adapter for SIW* (Sign-In with X) flows that rely on delegation identities.
 * Provides shared helpers for provider actor creation, delegation identity building,
 * and simple address storage utilities.
 */
export abstract class BaseSiwxAdapter<TConfig = any> extends BaseDelegationAdapter<TConfig> {
  /** Resolve provider canister ID from multiple possible keys for backwards compatibility */
  protected resolveProviderCanisterId(): string {
    const cfg: any = this.config as any;
    const canisterId = cfg.providerCanisterId || cfg.siwsProviderCanisterId || cfg.siweProviderCanisterId;
    if (!canisterId) {
      throw new Error("Provider canister ID not configured.");
    }
    return String(canisterId);
  }

  /** Create a provider actor using the standard agent settings from base config */
  protected async createProviderActor<T>(idlFactory: any, identity?: Identity): Promise<ActorSubclass<T>> {
    const agent = await this.buildHttpAgent({ identity });
    return this.createActorWithAgent<T>(agent, this.resolveProviderCanisterId(), idlFactory);
  }

  /**
   * Build a DelegationIdentity from a signed delegation returned by a provider
   */
  protected createDelegationIdentity(
    signedDelegation: any,
    sessionIdentity: Ed25519KeyIdentity,
    userCanisterPublicKeyDer: ArrayBuffer,
  ): DelegationIdentity {
    const delegation = new Delegation(
      (signedDelegation.delegation.pubkey as Uint8Array).slice().buffer,
      signedDelegation.delegation.expiration,
      signedDelegation.delegation.targets?.length > 0
        ? signedDelegation.delegation.targets[0]
        : undefined,
    );

    const delegations = [
      {
        delegation,
        signature: (signedDelegation.signature as Uint8Array).slice().buffer as any,
      },
    ];

    const delegationChain = DelegationChain.fromDelegations(
      delegations,
      new Uint8Array(userCanisterPublicKeyDer).buffer,
    );

    return DelegationIdentity.fromDelegation(sessionIdentity, delegationChain);
  }

  // ----- Simple address storage helpers -----
  protected async storeExternalAddress(key: string, value: string): Promise<void> {
    try {
      await this.storage.set(key, value);
    } catch {
      // best-effort
    }
  }

  protected async readExternalAddress(key: string): Promise<string | null> {
    try {
      const val = await this.storage.get(key);
      return typeof val === 'string' ? val : null;
    } catch {
      return null;
    }
  }

  // Provide default no-op implementations so subclasses override only when needed
  protected async onStorageRestored(_sessionKey: Ed25519KeyIdentity, _delegationChain: DelegationChain): Promise<void> {
    /* no-op by default */
  }

  protected async onClearStoredSession(): Promise<void> {
    /* no-op by default */
  }
}


