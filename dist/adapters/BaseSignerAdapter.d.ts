import { Principal } from '@dfinity/principal';
import { HttpAgent, ActorSubclass } from '@dfinity/agent';
import { SignerAgent } from '@slide-computer/signer-agent';
import { Signer } from '@slide-computer/signer';
import { BaseAdapter } from './BaseAdapter';
import { AdapterSpecificConfig } from '../types/AdapterConfigs';
import { Wallet } from '../types/index.d';
/**
 * Base class for adapters that use the Signer/SignerAgent pattern
 */
export declare abstract class BaseSignerAdapter<T extends AdapterSpecificConfig = AdapterSpecificConfig> extends BaseAdapter<T> {
    protected signer: Signer | null;
    protected agent: HttpAgent | SignerAgent<any> | null;
    protected signerAgent: SignerAgent<Signer> | null;
    protected transport: any;
    protected principalStorageKey: string;
    constructor(args: any);
    openChannel(): Promise<void>;
    isConnected(): Promise<boolean>;
    getPrincipal(): Promise<string>;
    protected connectWithStoredPrincipal(): Promise<Principal | null>;
    protected connectWithAccounts(): Promise<Principal>;
    connect(): Promise<Wallet.Account>;
    protected createActorInternal<T>(canisterId: string, idlFactory: any, options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    protected disconnectInternal(): Promise<void>;
    protected cleanupInternal(): void;
    protected abstract ensureTransportInitialized(): Promise<void>;
}
