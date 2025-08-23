/// <reference path="./assets.d.ts" />

// MetaMask Wallet Package for PNP
import { MetaMaskAdapter, type MetaMaskAdapterConfig } from './MetaMaskAdapter';
import { createAdapterExtension } from '@windoge98/plug-n-play';

// Import MetaMask logo
import metamaskLogo from '../assets/metamask.png';

/**
 * MetaMask wallet extension for PNP
 * Provides Ethereum support via SIWE (Sign-In with Ethereum)
 */
export const MetaMaskExtension = createAdapterExtension({
  metamask: {
    id: 'metamask',
    enabled: false,
    walletName: 'MetaMask',
    logo: metamaskLogo,
    website: 'https://metamask.io',
    chain: 'ETH' as const,
    adapter: MetaMaskAdapter,
    config: {
      enabled: false,
      // Provider canister ID should be set by the user
      siweProviderCanisterId: '',
    }
  }
});

// Export adapter and types
export { MetaMaskAdapter, type MetaMaskAdapterConfig };