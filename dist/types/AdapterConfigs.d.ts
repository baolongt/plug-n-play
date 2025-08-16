import { GlobalPnpConfig } from './index.d';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
export interface IIAdapterConfig extends GlobalPnpConfig {
    localIdentityCanisterId?: string;
    maxTimeToLive?: bigint;
    derivationOrigin?: string;
    iiProviderUrl?: string;
    iiProviderOrigin?: string;
    timeout?: number;
}
export interface PlugAdapterConfig extends GlobalPnpConfig {
    whitelist?: string[];
    host?: string;
    timeout?: number;
    dev?: boolean;
}
export interface NFIDAdapterConfig extends GlobalPnpConfig {
    appName?: string;
    logoUrl?: string;
    maxTimeToLive?: bigint;
    derivationOrigin?: string;
    signerUrl?: string;
    transport?: {
        windowOpenerFeatures?: string;
        establishTimeout?: number;
        disconnectTimeout?: number;
        statusPollingRate?: number;
        detectNonClickEstablishment?: boolean;
    };
}
export interface OisyAdapterConfig extends GlobalPnpConfig {
    appName?: string;
    logoUrl?: string;
    maxTimeToLive?: bigint;
    derivationOrigin?: string;
    signerUrl?: string;
    transport?: {
        windowOpenerFeatures?: string;
        establishTimeout?: number;
        disconnectTimeout?: number;
        statusPollingRate?: number;
        detectNonClickEstablishment?: boolean;
    };
}
export interface SiwsAdapterConfig extends GlobalPnpConfig {
    providerCanisterId?: string;
    maxTimeToLive?: bigint;
    derivationOrigin?: string;
    signInMessage?: string;
    signInDomain?: string;
    signInUri?: string;
    signInStatement?: string;
    signInNonce?: string;
    signInExpirationTime?: number;
    solanaNetwork?: WalletAdapterNetwork;
    projectId?: string;
    appName?: string;
    appDescription?: string;
    appUrl?: string;
    appIcons?: string[];
}
export interface StoicAdapterConfig extends GlobalPnpConfig {
    maxTimeToLive?: bigint;
    keyType?: 'ECDSA' | 'Ed25519';
}
export interface SiweAdapterConfig extends GlobalPnpConfig {
    siweProviderCanisterId?: string;
    providerCanisterId?: string;
    maxTimeToLive?: bigint;
    derivationOrigin?: string;
}
export type AdapterSpecificConfig = IIAdapterConfig | PlugAdapterConfig | NFIDAdapterConfig | OisyAdapterConfig | SiwsAdapterConfig | SiweAdapterConfig | StoicAdapterConfig;
export declare function isPlugAdapterConfig(config: GlobalPnpConfig): config is PlugAdapterConfig;
export declare function isNFIDAdapterConfig(config: GlobalPnpConfig): config is NFIDAdapterConfig;
export declare function isOisyAdapterConfig(config: GlobalPnpConfig): config is OisyAdapterConfig;
export declare function isSiwsAdapterConfig(config: GlobalPnpConfig): config is SiwsAdapterConfig;
export declare function isIIAdapterConfig(config: GlobalPnpConfig): config is IIAdapterConfig;
export declare function isStoicAdapterConfig(config: GlobalPnpConfig): config is StoicAdapterConfig;
export declare function isSiweAdapterConfig(config: GlobalPnpConfig): config is SiweAdapterConfig;
