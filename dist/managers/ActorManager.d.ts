import { ActorSubclass } from '@dfinity/agent';
import { AdapterInterface, GetActorOptions } from '../types/AdapterTypes';
import { GlobalPnpConfig } from '../types/index.d';
export declare class ActorManager {
    private config;
    private provider;
    private actorCache;
    constructor(config: GlobalPnpConfig, provider?: AdapterInterface | null);
    setProvider(provider: AdapterInterface | null): void;
    getActor<T>(options: GetActorOptions): ActorSubclass<T>;
    createAnonymousActor<T>(canisterId: string, idl: any): ActorSubclass<T>;
    clearCache(): void;
    /**
     * Get cache statistics for monitoring
     */
    getCacheStats(): {
        size: number;
        maxSize: number;
        hitRate?: number;
    };
    /**
     * Clean up expired cache entries
     */
    cleanupExpiredCache(): number;
}
