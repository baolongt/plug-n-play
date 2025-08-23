import { GlobalPnpConfig } from '../types/index.d';

export interface ConfigValidationError {
  field: string;
  message: string;
}

export class ConfigManager {
  private config: GlobalPnpConfig;

  constructor(config: GlobalPnpConfig) {
    this.config = config;
    this.validateConfig(this.config);
  }

  getConfig(): GlobalPnpConfig {
    return this.config;
  }

  updateConfig(partialConfig: Partial<GlobalPnpConfig>) {
    const newConfig = { ...this.config, ...partialConfig };
    
    // Validate before updating
    const validationResult = this.validateConfig(newConfig);
    if (!validationResult.isValid) {
      throw new Error(`Invalid configuration: ${validationResult.errors.map(e => e.message).join(', ')}`);
    }

    this.config = newConfig;
  }

  validateConfig(config: GlobalPnpConfig): { isValid: boolean; errors: ConfigValidationError[] } {
    const errors: ConfigValidationError[] = [];

    // Validate host URL
    if (config.hostUrl) {
      try {
        new URL(config.hostUrl);
      } catch {
        errors.push({ field: 'hostUrl', message: 'Invalid host URL format' });
      }
    }

    // Validate delegation timeout
    if (config.delegationTimeout && config.delegationTimeout <= 0) {
      errors.push({ field: 'delegationTimeout', message: 'Delegation timeout must be positive' });
    }

    // Validate delegation targets
    if (config.delegationTargets) {
      if (!Array.isArray(config.delegationTargets)) {
        errors.push({ field: 'delegationTargets', message: 'Delegation targets must be an array' });
      } else {
        config.delegationTargets.forEach((target, index) => {
          if (typeof target !== 'string') {
            errors.push({ field: `delegationTargets[${index}]`, message: 'Delegation target must be a string' });
          }
        });
      }
    }

    // Validate adapters
    if (config.adapters) {
      Object.entries(config.adapters).forEach(([id, adapter]) => {
        if (!adapter) {
          errors.push({ field: `adapters.${id}`, message: 'Adapter configuration is required' });
          return;
        }

        // Only validate required fields if they are provided
        if (adapter.id && typeof adapter.id !== 'string') {
          errors.push({ field: `adapters.${id}.id`, message: 'Adapter ID must be a string' });
        }

        if (adapter.walletName && typeof adapter.walletName !== 'string') {
          errors.push({ field: `adapters.${id}.walletName`, message: 'Wallet name must be a string' });
        }

        if (adapter.logo && typeof adapter.logo !== 'string') {
          errors.push({ field: `adapters.${id}.logo`, message: 'Logo URL must be a string' });
        }

        if (adapter.adapter && typeof adapter.adapter !== 'function') {
          errors.push({ field: `adapters.${id}.adapter`, message: 'Adapter must be a constructor function' });
        }
      });
    }

    const isValid = errors.length === 0;
    return { isValid, errors };
  }

  // Helper methods
  getAdapterConfig(id: string) {
    return this.config.adapters?.[id] || null;
  }

  isAdapterEnabled(id: string): boolean {
    const adapter = this.getAdapterConfig(id);
    return adapter?.enabled !== false;
  }

  enableAdapter(id: string) {
    this.updateConfig({
      adapters: {
        ...this.config.adapters,
        [id]: {
          ...this.config.adapters?.[id],
          enabled: true
        }
      }
    });
  }

  disableAdapter(id: string) {
    this.updateConfig({
      adapters: {
        ...this.config.adapters,
        [id]: {
          ...this.config.adapters?.[id],
          enabled: false
        }
      }
    });
  }
} 