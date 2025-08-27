import { Adapter } from "../types";
import { IIAdapter } from "./ic";
import { UnifiedSignerAdapter, SignerType } from "./ic/UnifiedSignerAdapter";
import { getDefaultTransportConfig } from "../utils";

// Import logos for IC wallets only
import oisyLogo from "../../assets/oisy_logo.webp";
import nfidLogo from "../../assets/nfid.png";
import dfinityLogo from "../../assets/dfinity.webp";
import plugLogo from "../../assets/plug.webp";
import stoicLogo from "../../assets/stoic.jpg";

// Define IC-only adapters using unified signer adapter
export const Adapters: Record<string, Adapter.Config> = {
  // Internet Computer Adapters
  oisy: {
    id: 'oisy',
    enabled: true,
    walletName: "OISY Wallet",
    logo: oisyLogo,
    website: "https://oisy.com",
    chain: 'ICP',
    adapter: UnifiedSignerAdapter,
    config: {
      signerType: SignerType.OISY,
      signerUrl: "https://oisy.com/sign",
      ...getDefaultTransportConfig(),
    },
  },
  nfid: {
    id: 'nfid',
    enabled: true,
    walletName: "NFID",
    logo: nfidLogo,
    website: "https://nfid.one",
    chain: 'ICP',
    adapter: UnifiedSignerAdapter,
    config: {
      signerType: SignerType.NFID,
      signerUrl: "https://nfid.one/rpc",
      fetchRootKey: false,
      verifyQuerySignatures: true,
      ...getDefaultTransportConfig(),
    },
  },
  stoic: {
    id: 'stoic',
    enabled: true,
    walletName: "Stoic",
    logo: stoicLogo,
    website: "https://www.stoicwallet.com",
    chain: 'ICP',
    adapter: UnifiedSignerAdapter,
    config: {
      signerType: SignerType.STOIC,
      maxTimeToLive: BigInt(8 * 60 * 60 * 1000 * 1000 * 1000), // 8 hours
      keyType: 'ECDSA' as const,
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
    adapter: UnifiedSignerAdapter,
    config: {
      signerType: SignerType.PLUG,
      ...getDefaultTransportConfig(),
    },
  },
};

// Export adapters for direct use
export { IIAdapter, UnifiedSignerAdapter };

// Export base classes for extensibility
export { BaseAdapter } from "./BaseAdapter";
export { BaseDelegationAdapter } from "./BaseDelegationAdapter";
export { BaseSignerAdapter } from "./BaseSignerAdapter";