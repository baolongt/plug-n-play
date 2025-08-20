import { GlobalPnpConfig } from '.';
import { AdapterExtension } from './types/AdapterExtensions';
export interface CreatePnpArgs {
    network?: 'local' | 'ic';
    ports?: {
        replica?: number;
        frontend?: number;
    };
    delegation?: {
        timeout?: bigint;
        targets?: string[];
    };
    security?: {
        fetchRootKey?: boolean;
        verifyQuerySignatures?: boolean;
    };
    storage?: {
        key?: string;
    };
    providers?: {
        siws?: string;
        siwe?: string;
        frontend?: string;
    };
    extensions?: AdapterExtension<any>[];
    adapters?: Record<string, AdapterOverride>;
}
type AdapterOverride = {
    enabled?: boolean;
    [key: string]: any;
};
export declare function createPNPConfig(input?: CreatePnpArgs): GlobalPnpConfig;
export declare class ConfigBuilder {
    private config;
    static create(): ConfigBuilder;
    withEnvironment(network: 'local' | 'ic', ports?: {
        replica?: number;
        frontend?: number;
    }): this;
    withDelegation(optionsOrTimeout?: {
        timeout?: bigint;
        targets?: string[];
    } | bigint, maybeTargets?: string[]): this;
    withSecurity(fetchRootKey?: boolean, verifyQuerySignatures?: boolean): this;
    withProviders(providers: CreatePnpArgs['providers']): this;
    withExtensions(...extensions: AdapterExtension<any>[]): this;
    withAdapter(id: string, override: AdapterOverride): this;
    /**
     * Quick builder to enable Internet Computer adapters with optional overrides.
     *
     * Usage examples:
     * - withIcAdapters() // enables ii, plug, oisy, nfid, stoic
     * - withIcAdapters({ plug: { enabled: true, whitelist: ['canister1'] } })
     * - withIcAdapters({ ii: false }) // disables ii while enabling the rest
     */
    withIcAdapters(overrides?: Partial<Record<'ii' | 'plug' | 'oisy' | 'nfid' | 'stoic', AdapterOverride | boolean>> & {
        exclude?: Array<'ii' | 'plug' | 'oisy' | 'nfid' | 'stoic'>;
    }): this;
    build(): GlobalPnpConfig;
}
export {};
