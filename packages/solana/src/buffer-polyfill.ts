// Buffer polyfill - only load in browser environment
let Buffer: any;

// Check if we're in a browser environment
if (typeof window !== 'undefined' && typeof window.Buffer === 'undefined') {
  // Dynamically import buffer only in browser
  import('buffer').then(({ Buffer: BufferPolyfill }) => {
    Buffer = BufferPolyfill;
    
    // Set Buffer on global objects
    const globalObj: any = (function() {
      if (typeof globalThis !== 'undefined') return globalThis;
      if (typeof window !== 'undefined') return window;
      if (typeof global !== 'undefined') return global;
      if (typeof self !== 'undefined') return self;
      throw new Error('Unable to locate global object');
    })();
    
    globalObj.Buffer = Buffer;
    
    // Also set on specific globals for compatibility
    if (typeof globalThis !== 'undefined') {
      (globalThis as any).Buffer = Buffer;
    }
    if (typeof window !== 'undefined') {
      (window as any).Buffer = Buffer;
    }
    if (typeof self !== 'undefined') {
      (self as any).Buffer = Buffer;
    }
  });
} else if (typeof global !== 'undefined' && global.Buffer) {
  // Node.js environment - use native Buffer
  Buffer = global.Buffer;
} else if (typeof window !== 'undefined' && window.Buffer) {
  // Browser with Buffer already available
  Buffer = window.Buffer;
}

// Export for ES module usage
export { Buffer };