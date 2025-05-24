import { AdapterConfig, AdapterInterface, AdapterStatus } from '../types/AdapterTypes';
import { WalletAccount } from '../types/WalletTypes';
import { GlobalPnpConfig } from '../types/index.d';
import { ErrorManager } from './ErrorManager';

export class ConnectionManager {
  config: GlobalPnpConfig;
  adapter: AdapterConfig | null = null;
  provider: AdapterInterface | null = null;
  account: WalletAccount | null = null;
  status: AdapterStatus = AdapterStatus.INIT;
  private logger: ErrorManager;
  private onConnectedCallback?: () => Promise<void>;
  private onDisconnectedCallback?: () => Promise<void>;

  constructor(config: GlobalPnpConfig, logger?: ErrorManager) {
    this.config = config;
    this.status = AdapterStatus.READY;
    this.logger = logger || new ErrorManager();
  }

  setOnConnected(callback: () => Promise<void>): void {
    this.onConnectedCallback = callback;
  }

  setOnDisconnected(callback: () => Promise<void>): void {
    this.onDisconnectedCallback = callback;
  }

  private _resetState(): void {
    this.account = null;
    this.provider = null;
    this.adapter = null;
    this.status = AdapterStatus.READY;
  }

  async openChannel(): Promise<void> {
    if (this.provider) {
      await this.provider.openChannel();
    }
  }

  async connect(walletId?: string): Promise<WalletAccount | null> {
    if (this.status === AdapterStatus.CONNECTING) {
      // If already connecting, throw an error instead of waiting
      throw new Error('Connection already in progress');
    }
    
    this.status = AdapterStatus.CONNECTING;

    let instance: AdapterInterface | null = null;
    try {
      const targetWalletId = walletId;
      if (!targetWalletId) {
        throw new Error('No wallet ID provided');
      }
      if (!this.config.adapters[targetWalletId]) {
        throw new Error(`Invalid adapter id: ${targetWalletId}`);
      }
      
      const adapterInfo = this.config.adapters[targetWalletId];
      instance = new adapterInfo.adapter({ 
        adapter: adapterInfo,
        config: {
          ...this.config,
          ...adapterInfo.config
        },
        logger: this.logger
      });
      
      // Validate adapter instance
      if (!instance || typeof instance.connect !== 'function') {
        throw new Error('Invalid adapter instance');
      }

      const account = await instance.connect();
      
      // Validate connection result
      if (!account || !account.owner) {
        throw new Error('Invalid connection result: Missing account or owner');
      }

      this.account = account;
      this.adapter = {
        id: adapterInfo.id || targetWalletId,
        enabled: adapterInfo.enabled ?? true,
        logo: adapterInfo.logo || '',
        walletName: adapterInfo.walletName || targetWalletId,
        chain: adapterInfo.chain || 'ICP',
        adapter: adapterInfo.adapter,
        config: adapterInfo.config || {}
      } as AdapterConfig;
      this.provider = instance;
      this.status = AdapterStatus.CONNECTED;

      // Call the connected callback if set
      if (this.onConnectedCallback) {
        await this.onConnectedCallback();
      }

      return account;
    } catch (error) {
      // First transition to ERROR state
      this.status = AdapterStatus.ERROR;
      
      // Emit error with more context
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const enhancedError = new Error(`Connection failed: ${errorMessage}`);
      // Preserve the original error name if it exists
      if (error instanceof Error && error.name) {
        enhancedError.name = error.name; 
      }

      // Then attempt to disconnect if we have an instance
      if (instance) {
        try {
          await instance.disconnect();
        } catch (disconnectError) {
          this.logger.error('Error during disconnect after failed connect', disconnectError as Error);
        }
      }

      // Finally reset the state
      this._resetState();
      throw enhancedError; // Re-throw the enhanced error
    }
  }

  async disconnect(): Promise<void> {
    this.status = AdapterStatus.DISCONNECTING;

    try {
      if (this.provider) await this.provider.disconnect();
      this._resetState();
      this.status = AdapterStatus.DISCONNECTED;
      
      // Call the disconnected callback if set
      if (this.onDisconnectedCallback) {
        await this.onDisconnectedCallback();
      }
    } catch (error) {
      this._resetState();
      this.status = AdapterStatus.ERROR;
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return (
      this.adapter !== null &&
      this.provider !== null &&
      this.account !== null &&
      this.status === AdapterStatus.CONNECTED
    );
  }
} 