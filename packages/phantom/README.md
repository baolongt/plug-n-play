# @windoge98/pnp-phantom

Phantom wallet adapter for Plug-n-Play (PNP), providing Sign-In with Solana (SIWS) functionality for Internet Computer dApps.

## Installation

```bash
npm install @windoge98/pnp-phantom @windoge98/plug-n-play
```

## Usage

```typescript
import { createPNP } from '@windoge98/plug-n-play';
import { PhantomExtension } from '@windoge98/pnp-phantom';

const pnp = createPNP({
  network: 'ic',
  extensions: [PhantomExtension],
  providers: {
    siws: 'YOUR_SIWS_CANISTER_ID'
  },
  adapters: {
    phantom: {
      enabled: true,
      siwsProviderCanisterId: 'YOUR_SIWS_CANISTER_ID',
      solanaNetwork: WalletAdapterNetwork.Mainnet
    }
  }
});

// Connect to Phantom
const account = await pnp.connect('phantom');
```

## Features

- **SIWS Authentication**: Sign-In with Solana for IC authentication
- **Delegation Identity**: Secure delegation-based identity management
- **Transaction Support**: SOL balance queries and transaction fee estimation
- **Session Persistence**: Automatic session restoration
- **Network Support**: Mainnet and Devnet compatibility

## Configuration

```typescript
interface PhantomAdapterConfig {
  enabled: boolean;
  solanaNetwork?: WalletAdapterNetwork;
  siwsProviderCanisterId?: string;
  rpcEndpoint?: string;
}
```

## Requirements

- Phantom browser extension installed
- SIWS provider canister deployed on IC
- Browser environment (not supported in Node.js)

## License

MIT