import { AdapterConfig, AdapterInterface, AdapterStatus } from '../types/AdapterTypes';
import { WalletAccount } from '../types/WalletTypes';
import { GlobalPnpConfig } from '../types/index.d';
import { ErrorManager } from './ErrorManager';
export declare class ConnectionManager {
    config: GlobalPnpConfig;
    adapter: AdapterConfig | null;
    provider: AdapterInterface | null;
    account: WalletAccount | null;
    status: AdapterStatus;
    private logger;
    private onConnectedCallback?;
    private onDisconnectedCallback?;
    constructor(config: GlobalPnpConfig, logger?: ErrorManager);
    setOnConnected(callback: () => Promise<void>): void;
    setOnDisconnected(callback: () => Promise<void>): void;
    private _resetState;
    openChannel(): Promise<void>;
    connect(walletId?: string): Promise<WalletAccount | null>;
    disconnect(): Promise<void>;
    isAuthenticated(): boolean;
}
