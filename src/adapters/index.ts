import { Adapter } from "../types";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { SiwsAdapter } from "./ic/SiwsAdapter";
import { IIAdapter, PlugAdapter, NFIDAdapter, OisyAdapter, StoicAdapter, SiweAdapter } from "./ic";
import { getDefaultTransportConfig } from "../utils/configUtils"; 

// Import logos
import phantomLogo from "../../assets/phantom.webp";
import solflareLogo from "../../assets/solflare.svg";
import backpackLogo from "../../assets/backpack.webp";
import walletconnectLogo from "../../assets/walletconnect.webp";
import oisyLogo from "../../assets/oisy_logo.webp";
import nfidLogo from "../../assets/nfid.webp";
import dfinityLogo from "../../assets/dfinity.webp";
import plugLogo from "../../assets/plug.webp";
import stoicLogo from "../../assets/stoic.jpg";
import metamaskLogo from "../../assets/metamask.png";

// Define the unified adapters map
export const Adapters: Record<string, Adapter.Config> = {
  // Solana Adapters
  phantomSiws: {
    id: 'phantomSiws',
    enabled: false,
    walletName: "Phantom",
    logo: phantomLogo,
    website: "https://phantom.app",
    chain: 'SOL',
    adapter: SiwsAdapter,
    config: {
      enabled: false,
      solanaNetwork: WalletAdapterNetwork.Mainnet,
    },
  },
  solflareSiws: {
    id: 'solflareSiws',
    enabled: false,
    walletName: "Solflare",
    logo: solflareLogo,
    website: "https://solflare.com",
    chain: 'SOL',
    adapter: SiwsAdapter,
    config: {
      enabled: false,
      solanaNetwork: WalletAdapterNetwork.Mainnet,
    },
  },
  backpackSiws: {
    id: 'backpackSiws',
    enabled: false,
    walletName: "Backpack",
    logo: backpackLogo,
    website: "https://backpack.app",
    chain: 'SOL',
    adapter: SiwsAdapter,
    config: {
      enabled: false,
      solanaNetwork: WalletAdapterNetwork.Mainnet,
    },
  },
  walletconnectSiws: {
    id: 'walletconnectSiws',
    enabled: false,
    walletName: "WalletConnect",
    logo: walletconnectLogo,
    website: "https://walletconnect.com",
    chain: 'SOL',
    adapter: SiwsAdapter,
    config: {
      enabled: false,
      solanaNetwork: WalletAdapterNetwork.Mainnet,
      projectId: 'YOUR_PROJECT_ID',
      appName: 'Windoge98',
      appDescription: 'A dApp using WalletConnect for Solana',
      appUrl: 'https://desktop.windoge98.com',
      appIcons: ['https://desktop.windoge98.com/logo.png'],
    },
  },

  // Internet Computer Adapters
  oisy: {
    id: 'oisy',
    enabled: true,
    walletName: "OISY Wallet",
    logo: oisyLogo,
    website: "https://oisy.com",
    chain: 'ICP',
    adapter: OisyAdapter,
    config: {
      signerUrl: "https://oisy.com/sign",
      transport: getDefaultTransportConfig(),
    },
  },
  nfid: {
    id: 'nfid',
    enabled: true,
    walletName: "NFID",
    logo: nfidLogo,
    website: "https://nfid.one",
    chain: 'ICP',
    adapter: NFIDAdapter,
    config: {
      signerUrl: "https://nfid.one/rpc",
      fetchRootKey: false,
      verifyQuerySignatures: true,
      transport: getDefaultTransportConfig(),
    },
  },
  ii: {
    id: 'ii',
    enabled: true,
    walletName: "Internet Identity",
    logo: dfinityLogo,
    website: "https://internetcomputer.org",
    chain: 'ICP',
    adapter: IIAdapter,
    config: {
      fetchRootKey: true,
      verifyQuerySignatures: false,
      timeout: 24 * 60 * 60 * 1000,
      localIdentityCanisterId: "rdmx6-jaaaa-aaaaa-aaadq-cai",
    },
  },
  plug: {
    id: 'plug',
    enabled: true,
    walletName: "Plug",
    logo: plugLogo,
    website: "https://plugwallet.ooo",
    chain: 'ICP',
    adapter: PlugAdapter,
    config: {
      delegationTargets: [],
      delegationTimeout: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
    },
  },
  stoic: {
    id: 'stoic',
    enabled: true,
    walletName: "Stoic",
    logo: stoicLogo,
    website: "https://www.stoicwallet.com",
    chain: 'ICP',
    adapter: StoicAdapter,
    config: {
      maxTimeToLive: BigInt(8 * 60 * 60 * 1000 * 1000 * 1000), // 8 hours
      keyType: 'ECDSA' as const,
    },
  },
  metamaskSiwe: {
    id: 'metamaskSiwe',
    enabled: true,
    walletName: "Metamask",
    logo: metamaskLogo,
    website: "https://metamask.io",
    chain: 'ETH',
    adapter: SiweAdapter,
  }
};

// Export all adapters for direct use
export { SiwsAdapter, IIAdapter, PlugAdapter, NFIDAdapter, OisyAdapter, StoicAdapter };

// Export base classes for extensibility
export { BaseAdapter } from "./BaseAdapter";
export { BaseDelegationAdapter } from "./BaseDelegationAdapter";
export { BaseSignerAdapter } from "./BaseSignerAdapter"; 