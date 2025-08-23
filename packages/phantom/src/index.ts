/// <reference path="./assets.d.ts" />

// Phantom Wallet Package for PNP
import { PhantomAdapter, type PhantomAdapterConfig } from './PhantomAdapter';
import { createAdapterExtension } from '@windoge98/plug-n-play';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

// Import Phantom logo
import phantomLogo from '../assets/phantom.webp';

/**
 * Phantom Wallet extension for PNP
 * Provides Solana support via SIWS (Sign-In with Solana)
 */
export const PhantomExtension = createAdapterExtension({
  phantom: {
    id: 'phantom',
    enabled: false,
    walletName: 'Phantom',
    logo: phantomLogo,
    website: 'https://phantom.app',
    chain: 'SOL' as const,
    adapter: PhantomAdapter,
    config: {
      enabled: false,
      solanaNetwork: WalletAdapterNetwork.Mainnet,
      // Provider canister ID should be set by the user
      siwsProviderCanisterId: '',
    }
  }
});

// Export adapter and types
export { PhantomAdapter, type PhantomAdapterConfig };
export { formatSiwsMessage } from '@windoge98/plug-n-play';