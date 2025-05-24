// Example: How to use the SPL token transfer functionality with SiwsAdapter

import { SiwsAdapter } from '../src/adapters/ic/SiwsAdapter';
import { SiwsAdapterConfig } from '../src/types/AdapterConfigs';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

async function exampleUsage() {
  // Initialize the adapter with your configuration
  const config: SiwsAdapterConfig = {
    hostUrl: 'https://ic0.app',
    solanaNetwork: WalletAdapterNetwork.Mainnet,
    siwsProviderCanisterId: 'your-siws-provider-canister-id',
    fetchRootKey: false,
    verifyQuerySignatures: true,
  };

  const adapter = new SiwsAdapter({
    adapter: {
      id: 'phantomSiws',
      walletName: 'Phantom',
      logo: 'phantom-logo.svg',
    },
    config: config,
  });

  try {
    // Connect the wallet
    await adapter.connect();
    
    // Get current balances
    const solBalance = await adapter.getSolBalance();
    console.log('SOL Balance:', solBalance.amount, 'SOL ($', solBalance.usdValue, ')');
    
    const splTokens = await adapter.getSplTokenBalances();
    console.log('SPL Tokens:', splTokens);

    // Example 1: Send SOL
    const recipientAddress = 'GKNcUmNacSJo4S2Kq1DuYRYRGw3sNUfJ4tyqd198t6vQ';
    const solAmount = 0.1; // 0.1 SOL
    
    console.log(`Sending ${solAmount} SOL to ${recipientAddress}...`);
    const solTxSignature = await adapter.sendSol(recipientAddress, solAmount);
    console.log('SOL Transaction signature:', solTxSignature);
    
    // Check transaction status
    const solTxStatus = await adapter.getTransactionStatus(solTxSignature);
    console.log('SOL Transaction confirmed:', solTxStatus.confirmed);

    // Example 2: Send USDC (SPL Token)
    const usdcMint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC on mainnet
    const usdcRecipient = 'GKNcUmNacSJo4S2Kq1DuYRYRGw3sNUfJ4tyqd198t6vQ';
    const usdcAmount = 10; // 10 USDC
    const usdcDecimals = 6; // USDC has 6 decimals
    
    console.log(`Sending ${usdcAmount} USDC to ${usdcRecipient}...`);
    const usdcTxSignature = await adapter.sendSplToken(
      usdcMint,
      usdcRecipient,
      usdcAmount,
      usdcDecimals
    );
    console.log('USDC Transaction signature:', usdcTxSignature);
    
    // Check transaction status
    const usdcTxStatus = await adapter.getTransactionStatus(usdcTxSignature);
    console.log('USDC Transaction confirmed:', usdcTxStatus.confirmed);

    // Example 3: Send any SPL token from the balance list
    const tokenToSend = splTokens.find(token => token.symbol === 'BONK');
    if (tokenToSend && tokenToSend.uiAmount > 0) {
      const sendAmount = Math.min(1000, tokenToSend.uiAmount); // Send 1000 or max available
      
      console.log(`Sending ${sendAmount} ${tokenToSend.symbol} to ${recipientAddress}...`);
      const tokenTxSignature = await adapter.sendSplToken(
        tokenToSend.mint,
        recipientAddress,
        sendAmount,
        tokenToSend.decimals
      );
      console.log(`${tokenToSend.symbol} Transaction signature:`, tokenTxSignature);
    }

    // Example 4: Estimate transaction fee before sending
    const { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } = await import('@solana/web3.js');
    
    // Create a test transaction to estimate fees
    const testTx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(await adapter.getSolanaAddress()),
        toPubkey: new PublicKey(recipientAddress),
        lamports: 0.1 * LAMPORTS_PER_SOL,
      })
    );
    
    const estimatedFee = await adapter.estimateTransactionFee(testTx);
    console.log('Estimated transaction fee:', estimatedFee, 'SOL');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Disconnect when done
    await adapter.disconnect();
  }
}

// Run the example
exampleUsage().catch(console.error); 