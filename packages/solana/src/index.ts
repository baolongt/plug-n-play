// Must import buffer polyfill first - critical for browser environments
import './buffer-polyfill';
import { Buffer } from 'buffer';

// Ensure Buffer is globally available
if (typeof globalThis !== 'undefined' && typeof globalThis.Buffer === 'undefined') {
  (globalThis as any).Buffer = Buffer;
}
if (typeof window !== 'undefined' && typeof window.Buffer === 'undefined') {
  (window as any).Buffer = Buffer;
}

import { SiwsAdapter } from './SiwsAdapter';

// Export the adapter
export { SiwsAdapter };

// Export the Solana extension for declarative registration
export { SolanaExtension } from './extensions';
export type { SolanaAdapterIds } from './extensions';

// Export Solana adapter configurations, derived from the extension to avoid duplication
import { SolanaExtension } from './extensions';
export const SolanaAdapters = SolanaExtension.__adapters;

// Utility function to format SIWS messages
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