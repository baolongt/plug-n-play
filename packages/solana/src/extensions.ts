/// <reference path="./assets.d.ts" />

import { createAdapterExtension } from '../../../src/types/AdapterExtensions';
import { SiwsAdapter } from './SiwsAdapter';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

// Import actual logo files from assets
import phantomLogo from '../assets/phantom.webp';
import solflareLogo from '../assets/solflare.svg';
import walletConnectLogo from '../assets/walletconnect.webp';

/**
 * Solana wallet adapter extension for PNP
 * Provides SIWS (Sign-In with Solana) adapters
 */
export const SolanaExtension = createAdapterExtension({
  phantomSiws: {
    id: 'phantomSiws',
    enabled: false,
    walletName: 'Phantom',
    logo: phantomLogo,
    website: 'https://phantom.app',
    chain: 'SOL' as const,
    adapter: SiwsAdapter,
    config: {
      enabled: false,
      solanaNetwork: WalletAdapterNetwork.Mainnet,
      walletName: 'phantomSiws',
    }
  },
  solflareSiws: {
    id: 'solflareSiws',
    enabled: false,
    walletName: 'Solflare',
    logo: solflareLogo,
    website: 'https://solflare.com',
    chain: 'SOL' as const,
    adapter: SiwsAdapter,
    config: {
      enabled: false,
      solanaNetwork: WalletAdapterNetwork.Mainnet,
      walletName: 'solflareSiws',
    }
  },
  walletconnectSiws: {
    id: 'walletconnectSiws',
    enabled: false,
    walletName: 'WalletConnect',
    logo: walletConnectLogo,
    website: 'https://walletconnect.com',
    chain: 'SOL' as const,
    adapter: SiwsAdapter,
    config: {
      enabled: false,
      solanaNetwork: WalletAdapterNetwork.Mainnet,
      walletName: 'walletconnectSiws',
      projectId: 'YOUR_PROJECT_ID',
      appName: 'Your App',
      appDescription: 'A dApp using WalletConnect for Solana',
      appUrl: 'https://yourapp.com',
      appIcons: ['https://yourapp.com/logo.png'],
    }
  }
} as const);

// Export type for IDE support
export type SolanaAdapterIds = keyof typeof SolanaExtension['__adapters'];