/**
 * Polyfill globals for SSR compatibility
 */

// Ensure globalThis has necessary browser globals for SSR
if (typeof globalThis !== 'undefined') {
  // Polyfill 'self' for Node.js/SSR environments
  if (typeof self === 'undefined') {
    (globalThis as any).self = globalThis;
  }
  
  // Polyfill basic location object for SSR
  if (typeof location === 'undefined' && typeof globalThis !== 'undefined') {
    (globalThis as any).location = {
      protocol: 'https:',
      host: 'localhost',
      hostname: 'localhost',
      href: 'https://localhost/',
      origin: 'https://localhost',
      pathname: '/',
      search: '',
      hash: ''
    };
  }
  
  // Polyfill URL if not available
  if (typeof URL === 'undefined' && typeof globalThis !== 'undefined') {
    try {
      const { URL: NodeURL } = require('url');
      (globalThis as any).URL = NodeURL;
    } catch {
      // URL not available, ignore
    }
  }
  
  // Polyfill fetch if not available
  if (typeof fetch === 'undefined' && typeof globalThis !== 'undefined') {
    (globalThis as any).fetch = () => {
      throw new Error('fetch is not available in this environment');
    };
  }
}

export {};