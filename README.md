# Plug N Play for the Internet Computer

Unified wallet adapter for Internet Computer dApps with support for IC, Solana (SIWS), and Ethereum (SIWE) wallets.

## Features

- 🔌 **Multiple Wallets** - Internet Identity, NFID, Plug, Oisy, Phantom, Solflare, WalletConnect
- 📦 **Modular** - Install only what you need (core, solana, ethereum packages)
- 🚀 **Simple API** - Connect, disconnect, and interact with canisters easily
- 🔐 **ICRC Standards** - Full support for IC wallet standards
- ⚡ **Lightweight** - Minimal dependencies, optimized bundles

## Installation

```bash
# Core (IC wallets)
npm install @windoge98/plug-n-play

# Optional: Solana wallets
npm install @windoge98/pnp-solana

# Optional: Ethereum wallets (coming soon)
npm install @windoge98/pnp-ethereum
```

## Quick Start

```typescript
import { createPNP } from "@windoge98/plug-n-play";

// Create PNP instance
const pnp = createPNP({
  network: 'ic', // or 'local' for development
  adapters: {
    ii: { enabled: true },
    plug: { enabled: true }
  }
});

// Connect wallet
const account = await pnp.connect('ii');

// Use with canister
const actor = pnp.getActor(canisterId, idl);
await actor.someMethod();
```

## Configuration

### Complete Example

```typescript
import { createPNP, ConfigBuilder } from "@windoge98/plug-n-play";

// Option 1: Object configuration with extensions
const pnp = createPNP({
  network: 'ic',
  ports: { replica: 8080, frontend: 3000 },
  security: { fetchRootKey: false, verifyQuerySignatures: true },
  delegation: { 
    timeout: BigInt(24 * 60 * 60 * 1000 * 1000 * 1000),
    targets: ['canister1', 'canister2']
  },
  providers: {
    siws: 'SIWS_CANISTER_ID',
    siwe: 'SIWE_CANISTER_ID', 
    frontend: 'FRONTEND_CANISTER_ID'
  },
  extensions: [SolanaExtension], // Declarative extension loading
  adapters: {
    ii: { enabled: true },
    plug: { enabled: true },
    phantomSiws: { enabled: true },
    walletconnectSiws: { 
      enabled: true,
      walletConnectProjectId: "YOUR_PROJECT_ID",
      appName: "Your App"
    }
  }
});

// Option 2: Builder pattern
const pnp2 = createPNP(
  ConfigBuilder.create()
    .withEnvironment('local', { replica: 8080 })
    .withSecurity(true, false)
    .withAdapter('ii', { enabled: true })
    .build()
);

```

### Configuration Options

| Group | Description | Default |
|-------|-------------|---------|
| `network` | 'local' or 'ic' | 'ic' |
| `ports` | `{ replica, frontend }` | `{ 8080, 3000 }` |
| `security` | `{ fetchRootKey, verifyQuerySignatures }` | Auto-configured |
| `delegation` | `{ timeout, targets }` | 1 day, [] |
| `providers` | `{ siws, siwe, frontend }` | undefined |
| `adapters` | Wallet configurations | All enabled |

## Adapter Extensions

### Declarative Adapter Registration

Instead of manual registration loops, use adapter extensions:

```typescript
import { createPNP } from '@windoge98/plug-n-play';
import { SolanaExtension } from '@windoge98/pnp-solana';
import { EthereumExtension } from '@windoge98/pnp-ethereum';

// Declarative configuration with extensions
const pnp = createPNP({
  extensions: [SolanaExtension, EthereumExtension],
  providers: { siws: 'YOUR_SIWS_CANISTER_ID' },
  adapters: {
    phantomSiws: { enabled: true },
    metamask: { enabled: true }
  }
});

// Or with builder pattern
const pnp2 = ConfigBuilder.create()
  .withExtensions(SolanaExtension, EthereumExtension)
  .withProviders({ siws: 'YOUR_SIWS_CANISTER_ID' })
  .withAdapter('phantomSiws', { enabled: true })
  .build();
```

### Creating Custom Extensions

```typescript
import { createAdapterExtension } from '@windoge98/plug-n-play';

export const MyCustomExtension = createAdapterExtension({
  myWallet: {
    id: 'myWallet',
    walletName: 'My Custom Wallet',
    chain: 'ICP',
    adapter: MyWalletAdapter,
    config: { /* adapter specific config */ }
  }
});
```

## API Reference

### Core Methods

```typescript
// Connection
await pnp.connect(walletId: string): Promise<Account>
await pnp.disconnect(): Promise<void>
pnp.isAuthenticated(): boolean

// Actor creation
pnp.getActor(canisterId: string, idl: IDL): ActorSubclass
pnp.getActor(canisterId, idl, { anon: true }) // Anonymous actor

// Wallet info
pnp.getEnabledWallets(): AdapterConfig[]
pnp.getAccount(): Account | null
```

### Common Operations

```typescript
// ICP Balance
const LEDGER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";
const actor = pnp.getActor(LEDGER_ID, ledgerIDL);
const balance = await actor.icrc1_balance_of({ 
  owner: Principal.fromText(account.owner),
  subaccount: [] 
});

// Transfer
await actor.icrc1_transfer({
  to: { owner: Principal.fromText(recipient), subaccount: [] },
  amount: BigInt(100_000_000), // 1 ICP in e8s
  fee: [], memo: [], from_subaccount: [], created_at_time: []
});
```

## Resources

- [Documentation](https://github.com/microdao-corporation/plug-n-play)
- [Issues](https://github.com/microdao-corporation/plug-n-play/issues)
- [License](https://github.com/microdao-corporation/plug-n-play/blob/main/LICENSE.txt)
