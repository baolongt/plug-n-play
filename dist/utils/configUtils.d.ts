/**
 * Creates default transport configuration
 */
export declare function getDefaultTransportConfig(): {
    windowOpenerFeatures: string;
    establishTimeout: number;
    disconnectTimeout: number;
    statusPollingRate: number;
    detectNonClickEstablishment: boolean;
};
/**
 * Determines the host URL based on dfxNetwork configuration
 */
export declare function getHostUrl(config: any): string;
/**
 * Common adapter configuration defaults
 */
export declare const DEFAULT_ADAPTER_CONFIG: {
    fetchRootKey: boolean;
    verifyQuerySignatures: boolean;
    timeout: number;
};
