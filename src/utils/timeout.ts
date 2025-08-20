/**
 * Timeout utilities for handling async operations with timeouts
 */

/**
 * Wraps a promise with a timeout
 * @param promise The promise to wrap
 * @param timeoutMs Timeout in milliseconds
 * @param timeoutError Optional custom error message
 * @returns Promise that rejects if timeout is reached
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutError?: string
): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(timeoutError || `Operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId!);
    return result;
  } catch (error) {
    clearTimeout(timeoutId!);
    throw error;
  }
}

/**
 * Creates a timeout controller for managing multiple operations
 */
export class TimeoutController {
  private timeouts: Map<string, NodeJS.Timeout> = new Map();
  private defaultTimeout: number;

  constructor(defaultTimeoutMs: number = 30000) {
    this.defaultTimeout = defaultTimeoutMs;
  }

  /**
   * Wrap an operation with timeout
   */
  async withTimeout<T>(
    operationId: string,
    operation: Promise<T>,
    timeoutMs?: number
  ): Promise<T> {
    const timeout = timeoutMs || this.defaultTimeout;
    
    return withTimeout(
      operation,
      timeout,
      `Operation '${operationId}' timed out after ${timeout}ms`
    ).finally(() => {
      this.clear(operationId);
    });
  }

  /**
   * Set a timeout callback
   */
  setTimeout(
    id: string,
    callback: () => void,
    timeoutMs?: number
  ): void {
    this.clear(id);
    
    const timeout = timeoutMs || this.defaultTimeout;
    const timeoutId = setTimeout(() => {
      callback();
      this.timeouts.delete(id);
    }, timeout);
    
    this.timeouts.set(id, timeoutId);
  }

  /**
   * Clear a specific timeout
   */
  clear(id: string): void {
    const timeoutId = this.timeouts.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.timeouts.delete(id);
    }
  }

  /**
   * Clear all timeouts
   */
  clearAll(): void {
    for (const timeoutId of this.timeouts.values()) {
      clearTimeout(timeoutId);
    }
    this.timeouts.clear();
  }

  /**
   * Get active timeout count
   */
  get activeCount(): number {
    return this.timeouts.size;
  }
}

/**
 * Connection-specific timeout configuration
 */
export interface ConnectionTimeoutConfig {
  connectTimeout?: number;      // Default: 30s
  authTimeout?: number;         // Default: 60s
  actorCreationTimeout?: number; // Default: 10s
  networkTimeout?: number;      // Default: 30s
}

export const DEFAULT_TIMEOUTS: ConnectionTimeoutConfig = {
  connectTimeout: 30000,        // 30 seconds
  authTimeout: 60000,          // 60 seconds for auth flows
  actorCreationTimeout: 10000, // 10 seconds
  networkTimeout: 60000,       // 60 seconds
};