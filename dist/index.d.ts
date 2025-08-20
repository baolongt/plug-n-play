import { ActorSubclass } from '@dfinity/agent';
import { Adapter, GlobalPnpConfig } from './types/index.d';
import { AdapterConfig, GetActorOptions } from './types/AdapterTypes';
import { WalletAccount } from './types/WalletTypes';
import { createPNPConfig, CreatePnpArgs } from './config';
import { PnpState, StateResponse, StateTransition } from './managers/StateManager';
export { createPNPConfig, PnpState };
export type { GlobalPnpConfig, StateResponse, StateTransition };
export type { ActorSubclass, Adapter, GetActorOptions };
export interface PnpInterface {
    config: GlobalPnpConfig;
    adapter: AdapterConfig | null;
    provider: any;
    account: WalletAccount | null;
    status: any;
    connect: (walletId?: string) => Promise<WalletAccount | null>;
    disconnect: () => Promise<void>;
    getActor: <T>(options: any) => ActorSubclass<T>;
    getIcrcActor: <T>(canisterId: string, options?: {
        anon?: boolean;
        requiresSigning?: boolean;
    }) => ActorSubclass<T>;
    isAuthenticated: () => boolean;
    getEnabledWallets: () => AdapterConfig[];
}
export declare class PNP implements PnpInterface {
    private configManager;
    private connectionManager;
    private actorManager;
    private errorManager;
    private stateManager;
    private static adapterRegistry;
    /**
     * Register a new adapter globally. Call before PNP instantiation to make available to all instances.
     * @param id Adapter id (unique key)
     * @param config AdapterConfig
     */
    static registerAdapter(id: string, config: AdapterConfig): void;
    /**
     * Unregister an adapter by id.
     * @param id Adapter id
     */
    static unregisterAdapter(id: string): void;
    /**
     * Get all registered adapters.
     */
    static getRegisteredAdapters(): Record<string, AdapterConfig>;
    constructor(config?: GlobalPnpConfig);
    openChannel(): Promise<void>;
    get config(): GlobalPnpConfig;
    get adapter(): AdapterConfig;
    get provider(): import('./types/AdapterTypes').AdapterInterface;
    get account(): WalletAccount;
    get status(): import('./types/AdapterTypes').AdapterStatus;
    connect(walletId?: string): Promise<WalletAccount>;
    disconnect(): Promise<void>;
    getActor<T>(options: GetActorOptions): ActorSubclass<T>;
    getIcrcActor<T>(canisterId: string, options?: {
        anon?: boolean;
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    isAuthenticated(): boolean;
    getEnabledWallets(): AdapterConfig[];
    /**
     * Get performance metrics and cache statistics
     */
    getPerformanceStats(): {
        cache: {
            size: number;
            maxSize: number;
            hitRate?: number;
        };
        performance: import('./utils/PerformanceMonitor').PerformanceMetrics;
        timings: Record<string, {
            count: number;
            average: number;
            p50: number;
            p95: number;
            p99: number;
            successRate: number;
        }>;
    };
}
export declare const createPNP: (config?: CreatePnpArgs) => PNP;
export { ConfigBuilder } from './config';
export type { CreatePnpArgs };
export { createAdapterExtension, type AdapterExtension, type ExtractAdapterIds } from './types/AdapterExtensions';
