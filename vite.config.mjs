import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";
import viteCompression from "vite-plugin-compression";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import inject from "@rollup/plugin-inject";

// Determine build environment and package
const isProd = process.env.NODE_ENV === "production";
const buildPackage = process.env.BUILD_PACKAGE || "main"; // 'main', 'solana', 'metamask', 'rabby', or 'ethereum'
const needsNodePolyfills = buildPackage === 'solana' || buildPackage === 'ethereum';

// Package-specific configurations
const packageConfigs = {
  main: {
    entry: resolve(__dirname, "src/index.ts"),
    name: "PlugNPlay",
    fileName: (format) => `plug-n-play.${format}.js`,
    outDir: "dist",
    external: [
      // Keep large optional dependencies external
      "@walletconnect/ethereum-provider",
      "ethers",
      "ic-siwe-js",
      "viem",
      // Bundle everything else to avoid ESM/CJS issues
      // This includes @dfinity/* and @slide-computer/* packages
    ],
    formats: ["es"],
    dtsOptions: {
      insertTypesEntry: true,
      compilerOptions: {
        declaration: true,
        skipLibCheck: true,
      },
      logDiagnostics: isProd,
      skipDiagnostics: !isProd,
    },
    copyAssets: true,
  },
  solana: {
    entry: resolve(__dirname, "packages/solana/src/index.ts"),
    name: "PNPSolana",
    fileName: (format) => format === 'es' ? 'index.es.js' : 'index.js',
    outDir: "packages/solana/dist",
    external: [
      "@dfinity/agent",
      "@dfinity/identity",
      "@dfinity/principal",
      "@windoge98/plug-n-play",
      /^@windoge98\/plug-n-play/,
    ],
    formats: ["es", "cjs"],
    dtsOptions: {
      insertTypesEntry: true,
      rollupTypes: true,
      outDir: "packages/solana/dist",
      include: ["packages/solana/src/**/*", "packages/solana/src/assets.d.ts"],
      exclude: ["**/*.test.ts", "**/*.spec.ts"],
      tsConfigFilePath: "./packages/solana/tsconfig.json",
    },
    copyAssets: false,
    assetsInlineLimit: 100000, // Inline images for Solana package
    // Enable code splitting for large dependencies
    manualChunks: {
      'solana-web3': ['@solana/web3.js'],
      'solana-adapters': [
        '@solana/wallet-adapter-base',
        '@solana/wallet-adapter-phantom',
        '@solana/wallet-adapter-solflare',
      ],
    },
  },
  ethereum: {
    entry: resolve(__dirname, "packages/ethereum/src/index.ts"),
    name: "PNPEthereum",
    fileName: (format) => format === 'es' ? 'index.es.js' : 'index.js',
    outDir: "packages/ethereum/dist",
    external: [
      "@dfinity/agent",
      "@dfinity/identity",
      "@dfinity/principal",
      "@walletconnect/ethereum-provider",
      "ethers",
      "ic-siwe-js",
      "viem",
      "@windoge98/plug-n-play",
      /^@windoge98\/plug-n-play/,
    ],
    formats: ["es", "cjs"],
    dtsOptions: {
      insertTypesEntry: true,
      rollupTypes: true,
      outDir: "packages/ethereum/dist",
      include: ["packages/ethereum/src/**/*", "packages/ethereum/src/assets.d.ts"],
      exclude: ["**/*.test.ts", "**/*.spec.ts"],
      tsConfigFilePath: "./packages/ethereum/tsconfig.json",
    },
    copyAssets: false,
    assetsInlineLimit: 100000, // Inline images for Ethereum package
  },
};

const currentConfig = packageConfigs[buildPackage];

