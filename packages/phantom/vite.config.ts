import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PnpPhantom',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        '@windoge98/plug-n-play',
        '@windoge98/pnp-solana',
        '@dfinity/agent',
        '@dfinity/identity',
        '@dfinity/principal',
        '@solana/web3.js',
        '@solana/wallet-adapter-base',
        '@solana/wallet-adapter-phantom',
        'bs58',
        'buffer'
      ],
      output: {
        globals: {
          '@windoge98/plug-n-play': 'PlugNPlay',
          '@windoge98/pnp-solana': 'PnpSolana',
          '@dfinity/agent': 'Agent',
          '@dfinity/identity': 'Identity',
          '@dfinity/principal': 'Principal',
          '@solana/web3.js': 'SolanaWeb3',
          '@solana/wallet-adapter-base': 'WalletAdapterBase',
          '@solana/wallet-adapter-phantom': 'PhantomWalletAdapter',
          'bs58': 'bs58',
          'buffer': 'Buffer'
        },
        // Ensure assets are inlined
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'phantom.webp') {
            return 'assets/[name][extname]';
          }
          return '[name][extname]';
        }
      }
    },
    minify: false,
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});