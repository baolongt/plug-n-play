import { Adapter } from "../types/index.d";

/**
 * Creates default transport configuration
 */
export function getDefaultTransportConfig() {
  return {
    windowOpenerFeatures: "width=525,height=705",
    establishTimeout: 45000,
    disconnectTimeout: 45000,
    statusPollingRate: 500,
    detectNonClickEstablishment: false,
  };
}

/**
 * Determines the host URL based on dfxNetwork configuration
 */
export function getHostUrl(config: any): string {
  if (config.hostUrl) return config.hostUrl;
  return config.dfxNetwork === "local" ? "http://127.0.0.1:8080" : "https://icp0.io";
}

/**
 * Common adapter configuration defaults
 */
export const DEFAULT_ADAPTER_CONFIG = {
  fetchRootKey: false,
  verifyQuerySignatures: true,
  timeout: 24 * 60 * 60 * 1000, // 24 hours
}; 