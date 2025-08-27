import { Adapter } from "./types";
import { Adapters } from "./adapters";
import { GlobalPnpConfig } from ".";
import { AdapterExtension, mergeAdapterExtensions } from "./types/AdapterExtensions";

// Clean configuration input
export interface CreatePnpArgs {
  network?: 'local' | 'ic';
  ports?: { replica?: number; frontend?: number };
  delegation?: { timeout?: bigint; targets?: string[] };
  security?: { fetchRootKey?: boolean; verifyQuerySignatures?: boolean };
  storage?: { key?: string };
  providers?: {
    siws?: string;
    siwe?: string; 
    frontend?: string;
  };
  extensions?: AdapterExtension<any>[]; // New: declarative adapter extensions
  adapters?: Record<string, AdapterOverride>;
}

// Adapter override with flat structure
type AdapterOverride = {
  enabled?: boolean;
  [key: string]: any;
};

// Defaults
const DEFAULTS = {
  network: 'ic' as const,
  ports: { replica: 8080, frontend: 3000 },
  delegation: {
    timeout: BigInt(24 * 60 * 60 * 1000 * 1000 * 1000),
    targets: [] as string[]
  },
  storage: { key: 'pnpState' }
};

// Clean configuration factory  
export function createPNPConfig(input: CreatePnpArgs = {}): GlobalPnpConfig {
  const network = input.network || DEFAULTS.network;
  const isLocal = network === 'local';
  const ports = { ...DEFAULTS.ports, ...input.ports };
  const delegation = { ...DEFAULTS.delegation, ...input.delegation };
  const storage = { ...DEFAULTS.storage, ...input.storage };
  const providers = input.providers || {};
  
  // Computed values
  const hostUrl = isLocal 
    ? `http://127.0.0.1:${ports.replica}`
    : 'https://icp0.io';
    
  const derivationOrigin = providers.frontend && !isLocal
    ? `https://${providers.frontend}.icp0.io`
    : `http://localhost:${ports.frontend}`;

  // Merge extensions if provided
  const extensionAdapters = input.extensions 
    ? mergeAdapterExtensions(...input.extensions)
    : {};
  
  // Process adapters with concise merging
  const adapters: Record<string, Adapter.Config> = {};
  const adapterIds = new Set([
    ...Object.keys(Adapters),
    ...Object.keys(extensionAdapters),
    ...Object.keys(input.adapters || {})
  ]);
  
  
  for (const id of adapterIds) {
    // Check in order: built-in, extensions, overrides
    const base = Adapters[id] || extensionAdapters[id];
    const override = input.adapters?.[id];
    
    
    // Custom adapter without base
    if (!base && override?.adapter) {
      adapters[id] = override as any;
      continue;
    }
    
    if (!base) continue;
    
    // Merge configuration efficiently
    adapters[id] = {
      ...base,
      enabled: override?.enabled ?? base.enabled,
      config: {
        ...base.config,
        // Global settings
        hostUrl,
        derivationOrigin,
        fetchRootKey: input.security?.fetchRootKey ?? isLocal,
        verifyQuerySignatures: input.security?.verifyQuerySignatures ?? !isLocal,
        delegationTimeout: delegation.timeout,
        delegationTargets: delegation.targets,
        localStorageKey: storage.key,
        // Provider IDs
        siwsProviderCanisterId: providers.siws,
        siweProviderCanisterId: providers.siwe,
        frontendCanisterId: providers.frontend,
        // Adapter-specific overrides (excluding 'enabled' and 'config')
        ...Object.fromEntries(
          Object.entries(override || {})
            .filter(([k]) => k !== 'enabled' && k !== 'config')
        ),
        // Merge user's config overrides last to allow per-adapter customization
        ...(override?.config || {})
      }
    };
  }

  // Return clean global config
  return {
    dfxNetwork: network,
    replicaPort: ports.replica,
    hostUrl,
    delegationTimeout: delegation.timeout,
    delegationTargets: delegation.targets,
    derivationOrigin,
    fetchRootKey: input.security?.fetchRootKey ?? isLocal,
    verifyQuerySignatures: input.security?.verifyQuerySignatures ?? !isLocal,
    localStorageKey: storage.key,
    siwsProviderCanisterId: providers.siws,
    siweProviderCanisterId: providers.siwe,
    adapters
  };
}

