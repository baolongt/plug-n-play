/**
 * Browser environment utilities for SSR-safe access to browser APIs
 */

export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * SSR-safe localStorage wrapper
 */
export const storage = {
  getItem: (key: string): string | null => {
    if (!isBrowser || typeof localStorage === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  
  setItem: (key: string, value: string): void => {
    if (!isBrowser || typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore storage errors (e.g., quota exceeded)
    }
  },
  
  removeItem: (key: string): void => {
    if (!isBrowser || typeof localStorage === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore storage errors
    }
  }
};

/**
 * SSR-safe window event wrapper
 */
export const windowEvents = {
  addEventListener: (event: string, handler: EventListener): void => {
    if (isBrowser) {
      window.addEventListener(event, handler);
    }
  },
  
  removeEventListener: (event: string, handler: EventListener): void => {
    if (isBrowser) {
      window.removeEventListener(event, handler);
    }
  }
};

/**
 * SSR-safe screen dimensions
 */
export const getScreenDimensions = () => {
  if (isBrowser && window.screen) {
    return {
      width: window.screen.width,
      height: window.screen.height
    };
  }
  // Default dimensions for SSR
  return {
    width: 1920,
    height: 1080
  };
};

/**
 * SSR-safe localStorage availability check
 */
export const getStorage = () => {
  if (isBrowser && typeof localStorage !== 'undefined') {
    return localStorage;
  }
  return undefined;
};