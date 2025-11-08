import { Principal } from "@dfinity/principal";
import { ActorSubclass, HttpAgent, Actor, AnonymousIdentity, Identity } from "@dfinity/agent";
import { Adapter } from "./types/index.d";
import { AccountIdentifier } from '@dfinity/ledger-icp';


// ============================================================================
// IC/Principal Utilities
// ============================================================================

/**
 * Derives an account ID (hex string) from a principal
 */
export function deriveAccountId(principal: string | Principal): string {
  try {
    const principalObj = typeof principal === "string"
      ? Principal.fromText(principal)
      : principal;

    const accountIdentifier = AccountIdentifier.fromPrincipal({
      principal: principalObj
    });

    return accountIdentifier.toHex();
  } catch (err) {
    console.error("[Utils] Error deriving account ID:", err);
    throw err;
  }
}

/**
 * Determines if a principal is anonymous
 */
export function isPrincipalAnonymous(principal: string | Principal): boolean {
  try {
    const principalObj = typeof principal === "string"
      ? Principal.fromText(principal)
      : principal;
    return principalObj.isAnonymous();
  } catch (err) {
    console.error("[Utils] Error checking anonymous principal:", err);
    return true;
  }
}

/**
 * Validates if a provided principal string is valid
 */
export function isValidPrincipal(principalText: string | null | undefined): boolean {
  if (!principalText) return false;
  
  try {
    const principal = Principal.fromText(principalText);
    return !principal.isAnonymous();
  } catch (e) {
    return false;
  }
}

/**
 * Creates a standard wallet account object from a principal
 */
export async function createAccountFromPrincipal(principal: string | Principal): Promise<{
  owner: string,
  subaccount: string
}> {
  const principalText = typeof principal === "string" ? principal : principal.toText();
  return {
    owner: principalText,
    subaccount: deriveAccountId(principal)
  };
}

// ============================================================================
// Agent/Actor Utilities
// ============================================================================

export interface AgentConfig {
  host?: string;
  identity?: Identity;
  verifyQuerySignatures?: boolean;
  fetchRootKey?: boolean;
}

/**
 * Creates an HTTP agent with standard configuration
 */
export function createAgent(config: AgentConfig): HttpAgent {
  const agent = HttpAgent.createSync({
    host: config.host,
    identity: config.identity || new AnonymousIdentity(),
    verifyQuerySignatures: config.verifyQuerySignatures,
  });

  if (config.fetchRootKey) {
    agent.fetchRootKey().catch(e => {
      console.warn("Failed to fetch root key:", e);
    });
  }

  return agent;
}

/**
 * Creates an actor with an agent
 */
export function createActorWithAgent<T>(
  agent: HttpAgent,
  canisterId: string,
  idlFactory: any
): ActorSubclass<T> {
  return Actor.createActor<T>(idlFactory, {
    agent,
    canisterId,
  });
}

/**
 * Create an anonymous actor for a canister
 */
export function createAnonymousActor<T>(options: {
  canisterId: string,
  idl: any,
  adapter: Adapter.Config
}): ActorSubclass<T> {
  const { canisterId, idl, adapter } = options;
  const agent = HttpAgent.createSync({
    identity: new AnonymousIdentity(),
    host: adapter.config.hostUrl,
    verifyQuerySignatures: adapter.config.verifyQuerySignatures,
  });
  
  if (adapter.config.fetchRootKey) {
    agent.fetchRootKey();
  }

  return Actor.createActor<T>(idl, {
    agent,
    canisterId,
  });
}

/**
 * Helper to fetch root keys if configured to do so
 */
export async function fetchRootKeyIfNeeded(
  agent: HttpAgent,
  fetchRootKey: boolean | undefined,
): Promise<void> {
  if (fetchRootKey) {
    try {
      await agent.fetchRootKey();
    } catch (e) {
      console.warn(`Adapter unable to fetch root key. Check replica status.`, e);
    }
  }
}

// ============================================================================
// Configuration Utilities
// ============================================================================

/**
 * Creates default transport configuration for signer adapters
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

// ============================================================================
// Error Handling Utilities
// ============================================================================

/**
 * Standardized connection error handler for adapters
 */
export async function handleConnectionError(
  error: unknown, 
  contextMessage: string,
  setState: (state: Adapter.Status) => void,
  disconnect: () => Promise<void>
): Promise<never> {
  setState(Adapter.Status.ERROR);
  
  // Attempt to disconnect, but don't let disconnect errors mask the original error
  await disconnect().catch(disconnectError => {
    console.error(`[Utils] Error during disconnect after handling error:`, disconnectError);
  });
  
  // Re-throw the original error to propagate it
  throw error;
}

/**
 * Creates a standardized error message for adapter errors
 */
export function formatErrorMessage(
  walletName: string,
  context: string,
  errorDetail: string | Error
): string {
  const detail = errorDetail instanceof Error ? errorDetail.message : errorDetail;
  return `[${walletName}] ${context}: ${detail}`;
}

// ============================================================================
// Caching Utilities
// ============================================================================

/**
 * Creates a cache key for actor caching
 */
export function createActorCacheKey(
  walletName: string,
  canisterId: string,
  requiresSigning: boolean = false
): string {
  return `${walletName}-${canisterId}-${requiresSigning}`;
}

// ============================================================================
// Retry Utilities
// ============================================================================

/**
 * Common retry logic for IC operations
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt < maxRetries - 1) {
        console.warn(`[Utils] Operation failed, retrying (${attempt + 1}/${maxRetries})`, error);
        await new Promise(resolve => setTimeout(resolve, delayMs * (attempt + 1)));
      }
    }
  }
  
  throw lastError;
}

// ============================================================================
// SIWS/SIWE Utilities (to be moved to separate packages)
// ============================================================================

/**
 * Format a SIWS message object from canister into a string for signing
 * Note: This will be moved to @windoge98/pnp-solana package
 */
export function formatSiwsMessage(message: any): string {
  const issuedAtDate = new Date(Number(message.issued_at / BigInt(1_000_000)));
  const expirationDate = new Date(Number(message.expiration_time / BigInt(1_000_000)));
  
  let formattedMessage = `${message.domain} wants you to sign in with your Solana account:\n`;
  formattedMessage += `${message.address}\n\n`;
  formattedMessage += (message.statement || "") + "\n\n";
  formattedMessage += `URI: ${message.uri}\n`;
  formattedMessage += `Version: ${message.version}\n`; 
  formattedMessage += `Chain ID: ${message.chain_id || 'solana'}\n`;
  formattedMessage += `Nonce: ${message.nonce}\n`;
  formattedMessage += `Issued At: ${issuedAtDate.toISOString()}\n`;
  formattedMessage += `Expiration Time: ${expirationDate.toISOString()}`;
  
  if (message.request_id) formattedMessage += `\nRequest ID: ${message.request_id}`;
  if (message.resources) {
    formattedMessage += `\nResources:`;
    message.resources.forEach((resource: string) => {
      formattedMessage += `\n- ${resource}`;
    });
  }
  
  return formattedMessage;
}