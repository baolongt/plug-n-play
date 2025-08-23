#!/bin/bash

# Script to link all PNP packages for local development

echo "🔗 Linking PNP packages..."
echo ""

# Link main package
echo "📦 Linking main package..."
echo "   @windoge98/plug-n-play"
npm link

# Link blockchain-specific packages
echo ""
echo "🌐 Linking blockchain packages..."
echo "   @windoge98/pnp-ethereum"
cd packages/ethereum && npm link && cd ../..

# Link individual wallet packages
echo ""
echo "💼 Linking wallet packages..."
echo "   @windoge98/pnp-metamask"
cd packages/metamask && npm link && cd ../..
echo "   @windoge98/pnp-okx"
cd packages/okx && npm link && cd ../..
echo "   @windoge98/pnp-phantom"
cd packages/phantom && npm link && cd ../..
echo "   @windoge98/pnp-solflare"
cd packages/solflare && npm link && cd ../..
echo "   @windoge98/pnp-walletconnect"
cd packages/walletconnect && npm link && cd ../..
echo "   @windoge98/pnp-coinbase"
cd packages/coinbase && npm link && cd ../..

# Add more wallet packages as they're created
# echo "   @windoge98/pnp-metamask-multi"
# cd packages/metamask-multi && npm link && cd ../..


echo ""
echo "✅ All packages linked successfully!"
echo ""
echo "To use these packages in another project, run:"
echo ""
echo "  Core package:"
echo "    npm link @windoge98/plug-n-play"
echo ""
echo "  Blockchain packages:"
echo "    npm link @windoge98/pnp-ethereum"
echo ""
echo "  Wallet packages:"
echo "    npm link @windoge98/pnp-metamask"
echo "    npm link @windoge98/pnp-okx"
echo "    npm link @windoge98/pnp-phantom"
echo "    npm link @windoge98/pnp-solflare"
echo "    npm link @windoge98/pnp-walletconnect"
echo "    npm link @windoge98/pnp-coinbase"