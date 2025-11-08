/**
 * Node for doubly-linked list used in LRU tracking
 */
interface LRUNode<K, V> {
  key: K;
  value: V;
  prev: LRUNode<K, V> | null;
  next: LRUNode<K, V> | null;
}

/**
 * Optimized LRU (Least Recently Used) Cache implementation for actor caching
 * Uses doubly-linked list for O(1) eviction and access order tracking
 * Based on patterns from isaacs/node-lru-cache
 */
export class LRUCache<K, V> {
  private maxSize: number;
  private cache: Map<K, LRUNode<K, V>>;
  private head: LRUNode<K, V> | null = null;
  private tail: LRUNode<K, V> | null = null;

  constructor(maxSize: number = 50) {
    if (maxSize <= 0) {
      throw new Error('LRU cache size must be positive');
    }
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  /**
   * Get a value from the cache
   * Updates access order for LRU tracking - O(1)
   */
  get(key: K): V | undefined {
    const node = this.cache.get(key);
    if (!node) return undefined;

    // Move to front (most recently used) - O(1)
    this.moveToFront(node);
    return node.value;
  }

  /**
   * Set a value in the cache
   * Evicts least recently used item if size limit is reached - O(1)
   */
  set(key: K, value: V): void {
    const existingNode = this.cache.get(key);

    // If key exists, update value and move to front
    if (existingNode) {
      existingNode.value = value;
      this.moveToFront(existingNode);
      return;
    }

    // If at capacity, evict LRU item (tail) - O(1)
    if (this.cache.size >= this.maxSize) {
      this.evictTail();
    }

    // Create new node and add to front
    const newNode: LRUNode<K, V> = {
      key,
      value,
      prev: null,
      next: this.head,
    };

    this.cache.set(key, newNode);
    this.insertAtFront(newNode);
  }

  /**
   * Check if cache has a key
   */
  has(key: K): boolean {
    return this.cache.has(key);
  }

  /**
   * Delete a specific key from cache - O(1)
   */
  delete(key: K): boolean {
    const node = this.cache.get(key);
    if (!node) return false;

    this.removeNode(node);
    return this.cache.delete(key);
  }

  /**
   * Clear all items from cache
   */
  clear(): void {
    this.cache.clear();
    this.head = null;
    this.tail = null;
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
   * Move node to front of list (most recently used) - O(1)
   */
  private moveToFront(node: LRUNode<K, V>): void {
    if (node === this.head) return;

    // Remove from current position
    this.removeNode(node);

    // Insert at front
    this.insertAtFront(node);
  }

  /**
   * Remove node from linked list - O(1)
   */
  private removeNode(node: LRUNode<K, V>): void {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      // Node is head
      this.head = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      // Node is tail
      this.tail = node.prev;
    }
  }

  /**
   * Insert node at front of list - O(1)
   */
  private insertAtFront(node: LRUNode<K, V>): void {
    node.next = this.head;
    node.prev = null;

    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }
  }

  /**
   * Evict the tail (least recently used item) - O(1)
   * Optimized from O(n) linear scan to O(1) constant time
   */
  private evictTail(): void {
    if (!this.tail) return;

    const key = this.tail.key;
    this.cache.delete(key);

    if (this.tail.prev) {
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    } else {
      // Only one item in cache
      this.head = null;
      this.tail = null;
    }
  }

  /**
   * Get all keys in cache (for debugging)
   */
  keys(): K[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Get entries sorted by access order (most recent first) - O(n)
   */
  getEntriesByAccessOrder(): Array<[K, V]> {
    const entries: Array<[K, V]> = [];
    let current = this.head;

    while (current) {
      entries.push([current.key, current.value]);
      current = current.next;
    }

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