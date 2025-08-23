# @windoge98/pnp-okx

OKX multi-chain wallet adapter for Plug-n-Play (PNP).

## Features

- **Multi-Chain Support**: Ethereum, Solana, BSC, Polygon, Avalanche, Arbitrum, Optimism, Fantom
- **Automatic Network Detection**: Detects which network OKX is currently on
- **Network Switching**: Programmatic network switching for EVM chains
- **SIWS/SIWE Integration**: Secure authentication with Internet Computer

## Installation

```bash
npm install @windoge98/pnp-okx
```

## Usage

```typescript
import { createPNP } from '@windoge98/plug-n-play';
import { OkxExtension } from '@windoge98/pnp-okx';

const pnp = createPNP({
  extensions: [OkxExtension],
  providers: {
    siws: 'YOUR_SIWS_CANISTER_ID', // For Solana
    siwe: 'YOUR_SIWE_CANISTER_ID', // For Ethereum/EVM
  },
  adapters: {
    okx: { 
      enabled: true,
      siwsProviderCanisterId: 'YOUR_SIWS_CANISTER_ID',
      siweProviderCanisterId: 'YOUR_SIWE_CANISTER_ID',
    }
  }
});

// Connect to OKX wallet
const account = await pnp.connect('okx');

// Get current network
const adapter = pnp.getAdapter('okx');
const network = adapter.getCurrentNetwork();
console.log('Connected to:', network);

// Switch network (EVM chains only)
await adapter.switchNetwork('polygon');
```

## Supported Networks

- **Ethereum** (Mainnet)
- **Solana** (Mainnet/Devnet)
- **BSC** (Binance Smart Chain)
- **Polygon**
- **Avalanche**
- **Arbitrum**
- **Optimism**
- **Fantom**

## Configuration

```typescript
{
  okx: {
    enabled: true,
    supportedNetworks: ['ethereum', 'solana'], // Optional: limit networks
    solanaNetwork: WalletAdapterNetwork.Mainnet,
    siwsProviderCanisterId: 'canister-id', // For Solana
    siweProviderCanisterId: 'canister-id', // For Ethereum/EVM
  }
}
```

## License

MIT