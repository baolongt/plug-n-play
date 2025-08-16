# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Plug N Play (PNP) is a wallet adapter library for the Internet Computer (IC) ecosystem. It provides a unified interface for connecting to various IC wallets and experimental support for Sign-In with Solana (SIWS).

## Project Structure

```text
w98-pnp/
├── src/
│   ├── index.ts              # Main entry point, PNP class
│   ├── config.ts             # Configuration management
│   ├── adapters/             # Wallet adapter implementations
│   │   ├── BaseAdapter.ts    # Abstract base class for adapters
│   │   ├── BaseDelegationAdapter.ts
│   │   ├── BaseSignerAdapter.ts
│   │   └── ic/               # IC-specific adapters
│   │       ├── IIAdapter.ts  # Internet Identity
│   │       ├── NFIDAdapter.ts
│   │       ├── OisyAdapter.ts
│   │       ├── PlugAdapter.ts
│   │       └── SiwsAdapter.ts # Sign-In with Solana base
│   ├── managers/             # Core functionality managers
│   │   ├── ActorManager.ts   # IC actor creation/caching
│   │   ├── ConfigManager.ts  # Configuration merging
│   │   ├── ConnectionManager.ts # Wallet connections
│   │   ├── ErrorManager.ts   # Error handling & logging
│   │   ├── StateManager.ts   # State machine
│   │   ├── StatePersistenceManager.ts # State persistence
│   │   └── SplTokenManager.ts # SPL token operations
│   ├── types/                # TypeScript definitions
│   │   ├── index.d.ts        # Main type definitions
│   │   ├── AdapterTypes.ts   # Adapter interfaces
│   │   ├── AdapterConfigs.ts # Adapter configurations
│   │   └── WalletTypes.ts    # Wallet-related types
│   ├── utils/                # Utility functions
│   └── did/                  # Interface definitions
├── tests/                    # Test files
├── dist/                     # Build output
├── demo/                     # Demo applications
└── docs/                     # Documentation

```

## Key Commands

### Build

```bash
npm run build       # Production build with minification
# or
pnpm build         # If using pnpm
```

- Builds the library using Vite
- Outputs ES module format to `dist/plug-n-play.es.js`
- Generates TypeScript declarations in `dist/`
- Applies gzip and brotli compression in production

### Test

```bash
npm test          # Run tests in watch mode
npm run test:ui   # Run tests with Vitest UI
npm run coverage  # Generate test coverage report
```

- Tests use Vitest with jsdom environment
- Test files: `tests/*.test.ts`
- Coverage reports in `coverage/`

### Development

```bash
npm run dev       # Start Vite dev server
npm run preview   # Preview production build
```

## Architecture Overview

### Core Components

1. **PNP Class** (`src/index.ts`)
   - Main entry point and public API
   - Orchestrates all managers
   - Static adapter registry for custom adapters
   - Methods: `connect()`, `disconnect()`, `getActor()`, `isAuthenticated()`

2. **Managers** (`src/managers/`)
   - **ConnectionManager**: Handles adapter lifecycle, wallet connections/disconnections
   - **ActorManager**: Creates and caches IC actors with optimized cache keys
   - **ConfigManager**: Merges global config with adapter-specific settings
   - **StateManager**: Enforces valid state transitions (INITIALIZED → CONNECTING → CONNECTED)
   - **ErrorManager**: Centralized error handling with log levels (DEBUG, INFO, WARN, ERROR)
   - **SplTokenManager**: SPL token operations for SIWS (Solana) adapters
   - **StatePersistenceManager**: Persists/recovers state across page reloads

3. **Adapters** (`src/adapters/`)
   - **Base Classes**:
     - `BaseAdapter`: Common functionality for all adapters
     - `BaseDelegationAdapter`: For IC delegation-based wallets
     - `BaseSignerAdapter`: For IC signer-based wallets
   - **IC Adapters**: Internet Identity, NFID, Plug, Oisy
   - **SIWS Adapters**: Experimental Solana wallet support (Phantom, Solflare, WalletConnect)