// Builder pattern for cleaner configuration
export class ConfigBuilder {
  private config: CreatePnpArgs = {};
  
  static create(): ConfigBuilder {
    return new ConfigBuilder();
  }
  
  withEnvironment(network: 'local' | 'ic', ports?: { replica?: number; frontend?: number }): this {
    this.config.network = network;
    if (ports) this.config.ports = ports;
    return this;
  }
  
  // Named-args friendly API with backward compatibility for positional args
  withDelegation(
    optionsOrTimeout?: { timeout?: bigint; targets?: string[] } | bigint,
    maybeTargets?: string[]
  ): this {
    if (typeof optionsOrTimeout === 'object' && optionsOrTimeout !== null) {
      const { timeout, targets } = optionsOrTimeout;
      this.config.delegation = { timeout, targets };
      return this;
    }
    // Back-compat: (timeout?, targets?)
    const timeout = optionsOrTimeout as bigint | undefined;
    const targets = maybeTargets;
    this.config.delegation = { timeout, targets };
    return this;
  }
  
  withSecurity(fetchRootKey?: boolean, verifyQuerySignatures?: boolean): this {
    this.config.security = { fetchRootKey, verifyQuerySignatures };
    return this;
  }
  
  withProviders(providers: CreatePnpArgs['providers']): this {
    this.config.providers = providers;
    return this;
  }
  
  withExtensions(...extensions: AdapterExtension<any>[]): this {
    this.config.extensions = extensions;
    return this;
  }
  
  withAdapter(id: string, override: AdapterOverride): this {
    if (!this.config.adapters) this.config.adapters = {};
    this.config.adapters[id] = override;
    return this;
  }
  
  /**
   * Quick builder to enable Internet Computer adapters with optional overrides.
   *
   * Usage examples:
   * - withIcAdapters() // enables ii, plug, oisy, nfid, stoic
   * - withIcAdapters({ plug: { enabled: true, whitelist: ['canister1'] } })
   * - withIcAdapters({ ii: false }) // disables ii while enabling the rest
   */
  withIcAdapters(
    overrides?: Partial<Record<'ii' | 'plug' | 'oisy' | 'nfid' | 'stoic', AdapterOverride | boolean>> & {
      exclude?: Array<'ii' | 'plug' | 'oisy' | 'nfid' | 'stoic'>;
    }
  ): this {
    const icIds = ['ii', 'plug', 'oisy', 'nfid', 'stoic'] as const;
    const excluded = new Set(overrides && 'exclude' in overrides ? (overrides.exclude || []) : []);
    if (!this.config.adapters) this.config.adapters = {};
    
    // No overrides provided: enable all IC adapters by default
    if (!overrides) {
      for (const id of icIds) {
        if (Adapters[id] && !excluded.has(id)) {
          this.config.adapters[id] = { enabled: true };
        }
      }
      return this;
    }
    
    // Apply per-adapter overrides, defaulting unspecified to enabled: true
    for (const id of icIds) {
      if (!Adapters[id]) continue;
      if (excluded.has(id)) {
        this.config.adapters[id] = { ...(this.config.adapters[id] || {}), enabled: false };
        continue;
      }
      const override = overrides[id];
      
      if (override === undefined) {
        if (!this.config.adapters[id]) this.config.adapters[id] = { enabled: true };
        continue;
      }
      
      if (typeof override === 'boolean') {
        this.config.adapters[id] = { ...(this.config.adapters[id] || {}), enabled: override };
      } else {
        this.config.adapters[id] = {
          ...(this.config.adapters[id] || {}),
          ...override,
          enabled: override.enabled ?? true
        } as any;
      }
    }
    
    return this;
  }
  
  build(): GlobalPnpConfig {
    return createPNPConfig(this.config);
  }
}
