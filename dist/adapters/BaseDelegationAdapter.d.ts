import { Ed25519KeyIdentity, DelegationIdentity, DelegationChain } from '@dfinity/identity';
import { BaseAdapter } from './BaseAdapter';
import { AdapterSpecificConfig } from '../types/AdapterConfigs';
import { IdbStorage } from '@slide-computer/signer-storage';
/**
 * Base class for adapters that use delegation-based authentication with storage
 */
export declare abstract class BaseDelegationAdapter<T extends AdapterSpecificConfig = AdapterSpecificConfig> extends BaseAdapter<T> {
    protected storage: IdbStorage;
    protected sessionKey: Ed25519KeyIdentity | null;
    protected identity: DelegationIdentity | null;
    constructor(args: any);
    protected initializeStorageRestore(): void;
    protected restoreFromStorage(): Promise<void>;
    protected clearStoredSession(): Promise<void>;
    protected storeSession(sessionKey: Ed25519KeyIdentity, delegationChain: DelegationChain): Promise<void>;
    protected abstract onStorageRestored(sessionKey: Ed25519KeyIdentity, delegationChain: DelegationChain): Promise<void>;
    protected abstract onClearStoredSession(): Promise<void>;
}