4. **Configuration** (`src/config.ts`)
   - `createPNPConfig()`: Factory function for configuration
   - Environment detection (local vs IC mainnet)
   - Default values and adapter-specific overrides

### Key Design Patterns

- **Manager Pattern**: Separation of concerns with dedicated managers
- **Adapter Pattern**: Uniform interface for different wallet implementations
- **State Machine**: Valid state transitions with error handling
- **Factory Pattern**: Configuration and instantiation helpers
- **Caching Strategy**: Actor caching by wallet+canister+signing requirement

## Type System

### Core Types

```typescript
// Main configuration
GlobalPnpConfig {
  dfxNetwork?: string;
  hostUrl?: string;
  delegationTargets?: string[];
  adapters?: Record<string, AdapterConfig>;
  logLevel?: LogLevel;
  // ... more options
}

// Adapter interface
Adapter.Interface {
  connect(): Promise<Wallet.Account>;
  disconnect(): Promise<void>;
  createActor<T>(): ActorSubclass<T>;
  getPrincipal(): Promise<string>;
  // ... more methods
}

// State management
PnpState: INITIALIZED | CONNECTING | CONNECTED | DISCONNECTING | DISCONNECTED | ERROR
```

## Development Best Practices

### Code Conventions

- TypeScript with strict mode disabled (see tsconfig.json)
- ES2020 target with ESNext modules
- Use absolute imports from `src/`
- Prefer async/await over promises

### Testing Guidelines

- Test files in `tests/` directory
- Mock external dependencies (AuthClient, etc.)
- Test state transitions and error cases
- Aim for >80% coverage on critical paths

### Error Handling

- Use ErrorManager for consistent logging
- Throw meaningful errors with context
- Handle async errors with try/catch
- State transitions to ERROR state on failures

### Performance Considerations

- Actor caching to reduce canister calls
- Lazy initialization of adapters
- Efficient state persistence
- Bundle size optimization with tree-shaking

## Common Tasks

### Adding a New Adapter

1. Create adapter class extending appropriate base class
2. Implement required abstract methods
3. Add to `src/adapters/index.ts` exports
4. Update type definitions if needed
5. Add tests for the new adapter

### Modifying State Management

1. Update `PnpState` enum if adding states
2. Ensure valid transitions in `StateManager`
3. Update persistence logic if needed
4. Test state recovery scenarios

### Debugging Tips

- Enable DEBUG log level for verbose output
- Check browser console for error details
- Use `getState()` to inspect current state
- Verify adapter configuration matches wallet

## Safari Popup Blocking Fix

Safari blocks popups that aren't opened as a direct result of user interaction. To ensure Internet Identity works properly in Safari:

```javascript
// Correct usage - call openChannel() first
button.onclick = async () => {
  await pnp.openChannel(); // Prepares the adapter
  await pnp.connect('ii'); // Opens popup without blocking
};

// Wrong usage - Safari may block the popup
button.onclick = async () => {
  await pnp.connect('ii'); // Async delay may cause blocking
};
```

The `openChannel()` method initializes the AuthClient early, minimizing async operations before the popup opens.

## Build Configuration

### Vite Configuration (`vite.config.mjs`)

- Library mode with ES module output
- Polyfills for Node.js built-ins (Buffer, process)
- External dependencies to reduce bundle size
- Compression plugins for production builds
- TypeScript declarations via `vite-plugin-dts`

### TypeScript Configuration

- Target: ES2020
- Module: ESNext
- Paths configured for clean imports
- Declaration files generated in dist/

## Solana Integration (SIWS)

The library includes experimental support for Solana wallets through Sign-In with Solana (SIWS):

1. Requires deployed IC SIWS Provider canister
2. Set `siwsProviderCanisterId` in config
3. Supports Phantom, Solflare, WalletConnect adapters
4. Uses `@solana/wallet-adapter-*` packages
5. SPL token operations via SplTokenManager

## Environment Variables

While the library doesn't directly use environment variables, it detects the environment through configuration:

- `dfxNetwork`: "local" or "ic" (mainnet)
- `fetchRootKey`: true for local development
- `verifyQuerySignatures`: false for local development
- `hostUrl`: Automatically set based on dfxNetwork
