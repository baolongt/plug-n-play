// Type declarations for @solana/wallet-adapter-coinbase
// This is a temporary fix until the actual package can be installed

declare module '@solana/wallet-adapter-coinbase' {
  import { EventEmitter } from 'events';
  import { PublicKey, Transaction } from '@solana/web3.js';
  import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';

  export class CoinbaseWalletAdapter extends EventEmitter {
    name: WalletName;
    url: string;
    icon: string;
    readyState: WalletReadyState;
    publicKey: PublicKey | null;
    connecting: boolean;
    connected: boolean;

    constructor();
    
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
  }
}