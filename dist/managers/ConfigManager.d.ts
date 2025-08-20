import { GlobalPnpConfig } from '../types/index.d';
export interface ConfigValidationError {
    field: string;
    message: string;
}
export declare class ConfigManager {
    private config;
    constructor(config: GlobalPnpConfig);
    getConfig(): GlobalPnpConfig;
    updateConfig(partialConfig: Partial<GlobalPnpConfig>): void;
    validateConfig(config: GlobalPnpConfig): {
        isValid: boolean;
        errors: ConfigValidationError[];
    };
    getAdapterConfig(id: string): any;
    isAdapterEnabled(id: string): boolean;
    enableAdapter(id: string): void;
    disableAdapter(id: string): void;
}
