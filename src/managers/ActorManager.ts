import { Actor, HttpAgent, ActorSubclass } from "@dfinity/agent";
import { AdapterInterface, GetActorOptions } from "../types/AdapterTypes";
import { GlobalPnpConfig } from "../types/index.d";
import { fetchRootKeyIfNeeded } from "../utils/icUtils";

export class ActorManager {
  private config: GlobalPnpConfig;
  private provider: AdapterInterface | null;
  private actorCache: Map<string, ActorSubclass<any>> = new Map();

  constructor(
    config: GlobalPnpConfig,
    provider: AdapterInterface | null = null
  ) {
    this.config = config;
    this.provider = provider;
  }

  setProvider(provider: AdapterInterface | null) {
    this.provider = provider;
  }

  getActor<T>(options: GetActorOptions): ActorSubclass<T> {
    const { canisterId, idl, anon = false, requiresSigning = false } = options;
    if (anon) {
      return this.createAnonymousActor<T>(canisterId, idl);
    }
    if (!this.provider) {
      throw new Error(
        "Cannot create signed actor. No wallet provider connected."
      );
    }
    const actor = this.provider.createActor<T>(canisterId, idl, {
      requiresSigning,
    });
    return actor;
  }

  createAnonymousActor<T>(canisterId: string, idl: any): ActorSubclass<T> {
    const cacheKey = `anon-${canisterId}`;
    const cachedActor = this.actorCache.get(cacheKey);
    if (cachedActor) return cachedActor;
    const agent = HttpAgent.createSync({
      host: this.config.hostUrl,
      verifyQuerySignatures: this.config.verifyQuerySignatures,
    });
    fetchRootKeyIfNeeded(agent, this.config.fetchRootKey);
    const actor = Actor.createActor<T>(idl, {
      agent,
      canisterId,
    });
    this.actorCache.set(cacheKey, actor);
    return actor;
  }

  clearCache() {
    this.actorCache.clear();
  }
}
