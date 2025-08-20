import { Ed25519KeyIdentity, DelegationIdentity, DelegationChain } from '@dfinity/identity';
import { BaseAdapter, AdapterConstructorArgs } from './BaseAdapter';
import { AdapterSpecificConfig } from '../types/AdapterConfigs';
import { IdbStorage } from '@slide-computer/signer-storage';
/**
 * Base class for adapters that use delegation-based authentication with storage
 */
export declare abstract class BaseDelegationAdapter<T extends AdapterSpecificConfig = AdapterSpecificConfig> extends BaseAdapter<T> {
    protected storage: IdbStorage;
    protected sessionKey: Ed25519KeyIdentity | null;
    protected identity: DelegationIdentity | null;
    constructor(args: AdapterConstructorArgs<T>);
    protected initializeStorageRestore(): void;
    protected restoreFromStorage(): Promise<void>;
    protected clearStoredSession(): Promise<void>;
    protected storeSession(sessionKey: Ed25519KeyIdentity, delegationChain: DelegationChain): Promise<void>;
    /**
     * Hook for subclasses to perform additional logic after restoring from storage
     * @param sessionKey - The restored session key
     * @param delegationChain - The restored delegation chain
     */
    protected abstract onStorageRestored(sessionKey: Ed25519KeyIdentity, delegationChain: DelegationChain): Promise<void>;
    /**
     * Hook for subclasses to perform additional cleanup when clearing stored session
     * Called after the base storage cleanup is complete
     */
    protected abstract onClearStoredSession(): Promise<void>;
    protected disconnectInternal(): Promise<void>;
    /**
     * Dispose of delegation-specific resources
     * Cleans up storage and identity
     */
    protected onDispose(): Promise<void>;
}
