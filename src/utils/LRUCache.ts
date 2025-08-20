/**
 * LRU (Least Recently Used) Cache implementation for actor caching
 * Provides automatic eviction of least recently used items when size limit is reached
 */
export class LRUCache<K, V> {
  private maxSize: number;
  private cache: Map<K, V>;
  private accessOrder: Map<K, number>;
  private accessCounter: number = 0;

  constructor(maxSize: number = 50) {
    if (maxSize <= 0) {
      throw new Error('LRU cache size must be positive');
    }
    this.maxSize = maxSize;
    this.cache = new Map();
    this.accessOrder = new Map();
  }

  /**
   * Get a value from the cache
   * Updates access order for LRU tracking
   */
  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // Update access order
      this.accessOrder.set(key, ++this.accessCounter);
    }
    return value;
  }

  /**
   * Set a value in the cache
   * Evicts least recently used item if size limit is reached
   */
  set(key: K, value: V): void {
    // If key exists, update it
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      this.accessOrder.set(key, ++this.accessCounter);
      return;
    }

    // If at capacity, evict LRU item
    if (this.cache.size >= this.maxSize) {
      this.evictLRU();
    }

    // Add new item
    this.cache.set(key, value);
    this.accessOrder.set(key, ++this.accessCounter);
  }

  /**
   * Check if cache has a key
   */
  has(key: K): boolean {
    return this.cache.has(key);
  }

  /**
   * Delete a specific key from cache
   */
  delete(key: K): boolean {
    this.accessOrder.delete(key);
    return this.cache.delete(key);
  }

  /**
   * Clear all items from cache
   */
  clear(): void {
    this.cache.clear();
    this.accessOrder.clear();
    this.accessCounter = 0;
  }

  /**
   * Get current cache size
   */
  get size(): number {
    return this.cache.size;
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number;
    maxSize: number;
    hitRate?: number;
  } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
    };
  }

  /**
   * Evict the least recently used item
   */
  private evictLRU(): void {
    let lruKey: K | undefined;
    let lruAccess = Infinity;

    // Find the least recently used key
    for (const [key, accessTime] of this.accessOrder.entries()) {
      if (accessTime < lruAccess) {
        lruAccess = accessTime;
        lruKey = key;
      }
    }

    // Remove LRU item
    if (lruKey !== undefined) {
      this.cache.delete(lruKey);
      this.accessOrder.delete(lruKey);
    }
  }

  /**
   * Get all keys in cache (for debugging)
   */
  keys(): K[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Get entries sorted by access order (most recent first)
   */
  getEntriesByAccessOrder(): Array<[K, V]> {
    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) => {
      const aAccess = this.accessOrder.get(a[0]) || 0;
      const bAccess = this.accessOrder.get(b[0]) || 0;
      return bAccess - aAccess;
    });
    return entries;
  }
}

/**
 * TTL (Time To Live) extension for LRU cache
 * Adds expiration support to cache entries
 */
export class TTLLRUCache<K, V> extends LRUCache<K, { value: V; expiry: number }> {
  private defaultTTL: number;

  constructor(maxSize: number = 50, defaultTTLMs: number = 5 * 60 * 1000) {
    super(maxSize);
    this.defaultTTL = defaultTTLMs;
  }

  /**
   * Get a value, checking for expiration
   */
  getValue(key: K): V | undefined {
    const entry = super.get(key);
    if (!entry) return undefined;

    // Check if expired
    if (Date.now() > entry.expiry) {
      super.delete(key);
      return undefined;
    }

    return entry.value;
  }

  /**
   * Set a value with optional TTL
   */
  setValue(key: K, value: V, ttlMs?: number): void {
    const expiry = Date.now() + (ttlMs || this.defaultTTL);
    super.set(key, { value, expiry });
  }

  /**
   * Clean up expired entries
   */
  cleanupExpired(): number {
    const now = Date.now();
    let removed = 0;

    for (const key of this.keys()) {
      const entry = super.get(key);
      if (entry && now > entry.expiry) {
        super.delete(key);
        removed++;
      }
    }

    return removed;
  }
}