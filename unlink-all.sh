#!/bin/bash

# Script to unlink all PNP packages

echo "🔗 Unlinking PNP packages..."
echo ""

# Unlink main package
echo "📦 Unlinking main package..."
echo "   @windoge98/plug-n-play"
npm unlink

# Unlink blockchain-specific packages
echo ""
echo "🌐 Unlinking blockchain packages..."
echo "   @windoge98/pnp-ethereum"
cd packages/ethereum && npm unlink && cd ../..

# Unlink individual wallet packages
echo ""
echo "💼 Unlinking wallet packages..."
echo "   @windoge98/pnp-metamask"
cd packages/metamask && npm unlink && cd ../..
echo "   @windoge98/pnp-okx"
cd packages/okx && npm unlink && cd ../..
echo "   @windoge98/pnp-phantom"
cd packages/phantom && npm unlink && cd ../..
echo "   @windoge98/pnp-solflare"
cd packages/solflare && npm unlink && cd ../..
echo "   @windoge98/pnp-walletconnect"
cd packages/walletconnect && npm unlink && cd ../..
echo "   @windoge98/pnp-coinbase"
cd packages/coinbase && npm unlink && cd ../..

# Add more wallet packages as they're created
# echo "   @windoge98/pnp-phantom-multi"
# cd packages/phantom-multi && npm unlink && cd ../..
# echo "   @windoge98/pnp-metamask-multi"
# cd packages/metamask-multi && npm unlink && cd ../..


echo ""
echo "✅ All packages unlinked successfully!"