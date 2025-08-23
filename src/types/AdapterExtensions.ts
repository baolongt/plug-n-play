import { AdapterConfig } from './AdapterTypes';

/**
 * Type-safe adapter extension package with metadata
 */
export type AdapterExtension<T extends Record<string, AdapterConfig> = Record<string, AdapterConfig>> = {
  readonly __brand: 'AdapterExtension';
  readonly __adapters: T;
} & {
  readonly [K in keyof T]: T[K] & { readonly id: K };
};

/**
 * Extract adapter IDs from an extension for type safety
 */
export type ExtractAdapterIds<T> = T extends AdapterExtension<infer U> 
  ? keyof U 
  : never;

/**
 * Extract adapter IDs from multiple extensions
 */
export type ExtractAdapterIdsFromExtensions<T extends readonly AdapterExtension[]> = 
  T extends readonly AdapterExtension<infer U>[] 
    ? keyof U
    : never;

/**
 * Factory function to create a type-safe adapter extension
 */
export function createAdapterExtension<T extends Record<string, AdapterConfig>>(
  adapters: T
): AdapterExtension<T> {
  // Add ID to each adapter config
  const enhancedAdapters = Object.fromEntries(
    Object.entries(adapters).map(([id, config]) => [
      id, 
      { ...config, id }
    ])
  ) as any;
  
  // Add metadata
  enhancedAdapters.__brand = 'AdapterExtension';
  enhancedAdapters.__adapters = adapters;
  
  return enhancedAdapters as AdapterExtension<T>;
}

/**
 * Check if an object is an adapter extension
 */
export function isAdapterExtension(obj: unknown): obj is AdapterExtension {
  return (
    typeof obj === 'object' && 
    obj !== null && 
    '__brand' in obj && 
    (obj as any).__brand === 'AdapterExtension'
  );
}

/**
 * Extract all adapters from an extension as a flat record
 */
export function extractAdapters<T extends Record<string, AdapterConfig>>(
  extension: AdapterExtension<T>
): T {
  return extension.__adapters;
}

/**
 * Merge multiple adapter extensions into a single record
 */
export function mergeAdapterExtensions(
  ...extensions: AdapterExtension<any>[]
): Record<string, AdapterConfig> {
  const result: Record<string, AdapterConfig> = {};
  
  for (const extension of extensions) {
    if (isAdapterExtension(extension)) {
      Object.assign(result, extractAdapters(extension));
    }
  }
  
  return result;
}