// Note: These types are moved to @windoge98/pnp-solana package
export interface SendOptions {
  skipPreflight?: boolean;
  preflightCommitment?: string;
  maxRetries?: number;
  minContextSlot?: number;
}

// SPL token balance interface removed - functionality no longer supported

/**
 * Interface for SIWS Adapter public methods
 */
export interface ISiwsAdapter {
  // Balance methods removed - functionality no longer supported
  
  // Solana Transfer Methods
  // Note: SOL transfer functionality has been removed.
  // Use sendSplToken for SPL token transfers only.
  
  // SPL token transfer functionality has been removed.
  
  /**
   * Estimate transaction fee in SOL
   * @param transaction - Transaction to estimate fee for
   * @returns Estimated fee in SOL
   */
  estimateTransactionFee(transaction: any): Promise<number>;
  
  /**
   * Get transaction status
   * @param signature - Transaction signature
   * @returns Transaction status including confirmation state
   */
  getTransactionStatus(signature: string): Promise<{
    confirmed: boolean;
    slot?: number;
    err?: any;
  }>;
  
  // Existing methods
  getSolanaAddress(): Promise<string>;
} 