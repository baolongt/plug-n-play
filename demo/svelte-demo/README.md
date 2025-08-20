# PnP Svelte Demo

A modern Svelte application demonstrating the simplified PNP (Plug N Play) wallet adapter library for the Internet Computer ecosystem.

## Features

- 🔐 **Multi-Wallet Support**: Connect to Internet Identity, Plug, OISY, NFID, and Stoic wallets
- 👤 **Account Information**: Display Principal ID and Account ID
- 💰 **Balance Display**: Show ICP balance from the ledger canister
- 🔄 **Auto-Reconnect**: Automatically reconnect on page refresh
- 📊 **Event Tracking**: Real-time event display for debugging
- ⚡ **Optimized**: Uses the simplified PNP library (33% less code)

## Setup

### Prerequisites

- Node.js 18+ and npm/pnpm
- An Internet Computer wallet (Internet Identity, Plug, etc.)

### Installation

```bash
# From the demo directory
cd demo/svelte-demo
npm install

# Or using pnpm
pnpm install
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## How It Works

### 1. PNP Initialization

The demo uses the simplified PNP configuration:

```typescript
const pnp = createPNP({
    dfxNetwork: 'ic',           // IC mainnet
    fetchRootKey: false,         // Only true for local dev
    verifyQuerySignatures: true, // Verify responses
    
    // Wallet configurations (all enabled by default)
    adapters: {
        ii: { enabled: true },     // Internet Identity
        plug: { enabled: true },   // Plug wallet
        oisy: { enabled: true },   // OISY (UnifiedSignerAdapter)
        nfid: { enabled: true },   // NFID (UnifiedSignerAdapter)
        stoic: { enabled: true }   // Stoic (UnifiedSignerAdapter)
    }
});
```

### 2. State Management

The demo uses Svelte stores for reactive state:

- `pnpInstance` - The PNP library instance
- `isConnected` - Connection status
- `principalId` - User's principal ID
- `accountId` - Derived account ID
- `availableWallets` - List of enabled wallets
- `lastEvent` - Latest event for debugging
- `balance` - User's ICP balance

### 3. Wallet Connection Flow

1. User clicks a wallet button
2. PNP opens the wallet's authentication window
3. User approves the connection
4. App receives the principal ID and stores it
5. Balance is fetched from the ledger canister

## Project Structure

```
src/
├── App.svelte                    # Main app component
├── lib/
│   ├── components/
│   │   └── SignIn.svelte        # Wallet connection UI
│   ├── stores/
│   │   ├── pnp.ts              # PNP integration & state
│   │   └── ledger.ts           # Balance fetching
│   └── idls/                   # Canister interfaces
└── main.js                      # App entry point
```

## Key Improvements in Simplified Library

### Architecture Changes

- **Unified Adapters**: OISY, NFID, and Stoic now use a single `UnifiedSignerAdapter`
- **Consolidated Utils**: All utilities in one file instead of 4 separate files
- **Simplified Types**: Cleaner type definitions without namespaces
- **Modular Packages**: Solana/Ethereum support extracted to separate packages

### Performance Benefits

- **60% smaller bundle** for IC-only users
- **33% less code** (3,307 lines vs 4,934)
- **Faster builds** due to reduced complexity
- **Better tree-shaking** with modular structure

## Customization

### Adding Your Own Canisters

```typescript
// Import your canister IDL
import { idlFactory, canisterId } from './your-canister';

// Create an actor
const actor = pnp.getActor({
    canisterId,
    idl: idlFactory,
    anon: false // Requires authentication
});

// Call canister methods
const result = await actor.yourMethod();
```

### Selective Wallet Enable/Disable

```typescript
createPNP({
    adapters: {
        ii: { enabled: true },
        plug: { enabled: false }, // Disable specific wallets
        // ...
    }
});
```

### Adding Solana Support (Optional)

If you need Solana wallet support, install the separate package:

```bash
npm install @windoge98/pnp-solana
```

Then import and use:

```typescript
import { SolanaAdapters } from '@windoge98/pnp-solana';

// Register Solana adapters
Object.entries(SolanaAdapters).forEach(([id, config]) => {
    PNP.registerAdapter(id, config);
});
```

## Troubleshooting

### Connection Issues

- **Popup Blocked**: Ensure popups are allowed (especially Safari)
- **Extension Missing**: Plug requires browser extension
- **Auto-Reconnect Fails**: Clear localStorage and try again

### Common Errors

| Error | Solution |
|-------|----------|
| "PNP not initialized" | Ensure `initializePNP()` is called |
| "No principal ID" | User needs to connect wallet first |
| "Connection cancelled" | User rejected the connection |
| "Provider missing" | Wallet connection incomplete |

### Development Tips

- Enable browser DevTools for debugging
- Check the Events panel in the UI for connection flow
- Use `lastEvent` store to track state changes
- Clear localStorage to reset connection state

## Resources

- [PNP Library Documentation](../../README.md)
- [Internet Computer SDK](https://sdk.dfinity.org)
- [Svelte Documentation](https://svelte.dev)
- [Vite Documentation](https://vitejs.dev)

## License

MIT