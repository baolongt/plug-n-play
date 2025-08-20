/// <reference path="./assets.d.ts" />

import { createAdapterExtension } from '../../../src/types/AdapterExtensions';
import { SiweAdapter } from './SiweAdapter';

// Import actual logo file from assets
import metamaskLogo from '../assets/metamask.png';

/**
 * Ethereum wallet adapter extension for PNP
 * Provides SIWE (Sign-In with Ethereum) adapters
 */
export const EthereumExtension = createAdapterExtension({
  metamaskSiwe: {
    id: 'metamaskSiwe',
    enabled: false,
    walletName: 'MetaMask',
    logo: metamaskLogo,
    website: 'https://metamask.io',
    chain: 'ETH' as const,
    adapter: SiweAdapter,
    config: {
      walletName: 'metamaskSiwe',
      // SIWE-specific configuration
    }
  }
} as const);

// Export type for IDE support
export type EthereumAdapterIds = keyof typeof EthereumExtension['__adapters'];