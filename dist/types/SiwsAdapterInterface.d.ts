export interface SendOptions {
    skipPreflight?: boolean;
    preflightCommitment?: string;
    maxRetries?: number;
    minContextSlot?: number;
}
/**
 * Interface for SIWS Adapter public methods
 */
export interface ISiwsAdapter {
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
    getSolanaAddress(): Promise<string>;
}
