import { ActorSubclass } from '@dfinity/agent';
import { Wallet, Adapter } from '../../types/index.d';
import { BaseAdapter } from '../BaseAdapter';
import { IIAdapterConfig } from '../../types/AdapterConfigs';
export declare class IIAdapter extends BaseAdapter<IIAdapterConfig> implements Adapter.Interface {
    private authClient;
    private agent;
    constructor(args: {
        adapter: any;
        config: IIAdapterConfig;
    } | IIAdapterConfig);
    private initializeAuthClientSync;
    private ensureAuthClient;
    openChannel(): Promise<void>;
    private initAgent;
    connect(): Promise<Wallet.Account>;
    private performLogin;
    private createAccountFromIdentity;
    isConnected(): Promise<boolean>;
    protected createActorInternal<T>(canisterId: string, idl: any, _options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    getPrincipal(): Promise<string>;
    private refreshLogin;
    protected disconnectInternal(): Promise<void>;
    protected cleanupInternal(): void;
    /**
     * Dispose of II-specific resources
     * Ensures AuthClient and agent are properly cleaned up
     */
    protected onDispose(): Promise<void>;
}
