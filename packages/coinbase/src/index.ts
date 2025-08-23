/// <reference path="./assets.d.ts" />

// Coinbase Wallet Package for PNP
import { CoinbaseAdapter, type CoinbaseAdapterConfig } from './CoinbaseAdapter';
import { createAdapterExtension } from '@windoge98/plug-n-play';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

// Import Coinbase logo
import coinbaseLogo from '../assets/coinbase.svg';

/**
 * Coinbase Wallet extension for PNP
 * Provides Solana support via SIWS (Sign-In with Solana)
 */
export const CoinbaseExtension = createAdapterExtension({
  coinbase: {
    id: 'coinbase',
    enabled: false,
    walletName: 'Coinbase Wallet',
    logo: coinbaseLogo,
    website: 'https://www.coinbase.com/wallet',
    chain: 'SOL' as const,
    adapter: CoinbaseAdapter,
    config: {
      enabled: false,
      solanaNetwork: WalletAdapterNetwork.Mainnet,
      // Provider canister ID should be set by the user
      siwsProviderCanisterId: '',
    }
  }
});

// Export adapter and types
export { CoinbaseAdapter, type CoinbaseAdapterConfig };
export { formatSiwsMessage } from '@windoge98/plug-n-play';