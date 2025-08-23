# @windoge98/pnp-coinbase

Coinbase Wallet adapter for Plug-n-Play (PNP) - Internet Computer's unified wallet connection library.

## Installation

```bash
npm install @windoge98/pnp-coinbase
```

## Usage

```typescript
import { createPNP } from '@windoge98/plug-n-play';
import { CoinbaseExtension } from '@windoge98/pnp-coinbase';

// Initialize PNP with Coinbase extension
const pnp = createPNP({
  extensions: [CoinbaseExtension],
  adapters: {
    coinbase: {
      enabled: true,
      siwsProviderCanisterId: 'your-siws-canister-id',
      solanaNetwork: WalletAdapterNetwork.Mainnet, // or Devnet
    }
  }
});

// Connect to Coinbase wallet
await pnp.connect('coinbase');

// Get Solana address
const solAddress = await pnp.getAddress('coinbase', 'sol');

// Get IC Principal
const principal = await pnp.getPrincipal();

// Create IC actor with delegation identity
const actor = await pnp.getActor('your-canister-id', yourIdlFactory);
```

## Features

- **SIWS Authentication**: Sign-In with Solana for Internet Computer
- **Delegation Identity**: Create IC actors with Solana wallet delegation
- **Multi-Chain Support**: Access both Solana and IC addresses
- **Session Persistence**: Automatic session management
- **SPL Token Support**: Full support for Solana SPL tokens

## Configuration

### Required Setup

1. **SIWS Provider Canister**: Deploy or use an existing SIWS provider canister on IC
2. **Coinbase Wallet**: Install the Coinbase Wallet browser extension
3. **Solana Network**: Configure for Mainnet or Devnet

### Configuration Options

```typescript
interface CoinbaseAdapterConfig {
  enabled: boolean;                    // Enable/disable adapter
  solanaNetwork?: WalletAdapterNetwork; // Mainnet or Devnet
  siwsProviderCanisterId?: string;     // IC SIWS provider canister ID
  rpcEndpoint?: string;                // Custom Solana RPC endpoint
}
```

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Requires special handling for popup blockers (use `pnp.openChannel()` before connect)

## License

MIT