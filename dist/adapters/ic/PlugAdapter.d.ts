import { ActorSubclass } from '@dfinity/agent';
import { Adapter, Wallet } from '../../types/index.d';
import { BaseAdapter } from '../BaseAdapter';
import { PlugAdapterConfig } from '../../types/AdapterConfigs';
export declare class PlugAdapter extends BaseAdapter<PlugAdapterConfig> implements Adapter.Interface {
    private static readonly PLUG_PRINCIPAL_KEY;
    private signer;
    private agent;
    private signerAgent;
    private transport;
    constructor(args: Adapter.ConstructorArgs);
    private initializeTransport;
    openChannel(): Promise<void>;
    connect(): Promise<Wallet.Account>;
    getPrincipal(): Promise<string>;
    protected createActorInternal<T>(canisterId: string, idlFactory: any, options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    isConnected(): Promise<boolean>;
    protected disconnectInternal(): Promise<void>;
    protected cleanupInternal(): void;
}
