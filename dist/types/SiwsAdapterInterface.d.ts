import { SendOptions } from '@solana/web3.js';
import { SplTokenBalance } from '../managers/SplTokenManager';
/**
 * Interface for SIWS Adapter public methods
 */
export interface ISiwsAdapter {
    getSolBalance(): Promise<{
        amount: number;
        usdValue?: number;
    }>;
    getSplTokenBalances(): Promise<SplTokenBalance[]>;
    /**
     * Send SOL to another address
     * @param toAddress - Recipient's Solana address
     * @param amountInSol - Amount of SOL to send
     * @param options - Optional send options (e.g., skipPreflight)
     * @returns Transaction signature
     */
    sendSol(toAddress: string, amountInSol: number, options?: SendOptions): Promise<string>;
    /**
     * Send SPL tokens to another address
     * @param mintAddress - Token mint address
     * @param toAddress - Recipient's Solana address
     * @param amount - Amount of tokens to send (in human-readable format)
     * @param decimals - Token decimals
     * @param options - Optional send options
     * @returns Transaction signature
     */
    sendSplToken(mintAddress: string, toAddress: string, amount: number, decimals: number, options?: SendOptions): Promise<string>;
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
