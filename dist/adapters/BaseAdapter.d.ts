import { HttpAgent, ActorSubclass, Identity } from '@dfinity/agent';
import { Wallet, Adapter } from '../types/index.d';
import { AdapterSpecificConfig } from '../types/AdapterConfigs';
import { ErrorManager } from '../managers/ErrorManager';
/**
 * Type-safe constructor arguments for adapters
 */
export interface AdapterConstructorArgs<T extends AdapterSpecificConfig = AdapterSpecificConfig> {
    adapter: Adapter.Config;
    config: T;
    logger?: ErrorManager;
}
/**
 * Interface for disposable resources
 */
export interface Disposable {
    dispose(): Promise<void>;
}
/**
 * Abstract base class for adapters implementing Adapter.Interface
 */
export declare abstract class BaseAdapter<T extends AdapterSpecificConfig = AdapterSpecificConfig> implements Adapter.Interface, Disposable {
    static supportedChains: Adapter.Chain[];
    protected state: Adapter.Status;
    protected config: T;
    protected adapter: Adapter.Config;
    protected actorCache: Map<string, ActorSubclass<any>>;
    protected logger: ErrorManager;
    private disposed;
    constructor(args: AdapterConstructorArgs<T>);
    /**
     * Validate adapter configuration
     * Override this method to implement adapter-specific validation
     * @param config - The configuration to validate
     * @throws {Error} If configuration is invalid
     */
    protected validateConfig(config: T): void;
    protected setState(newState: Adapter.Status): void;
    openChannel(): Promise<void>;
    getState(): Adapter.Status;
    getAccountId(): Promise<string>;
    /**
     * Check if the adapter is currently connected to a wallet
     * @returns Promise resolving to true if connected, false otherwise
     */
    abstract isConnected(): Promise<boolean>;
    /**
     * Connect to the wallet and authenticate the user
     * @returns Promise resolving to the connected wallet account
     * @throws {Error} If connection fails or user rejects authentication
     */
    abstract connect(): Promise<Wallet.Account>;
    /**
     * Get the principal of the currently connected wallet
     * @returns Promise resolving to the principal as a string
     * @throws {Error} If not connected or principal unavailable
     */
    abstract getPrincipal(): Promise<string>;
    getAddresses(): Promise<Adapter.Addresses>;
    createActor<T>(canisterId: string, idl: any, options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    /**
     * Create an actor instance for interacting with a canister (adapter-specific implementation)
     * @param canisterId - The canister ID to create an actor for
     * @param idl - The IDL factory for the canister interface
     * @param options - Optional configuration for actor creation
     * @returns Actor instance for the specified canister
     * @throws {Error} If actor creation fails or adapter not connected
     */
    protected abstract createActorInternal<T>(canisterId: string, idl: any, options?: {
        requiresSigning?: boolean;
    }): ActorSubclass<T>;
    /**
     * Standardized error handling method for consistent logging across all adapters
     */
    protected handleError(context: string, error: unknown): void;
    disconnect(): Promise<void>;
    /**
     * Perform adapter-specific disconnect logic
     * Override this method to implement custom disconnect behavior
     * Default implementation clears the actor cache
     */
    protected disconnectInternal(): Promise<void>;
    /**
     * Perform adapter-specific resource cleanup
     * Override this method to clean up resources after disconnect
     * Called after disconnectInternal() in the finally block
     */
    protected cleanupInternal(): void;
    /**
     * Dispose of all resources and clean up the adapter
     * This method ensures proper cleanup and prevents memory leaks
     */
    dispose(): Promise<void>;
    /**
     * Hook for subclasses to perform additional disposal logic
     * Override this method to clean up adapter-specific resources
     */
    protected onDispose(): Promise<void>;
    protected buildHttpAgent(options?: {
        identity?: Identity;
    }): Promise<HttpAgent>;
    protected createActorWithAgent<T>(agent: HttpAgent, canisterId: string, idl: any): ActorSubclass<T>;
    protected buildHttpAgentSync(options?: {
        identity?: Identity;
    }): HttpAgent;
}
