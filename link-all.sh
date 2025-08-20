#!/bin/bash

# Script to link all PNP packages for local development

echo "🔗 Linking PNP packages..."

# Link main package
echo "📦 Linking @windoge98/plug-n-play..."
npm link

# Link Solana package
echo "📦 Linking @windoge98/pnp-solana..."
cd packages/solana && npm link && cd ../..

# Link Ethereum package
echo "📦 Linking @windoge98/pnp-ethereum..."
cd packages/ethereum && npm link && cd ../..

echo "✅ All packages linked successfully!"
echo ""
echo "To use these packages in another project, run:"
echo "  npm link @windoge98/plug-n-play"
echo "  npm link @windoge98/pnp-solana"
echo "  npm link @windoge98/pnp-ethereum"