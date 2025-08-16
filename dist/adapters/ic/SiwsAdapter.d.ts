import { Adapter, Wallet } from '../../types/index.d';
import { ActorSubclass } from '@dfinity/agent';
import { Transaction, SendOptions } from '@solana/web3.js';
import { Ed25519KeyIdentity, DelegationChain } from '@dfinity/identity';
import { BaseDelegationAdapter } from '../BaseDelegationAdapter';
import { SiwsAdapterConfig } from '../../types/AdapterConfigs';
import { SplTokenBalance } from '../../managers/SplTokenManager';
export declare class SiwsAdapter extends BaseDelegationAdapter<SiwsAdapterConfig> {
    walletName: string;
    logo: string;
    readonly id: string;
    static supportedChains: Adapter.Chain[];
    private solanaAdapter;
    private solanaConnection;
    private solanaAddress;
    private tokenManager;
    constructor(args: Adapter.ConstructorArgs & {
        config: SiwsAdapterConfig;
    });
    private initializeConnection;
    private initializeSolanaAdapter;
    private ensureSolanaAdapter;
    private ensureConnected;
    private buildTransaction;
    protected onStorageRestored(sessionKey: Ed25519KeyIdentity, delegationChain: DelegationChain): Promise<void>;
    protected onClearStoredSession(): Promise<void>;
    private createSolanaAdapter;
    private setupWalletListeners;
    private removeWalletListeners;
    private handleSolanaConnect;
    private handleSolanaDisconnect;
    private handleSolanaError;
    isConnected(): Promise<boolean>;
    connect(): Promise<Wallet.Account>;
    protected disconnectInternal(): Promise<void>;
    getPrincipal(): Promise<string>;
    getAccountId(): Promise<string>;
    getSolanaAddress(): Promise<string>;
    getAddresses(): Promise<Adapter.Addresses>;
    protected createActorInternal<T>(canisterId: string, idl: any, options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    getSolBalance(): Promise<{
        amount: number;
        usdValue?: number;
    }>;
    getSplTokenBalances(): Promise<SplTokenBalance[]>;
    private createSiwsProviderActor;
    private signSiwsMessage;
    private createDelegationIdentity;
    private performSiwsLogin;
    private prepareAndSignMessage;
    sendSol(toAddress: string, amountInSol: number, options?: SendOptions): Promise<string>;
    sendSplToken(mintAddress: string, toAddress: string, amount: number, decimals: number, options?: SendOptions): Promise<string>;
    estimateTransactionFee(transaction: Transaction): Promise<number>;
    getTransactionStatus(signature: string): Promise<{
        confirmed: boolean;
        slot?: number;
        err?: any;
    }>;
}
