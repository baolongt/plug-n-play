import { ActorSubclass } from '@dfinity/agent';
import { Ed25519KeyIdentity, DelegationChain } from '@dfinity/identity';
import { Wallet, Adapter } from '../../types/index.d';
import { BaseDelegationAdapter } from '../BaseDelegationAdapter';
import { NFIDAdapterConfig } from '../../types/AdapterConfigs';
export declare class NFIDAdapter extends BaseDelegationAdapter<NFIDAdapterConfig> {
    private agent;
    private signerAgent;
    private signer;
    private transport;
    constructor(args: Adapter.ConstructorArgs);
    protected onStorageRestored(sessionKey: Ed25519KeyIdentity, delegationChain: DelegationChain): Promise<void>;
    protected onClearStoredSession(): Promise<void>;
    openChannel(): Promise<void>;
    isConnected(): Promise<boolean>;
    getPrincipal(): Promise<string>;
    unwrapResponse: <T extends any>(response: any) => T;
    connect(): Promise<Wallet.Account>;
    undelegatedActor<T>(canisterId: string, idlFactory: any): ActorSubclass<T>;
    protected createActorInternal<T>(canisterId: string, idlFactory: any, options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    protected disconnectInternal(): Promise<void>;
    protected cleanupInternal(): void;
}
