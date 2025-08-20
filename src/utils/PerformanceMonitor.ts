/**
 * Performance monitoring utilities for PNP library
 * Tracks key metrics and provides insights for optimization
 */

import { isBrowser } from './browser';

export interface PerformanceMetrics {
  connectionTime?: number;
  actorCreationTime?: number;
  cacheHitRate?: number;
  memoryUsage?: number;
  activeConnections?: number;
  pendingOperations?: number;
}

export interface TimingEntry {
  startTime: number;
  endTime?: number;
  duration?: number;
  success?: boolean;
  error?: string;
}

/**
 * Performance monitor for tracking and analyzing PNP operations
 */
export class PerformanceMonitor {
  private timings: Map<string, TimingEntry[]> = new Map();
  private metrics: PerformanceMetrics = {};
  private cacheHits: number = 0;
  private cacheMisses: number = 0;
  private enabled: boolean = true;

  constructor(enabled: boolean = true) {
    this.enabled = enabled;
  }

  /**
   * Start timing an operation
   */
  startTiming(operation: string, id?: string): string {
    if (!this.enabled) return '';
    
    const operationId = id || `${operation}-${Date.now()}`;
    const key = `${operation}:${operationId}`;
    
    const timing: TimingEntry = {
      startTime: performance.now(),
    };
    
    const timings = this.timings.get(operation) || [];
    timings.push(timing);
    this.timings.set(operation, timings);
    
    return key;
  }

  /**
   * End timing an operation
   */
  endTiming(key: string, success: boolean = true, error?: string): number {
    if (!this.enabled) return 0;
    
    const [operation] = key.split(':');
    const timings = this.timings.get(operation);
    
    if (!timings || timings.length === 0) return 0;
    
    const timing = timings[timings.length - 1];
    timing.endTime = performance.now();
    timing.duration = timing.endTime - timing.startTime;
    timing.success = success;
    if (error) timing.error = error;
    
    // Update average metrics
    this.updateMetrics(operation, timing.duration);
    
    return timing.duration;
  }

  /**
   * Record a cache hit or miss
   */
  recordCacheAccess(hit: boolean): void {
    if (!this.enabled) return;
    
    if (hit) {
      this.cacheHits++;
    } else {
      this.cacheMisses++;
    }
    
    this.updateCacheHitRate();
  }

  /**
   * Update cache hit rate metric
   */
  private updateCacheHitRate(): void {
    const total = this.cacheHits + this.cacheMisses;
    if (total > 0) {
      this.metrics.cacheHitRate = (this.cacheHits / total) * 100;
    }
  }

  /**
   * Update average metrics for an operation
   */
  private updateMetrics(operation: string, duration: number): void {
    switch (operation) {
      case 'connection':
        this.metrics.connectionTime = this.getAverageTiming('connection');
        break;
      case 'actorCreation':
        this.metrics.actorCreationTime = this.getAverageTiming('actorCreation');
        break;
    }
  }

  /**
   * Get average timing for an operation
   */
  getAverageTiming(operation: string): number {
    const timings = this.timings.get(operation);
    if (!timings || timings.length === 0) return 0;
    
    const completedTimings = timings.filter(t => t.duration !== undefined);
    if (completedTimings.length === 0) return 0;
    
    const sum = completedTimings.reduce((acc, t) => acc + (t.duration || 0), 0);
    return sum / completedTimings.length;
  }

  /**
   * Get percentile timing for an operation
   */
  getPercentileTiming(operation: string, percentile: number): number {
    const timings = this.timings.get(operation);
    if (!timings || timings.length === 0) return 0;
    
    const durations = timings
      .filter(t => t.duration !== undefined)
      .map(t => t.duration!)
      .sort((a, b) => a - b);
    
    if (durations.length === 0) return 0;
    
    const index = Math.ceil((percentile / 100) * durations.length) - 1;
    return durations[Math.max(0, Math.min(index, durations.length - 1))];
  }

  /**
   * Update memory usage metric
   */
  updateMemoryUsage(): void {
    if (!this.enabled) return;
    
    if ('memory' in performance) {
      // @ts-ignore - memory is not in all browsers
      this.metrics.memoryUsage = performance.memory.usedJSHeapSize / 1048576; // Convert to MB
    }
  }

  /**
   * Get current metrics
   */
  getMetrics(): PerformanceMetrics {
    this.updateMemoryUsage();
    return { ...this.metrics };
  }

  /**
   * Get detailed timing report
   */
  getTimingReport(): Record<string, {
    count: number;
    average: number;
    p50: number;
    p95: number;
    p99: number;
    successRate: number;
  }> {
    const report: Record<string, any> = {};
    
    for (const [operation, timings] of this.timings.entries()) {
      const completed = timings.filter(t => t.duration !== undefined);
      const successful = completed.filter(t => t.success);
      
      report[operation] = {
        count: completed.length,
        average: this.getAverageTiming(operation),
        p50: this.getPercentileTiming(operation, 50),
        p95: this.getPercentileTiming(operation, 95),
        p99: this.getPercentileTiming(operation, 99),
        successRate: completed.length > 0 
          ? (successful.length / completed.length) * 100 
          : 0,
      };
    }
    
    return report;
  }

  /**
   * Clear all metrics and timings
   */
  clear(): void {
    this.timings.clear();
    this.metrics = {};
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }

  /**
   * Enable or disable monitoring
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * Log performance summary to console
   */
  logSummary(): void {
    if (!this.enabled) return;
    
    console.group('🎯 PNP Performance Summary');
    console.table(this.getMetrics());
    console.table(this.getTimingReport());
    console.groupEnd();
  }
}

// Global performance monitor instance - lazy initialization to avoid SSR issues
let _globalPerformanceMonitor: PerformanceMonitor | null = null;

export const globalPerformanceMonitor: PerformanceMonitor = new Proxy({} as PerformanceMonitor, {
  get(target, prop, receiver) {
    if (!_globalPerformanceMonitor) {
      _globalPerformanceMonitor = new PerformanceMonitor(
        isBrowser && window.location?.hostname === 'localhost'
      );
    }
    return Reflect.get(_globalPerformanceMonitor, prop, _globalPerformanceMonitor);
  }
});