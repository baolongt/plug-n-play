import { Principal } from '@dfinity/principal';
import { HttpAgent, ActorSubclass } from '@dfinity/agent';
import { SignerAgent } from '@slide-computer/signer-agent';
import { Signer } from '@slide-computer/signer';
import { BaseAdapter, AdapterConstructorArgs } from './BaseAdapter';
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
    private connectionAbortController;
    private windowFocusHandler;
    constructor(args: AdapterConstructorArgs<T>);
    openChannel(): Promise<void>;
    isConnected(): Promise<boolean>;
    getPrincipal(): Promise<string>;
    protected connectWithStoredPrincipal(): Promise<Principal | null>;
    protected connectWithAccounts(): Promise<Principal>;
    connect(): Promise<Wallet.Account>;
    protected createActorInternal<T>(canisterId: string, idlFactory: any, _options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    protected disconnectInternal(): Promise<void>;
    protected cleanupInternal(): void;
    /**
     * Ensure the transport layer is initialized for the signer
     * Subclasses must implement this to set up their specific transport mechanism
     * @throws {Error} If transport initialization fails
     */
    protected abstract ensureTransportInitialized(): Promise<void>;
    /**
     * Dispose of signer-specific resources
     * Cleans up signer, agents, and stored principal
     */
    protected onDispose(): Promise<void>;
}
