# Using Linked PNP Packages in Another Repository

## Step 1: Link the packages globally (already done)
In the w98-pnp directory:
```bash
npm run link:all
# or
./link-all.sh
```

This creates global symlinks for:
- `@windoge98/plug-n-play`
- `@windoge98/pnp-solana`
- `@windoge98/pnp-ethereum`

## Step 2: Link in your other repository

In your other project directory, run:

```bash
# Link the main package
npm link @windoge98/plug-n-play

# Link Solana package (if needed)
npm link @windoge98/pnp-solana

# Link Ethereum package (if needed)
npm link @windoge98/pnp-ethereum
```

## Step 3: Use in your code

Now you can import them like normal packages:

```javascript
// Main package
import { createPNP, PNP } from '@windoge98/plug-n-play';

// Solana adapters
import { SolanaAdapters } from '@windoge98/pnp-solana';

// Ethereum adapters
import { EthereumAdapters } from '@windoge98/pnp-ethereum';

// Register adapters
Object.entries(SolanaAdapters).forEach(([id, config]) => {
    PNP.registerAdapter(id, { ...config, enabled: true });
});

Object.entries(EthereumAdapters).forEach(([id, config]) => {
    PNP.registerAdapter(id, { ...config, enabled: true });
});

// Create PNP instance
const pnp = createPNP({
    dfxNetwork: 'ic',
    siwsProviderCanisterId: 'xkbqi-2qaaa-aaaah-qbpqq-cai',
    siweProviderCanisterId: 'r4zqx-aiaaa-aaaar-qbuia-cai',
    adapters: {
        // IC wallets
        ii: { enabled: true },
        plug: { enabled: true },
        // Solana wallets
        phantomSiws: { enabled: true },
        solflareSiws: { enabled: true },
        // Ethereum wallets
        metamaskSiwe: { enabled: true },
        walletConnectSiwe: { enabled: true }
    }
});
```

## To unlink from your other repository

When you're done with local development:

```bash
npm unlink @windoge98/plug-n-play
npm unlink @windoge98/pnp-solana
npm unlink @windoge98/pnp-ethereum
```

## Troubleshooting

If you get errors about missing packages:
1. Make sure you ran `npm run link:all` in the w98-pnp directory first
2. Check that the packages are linked globally with: `npm ls -g --depth=0 --link=true`
3. Try unlinking and relinking again

## Development Workflow

1. Make changes in w98-pnp
2. Run `npm run build:all` to rebuild all packages
3. Changes will be immediately available in your linked project (no need to re-link)