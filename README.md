# Plug N Play for the Internet Computer

Unified wallet adapter for Internet Computer dApps with support for IC, Solana (SIWS), and Ethereum (SIWE) wallets.

## Latest Updates (v0.1.0-beta.13)

### MetaMask Session Persistence Fixed! 🎉

- ✅ Sessions now persist across page refreshes
- ✅ Proper cleanup when user closes MetaMask window
- ✅ 45-second connection timeout prevents hanging states
- ✅ Improved error messages for better UX

## Features

- 🔌 **Multiple Wallets** - Internet Identity, NFID, Plug, Oisy, MetaMask, Phantom, Solflare, WalletConnect, OKX, Coinbase
- 📦 **Modular** - Install only what you need with separate wallet packages
- 🚀 **Simple API** - Connect, disconnect, and interact with canisters easily
- 🔐 **Multi-Chain** - Support for IC, Solana (SIWS), and Ethereum (SIWE)
- ⚡ **Lightweight** - Minimal dependencies, optimized bundles
- 🔄 **Session Management** - Reliable session persistence across all wallets

## Installation

```bash
# Core (IC wallets)
npm install @windoge98/plug-n-play@beta

# Individual wallet packages
npm install @windoge98/pnp-metamask@beta    # Ethereum - MetaMask
npm install @windoge98/pnp-phantom@beta     # Solana - Phantom
npm install @windoge98/pnp-solflare@beta    # Solana - Solflare
npm install @windoge98/pnp-walletconnect@beta # Solana - WalletConnect
npm install @windoge98/pnp-okx@beta         # Solana - OKX
npm install @windoge98/pnp-coinbase@beta    # Solana - Coinbase Wallet
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
import { MetaMaskExtension } from "@windoge98/pnp-metamask";
import { PhantomExtension } from "@windoge98/pnp-phantom";

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
  extensions: [MetaMaskExtension, PhantomExtension], // Modular wallet support
  adapters: {
    ii: { enabled: true },
    plug: { enabled: true },
    metamask: { 
      enabled: true,
      siweProviderCanisterId: 'YOUR_SIWE_CANISTER_ID'
    },
    phantom: { 
      enabled: true,
      siwsProviderCanisterId: 'YOUR_SIWS_CANISTER_ID'
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
import { MetaMaskExtension } from '@windoge98/pnp-metamask';
import { PhantomExtension } from '@windoge98/pnp-phantom';
import { WalletConnectExtension } from '@windoge98/pnp-walletconnect';

// Declarative configuration with extensions
const pnp = createPNP({
  extensions: [MetaMaskExtension, PhantomExtension, WalletConnectExtension],
  providers: { 
    siws: 'YOUR_SIWS_CANISTER_ID',
    siwe: 'YOUR_SIWE_CANISTER_ID'
  },
  adapters: {
    metamask: { enabled: true },
    phantom: { enabled: true },
    walletconnect: { 
      enabled: true,
      projectId: 'YOUR_PROJECT_ID'
    }
  }
});

// Or with builder pattern
const pnp2 = ConfigBuilder.create()
  .withExtensions(MetaMaskExtension, PhantomExtension)
  .withProviders({ 
    siws: 'YOUR_SIWS_CANISTER_ID',
    siwe: 'YOUR_SIWE_CANISTER_ID'
  })
  .withAdapter('metamask', { enabled: true })
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

## Resources

- [Documentation](https://github.com/microdao-corporation/plug-n-play)
- [Issues](https://github.com/microdao-corporation/plug-n-play/issues)
- [License](https://github.com/microdao-corporation/plug-n-play/blob/main/LICENSE.txt)
