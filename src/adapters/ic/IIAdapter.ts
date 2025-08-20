// src/adapters/ic/IIAdapter.ts

import { type ActorSubclass, Identity, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { type Wallet, Adapter } from "../../types/index.d";
import { BaseAdapter } from "../BaseAdapter";
import { createAccountFromPrincipal } from "../../utils";
import { IIAdapterConfig } from '../../types/AdapterConfigs';
import { isIIAdapterConfig } from '../../types/AdapterConfigs';

// Extend BaseIcAdapter
export class IIAdapter extends BaseAdapter<IIAdapterConfig> implements Adapter.Interface {
  // II specific properties
  private authClient: AuthClient | null = null;
  private agent: HttpAgent | null = null;

  constructor(args: { adapter: any; config: IIAdapterConfig } | IIAdapterConfig) {
    // Support simplified constructor in tests: new IIAdapter(config)
    const normalized = ((): { adapter: any; config: IIAdapterConfig } => {
      if ('config' in (args as any)) {
        return args as { adapter: any; config: IIAdapterConfig };
      }
      return {
        adapter: {
          id: 'ii',
          enabled: true,
          walletName: 'Internet Identity',
          logo: undefined,
          website: 'https://internetcomputer.org',
          chain: 'ICP',
          adapter: IIAdapter,
          config: {}
        },
        config: args as IIAdapterConfig,
      };
    })();

    if (!isIIAdapterConfig(normalized.config)) {
      throw new Error('Invalid config for IIAdapter');
    }
    super(normalized as any);
    
    // Initialize AuthClient immediately for Safari compatibility
    // This happens during app initialization, not during user interaction
    this.initializeAuthClientSync();
  }

  private initializeAuthClientSync(): void {
    // Initialize AuthClient asynchronously without blocking
    // This ensures it's ready when the user clicks connect
    AuthClient.create({
      idleOptions: {
        idleTimeout: Number(this.config.timeout ?? 1000 * 60 * 60 * 24), // Default 24 hours
        disableDefaultIdleCallback: true,
      },
    }).then(client => {
      this.authClient = client;
      this.authClient.idleManager?.registerCallback?.(() => this.refreshLogin());
      this.logger.debug('[II] AuthClient initialized successfully');
    }).catch(err => {
      this.handleError('Failed to create AuthClient', err);
      this.setState(Adapter.Status.ERROR);
    });
  }

  private async ensureAuthClient(): Promise<void> {
    if (this.authClient) {
      return;
    }
    
    // Wait for AuthClient to be initialized
    let attempts = 0;
    while (!this.authClient && attempts < 50) { // Max 5 seconds
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    if (!this.authClient) {
      throw new Error('Failed to initialize AuthClient after 5 seconds');
    }
  }

  async openChannel(): Promise<void> {
    // No-op for II adapter - AuthClient is initialized in constructor
    // This method exists for compatibility with other adapters
    return Promise.resolve();
  }

  // Use the resolved config for agent initialization
  private async initAgent(identity: Identity): Promise<void> {
    const agent = await this.buildHttpAgent({ identity });
    this.agent = agent;
  }

  async connect(): Promise<Wallet.Account> {
    try {
      this.setState(Adapter.Status.CONNECTING);
      
      // Ensure AuthClient is ready (should be initialized in constructor)
      await this.ensureAuthClient();

      // For Safari compatibility, we must open the popup IMMEDIATELY
      // No async operations allowed before login() call
      return await this.performLogin();
    } catch (error) {
      this.setState(Adapter.Status.ERROR);
      throw error;
    }
  }

  private async performLogin(): Promise<Wallet.Account> {
    return new Promise<Wallet.Account>((resolve, reject) => {
      // Check authentication status in the background AFTER initiating login
      // This is done to handle the case where user is already authenticated
      let checkCompleted = false;
      
      const loginOptions = {
        derivationOrigin: this.config.derivationOrigin,
        identityProvider: this.config.iiProviderUrl || 'https://id.ai',
        maxTimeToLive: BigInt((this.config.timeout ?? 1 * 24 * 60 * 60) * 1000 * 1000 * 1000), // Default 1 day
        windowOpenerFeatures: `width=500,height=600,left=${window.screen.width / 2 - 250},top=${window.screen.height / 2 - 300}`,
        onSuccess: async () => {
          checkCompleted = true;
          this.logger.debug('[II] Login success callback triggered');
          try {
            const identity = this.authClient!.getIdentity();
            const account = await this.createAccountFromIdentity(identity);
            this.setState(Adapter.Status.CONNECTED);
            resolve(account);
          } catch (error) {
            this.setState(Adapter.Status.ERROR);
            reject(error);
          }
        },
        onError: (error?: string) => {
          checkCompleted = true;
          this.handleError('Login error', error || 'Unknown error');
          this.setState(Adapter.Status.ERROR);
          reject(new Error(`II Authentication failed: ${error || 'Unknown error'}`));
        },
      };
      
      this.logger.debug('[II] Starting login immediately for Safari compatibility');
      
      // CRITICAL: Call login() IMMEDIATELY - no async operations before this
      this.authClient!.login(loginOptions);
      
      // Check if already authenticated AFTER starting login
      // If authenticated, the popup will close automatically
      this.authClient!.isAuthenticated().then(async (isAuthenticated) => {
        if (!checkCompleted && isAuthenticated) {
          const identity = this.authClient!.getIdentity();
          if (identity && !identity.getPrincipal().isAnonymous()) {
            checkCompleted = true;
            try {
              const account = await this.createAccountFromIdentity(identity);
              this.setState(Adapter.Status.CONNECTED);
              resolve(account);
            } catch (error) {
              this.setState(Adapter.Status.ERROR);
              reject(error);
            }
          }
        }
      }).catch(err => {
        // Ignore errors in background check
        this.logger.debug('[II] Background auth check failed:', err);
      });
    });
  }

  private async createAccountFromIdentity(identity: Identity): Promise<Wallet.Account> {
    if (!identity) {
      throw new Error("No identity available after login");
    }

    const principal = identity.getPrincipal();
    this.logger.debug('[II] Principal from identity:', { principal: principal.toText() });

    if (principal.isAnonymous()) {
      throw new Error(
        "Authentication failed: Anonymous principal returned. " +
        "This usually means the authentication was cancelled or failed."
      );
    }
    
    await this.initAgent(identity);
    
    const account = await createAccountFromPrincipal(principal);
    if (!account || !account.owner) {
      throw new Error("Failed to create valid account from principal");
    }
    
    return account;
  }

  async isConnected(): Promise<boolean> {
    return this.authClient ? await this.authClient.isAuthenticated() : false;
  }

  // Implementation for BaseIcAdapter actor caching
  protected createActorInternal<T>(
    canisterId: string, 
    idl: any,
    _options?: {
      requiresSigning?: boolean;
    }
  ): ActorSubclass<T> {
    if (!this.agent) {
      throw new Error("Agent not initialized. Connect first.");
    }

    return this.createActorWithAgent<T>(this.agent, canisterId, idl);
  }

  async getPrincipal(): Promise<string> {
    if (!this.authClient) throw new Error("Not connected");
    const identity = this.authClient.getIdentity();
    if (!identity) throw new Error("Identity not available");
    const principal = identity.getPrincipal();
    return principal.toText();
  }

  private async refreshLogin(): Promise<void> {
    try {
      await this.ensureAuthClient();
      await this.performLogin(); 
    } catch (error) {
      this.handleError('Failed to refresh login', error);
      await this.disconnect().catch(() => {}); 
    }
  }

  // Disconnect logic specific to II
  protected async disconnectInternal(): Promise<void> {
    if (this.authClient) { 
        await this.authClient.logout();
    } 
  }

  // Cleanup logic specific to II
  protected cleanupInternal(): void {
      this.authClient = null;
      this.agent = null;
  }

  /**
   * Dispose of II-specific resources
   * Ensures AuthClient and agent are properly cleaned up
   */
  protected async onDispose(): Promise<void> {
    // Ensure logout if still connected
    if (this.authClient) {
      try {
        await this.authClient.logout();
      } catch (error) {
        // Best effort - already disposing
      }
      this.authClient = null;
    }
    this.agent = null;
  }
}