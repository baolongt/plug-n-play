import { GlobalPnpConfig } from './index.d';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

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
  // WalletConnect specific options
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

// Union type for all adapter configs
export type AdapterSpecificConfig = 
  | IIAdapterConfig 
  | PlugAdapterConfig 
  | NFIDAdapterConfig 
  | OisyAdapterConfig 
  | SiwsAdapterConfig
  | SiweAdapterConfig
  | StoicAdapterConfig;

export function isPlugAdapterConfig(config: GlobalPnpConfig): config is PlugAdapterConfig {
  return 'whitelist' in config || 'host' in config;
}

export function isNFIDAdapterConfig(config: GlobalPnpConfig): config is NFIDAdapterConfig {
  return 'appName' in config || 'logoUrl' in config;
}

export function isOisyAdapterConfig(config: GlobalPnpConfig): config is OisyAdapterConfig {
  return 'appName' in config || 'logoUrl' in config;
}

export function isSiwsAdapterConfig(config: GlobalPnpConfig): config is SiwsAdapterConfig {
  return 'providerCanisterId' in config || 'signInMessage' in config;
}

export function isIIAdapterConfig(config: GlobalPnpConfig): config is IIAdapterConfig {
  return 'localIdentityCanisterId' in config || 'iiProviderUrl' in config || 'iiProviderOrigin' in config;
}

export function isStoicAdapterConfig(config: GlobalPnpConfig): config is StoicAdapterConfig {
  return 'keyType' in config && (config.keyType === 'ECDSA' || config.keyType === 'Ed25519');
}

export function isSiweAdapterConfig(config: GlobalPnpConfig): config is SiweAdapterConfig {
  return 'siweProviderCanisterId' in config;
} 