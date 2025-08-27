import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'PnpRabby',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'es' : ''}.js`
    },
    rollupOptions: {
      external: [
        '@windoge98/plug-n-play',
        '@dfinity/agent',
        '@dfinity/identity',
        '@dfinity/principal',
        '@dfinity/candid',
        '@dfinity/auth-client'
      ],
      output: {
        globals: {
          '@windoge98/plug-n-play': 'PlugNPlay',
          '@dfinity/agent': 'DfinityAgent',
          '@dfinity/identity': 'DfinityIdentity',
          '@dfinity/principal': 'DfinityPrincipal'
        }
      }
    },
    sourcemap: true,
    minify: false
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});