// Basic types needed for the Solana adapter
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export interface SiwsAdapterConfig {
  enabled?: boolean;
  solanaNetwork?: WalletAdapterNetwork;
  walletName?: string;
  projectId?: string;
  appName?: string;
  appDescription?: string;
  appUrl?: string;
  appIcons?: string[];
  siwsProviderCanisterId?: string;
}

export interface AdapterConstructorArgs {
  adapter: {
    id: string;
    walletName: string;
    logo: string;
  };
  config: SiwsAdapterConfig;
}

export interface Wallet {
  owner: string;
  account?: string;
}