export default defineConfig({
  // Include assets for Solana and Ethereum packages
  ...((buildPackage === 'solana' || buildPackage === 'ethereum') && {
    assetsInclude: ['**/*.webp', '**/*.svg', '**/*.png', '**/*.jpg'],
  }),
  
  build: {
    minify: isProd ? 'terser' : false,
    lib: {
      entry: currentConfig.entry,
      name: currentConfig.name,
      formats: currentConfig.formats,
      fileName: currentConfig.fileName,
    },
    rollupOptions: {
      external: currentConfig.external,
      onwarn(warning, warn) {
        // Suppress "this" keyword warnings from @slide-computer libraries
        if (warning.code === 'THIS_IS_UNDEFINED') {
          return;
        }
        // Suppress circular dependency warnings from known libraries
        if (warning.code === 'CIRCULAR_DEPENDENCY' && (
          warning.message.includes('@slide-computer') ||
          warning.message.includes('viem') ||
          warning.message.includes('ox')
        )) {
          return;
        }
        // Suppress unused export warnings
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
          return;
        }
        warn(warning);
      },
      output: {
        format: currentConfig.formats[0],
        exports: "named",
        globals: {
          ...(buildPackage === 'solana' && {
            '@dfinity/agent': 'DfinityAgent',
            '@dfinity/identity': 'DfinityIdentity',
            '@dfinity/principal': 'DfinityPrincipal',
            '@solana/web3.js': 'SolanaWeb3',
            '@windoge98/plug-n-play': 'PNP',
            'bs58': 'bs58',
          }),
          ...(buildPackage === 'ethereum' && {
            '@dfinity/agent': 'DfinityAgent',
            '@dfinity/identity': 'DfinityIdentity',
            '@dfinity/principal': 'DfinityPrincipal',
            '@walletconnect/ethereum-provider': 'WalletConnectEthereumProvider',
            'ethers': 'ethers',
            'viem': 'viem',
            '@windoge98/plug-n-play': 'PNP',
          }),
          ...(needsNodePolyfills && {
            // Provide globals for polyfills only when needed
            'buffer': 'buffer',
            'process': 'process',
          }),
        },
        ...(currentConfig.manualChunks && {
          manualChunks: currentConfig.manualChunks,
        }),
      },
      plugins: [
        ...(needsNodePolyfills ? [
          inject({
            Buffer: ["buffer", "Buffer"],
            process: ["process", "process"],
            ...(buildPackage === 'solana' && {
              global: "globalThis",
            }),
          })
        ] : []),
      ],
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
      esmExternals: ['@dfinity/identity'],
      requireReturnsDefault: 'auto',
    },
    outDir: currentConfig.outDir,
    emptyOutDir: true,
    reportCompressedSize: isProd,
    chunkSizeWarningLimit: 1000,
    target: "es2020",
    ...(currentConfig.assetsInlineLimit && {
      assetsInlineLimit: currentConfig.assetsInlineLimit,
    }),
  },
  
  test: {
    globals: true,
    environment: "jsdom",
  },
  
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    global: "globalThis",
    // Polyfill 'self' for SSR compatibility
    self: "globalThis",
    ...(buildPackage === 'solana' && {
      'global.Buffer': 'Buffer',
      'globalThis.Buffer': 'Buffer',
      'window.Buffer': 'Buffer',
    }),
  },
  
  resolve: {
    alias: {
      "@": resolve(__dirname, buildPackage === 'main' ? "./src" : `./packages/${buildPackage}/src`),
      "@types": resolve(__dirname, buildPackage === 'main' ? "src/types" : `packages/${buildPackage}/src/types`),
      "@src": resolve(__dirname, buildPackage === 'main' ? "src" : `packages/${buildPackage}/src`),
      ...(needsNodePolyfills ? {
        buffer: "buffer/",
        process: "process/browser",
        stream: "stream-browserify",
        util: "util/",
      } : {}),
      // Fix for @dfinity/identity ESM imports - add .js extensions
      "@dfinity/identity/lib/cjs/identity/partial": "@dfinity/identity/lib/cjs/identity/partial.js",
      "@dfinity/identity/lib/esm/identity/partial": "@dfinity/identity/lib/esm/identity/partial.js",
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
      format: "esm",
      mainFields: ["module", "main"],
      conditions: ["module", "import", "default"],
      define: {
        global: "globalThis",
      },
      plugins: [
        ...(needsNodePolyfills ? [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true,
          }),
          NodeModulesPolyfillPlugin(),
        ] : []),
      ],
    },
    include: [
      // Pre-bundle problematic dependencies
      "@dfinity/agent",
      "@dfinity/identity", 
      "@dfinity/candid",
      "@dfinity/principal",
      "@dfinity/auth-client",
      "@dfinity/utils",
      "borc",
      "bignumber.js",
      ...(needsNodePolyfills ? [
        "buffer",
        "process/browser",
      ] : []),
    ],
  },
  
  plugins: [
    // TypeScript declarations plugin
    dts(currentConfig.dtsOptions),
    
    // Static asset copying (only for main package)
    ...(currentConfig.copyAssets ? [
      viteStaticCopy({
        targets: [
          {
            src: "assets/*",
            dest: "assets",
          },
        ],
      }),
    ] : []),
    
    // Compression plugins for production
    ...(isProd ? [
      viteCompression({
        verbose: false,
        disable: false,
        threshold: 5024 * 10,
        algorithm: "gzip",
        ext: ".gz",
      }),
      viteCompression({
        verbose: false,
        disable: false,
        threshold: 5024 * 10,
        algorithm: "brotliCompress",
        ext: ".br",
      }),
    ] : []),
  ],
  
  // Dev server configuration
  server: {
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: false,
    },
  },
});