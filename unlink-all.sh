#!/bin/bash

# Script to unlink all PNP packages

echo "🔗 Unlinking PNP packages..."

# Unlink main package
echo "📦 Unlinking @windoge98/plug-n-play..."
npm unlink

# Unlink Solana package
echo "📦 Unlinking @windoge98/pnp-solana..."
cd packages/solana && npm unlink && cd ../..

# Unlink Ethereum package
echo "📦 Unlinking @windoge98/pnp-ethereum..."
cd packages/ethereum && npm unlink && cd ../..

echo "✅ All packages unlinked successfully!"