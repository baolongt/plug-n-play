/// <reference path="./assets.d.ts" />

import { SiweAdapter } from './SiweAdapter';

// Import logo
import metamaskLogo from "../assets/metamask.png";

// Export the adapter
export { SiweAdapter };

// Export the Ethereum extension for declarative registration
export { EthereumExtension } from './extensions';
export type { EthereumAdapterIds } from './extensions';

// Export Ethereum adapter configurations
export const EthereumAdapters = {
  metamaskSiwe: {
    id: 'metamaskSiwe',
    enabled: true,
    walletName: "Metamask",
    logo: metamaskLogo,
    website: "https://metamask.io",
    chain: 'ETH' as const,
    adapter: SiweAdapter,
    config: {
      // SIWE-specific configuration
    }
  }
};

// Re-export the configuration type
export interface SiweAdapterConfig {
  siweProviderCanisterId?: string;
  // Add other SIWE-specific config options
}