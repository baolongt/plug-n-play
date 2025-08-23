import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PNPMetaMask',
      fileName: (format) => format === 'es' ? 'index.es.js' : 'index.js',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        '@dfinity/agent',
        '@dfinity/identity', 
        '@dfinity/principal',
        '@windoge98/plug-n-play',
        /^@windoge98\//,
        'ic-siwe-js',
        'viem',
        'viem/chains'
      ],
      output: {
        globals: {
          '@dfinity/agent': 'DfinityAgent',
          '@dfinity/identity': 'DfinityIdentity',
          '@dfinity/principal': 'DfinityPrincipal',
          '@windoge98/plug-n-play': 'PNP',
          'ic-siwe-js': 'IcSiweJs',
          'viem': 'viem'
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
    target: 'es2020',
    assetsInlineLimit: 100000 // Inline MetaMask logo
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});