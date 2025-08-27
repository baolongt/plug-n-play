/// <reference path="./assets.d.ts" />

// Rabby Wallet Package for PNP
import { RabbyAdapter, type RabbyAdapterConfig } from './RabbyAdapter';
import { createAdapterExtension } from '@windoge98/plug-n-play';

// Import Rabby logo
import rabbyLogo from '../assets/rabby.png';

/**
 * Rabby wallet extension for PNP
 * Provides Ethereum support via SIWE (Sign-In with Ethereum)
 */
export const RabbyExtension = createAdapterExtension({
  rabby: {
    id: 'rabby',
    enabled: false,
    walletName: 'Rabby',
    logo: rabbyLogo,
    website: 'https://rabby.io',
    chain: 'ETH' as const,
    adapter: RabbyAdapter,
    config: {
      enabled: false,
      // Provider canister ID should be set by the user
      siweProviderCanisterId: '',
    }
  }
});

// Export adapter and types
export { RabbyAdapter, type RabbyAdapterConfig };