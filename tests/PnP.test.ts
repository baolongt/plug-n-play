import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { IIAdapter } from '../src/adapters/ic/IIAdapter';
import { AuthClient } from "@dfinity/auth-client";
import { vi } from 'vitest';
import { type Wallet } from '../src/types'; // Corrected path for types

// Define a basic mock config
const mockConfig: PnpConfig = {
  hostUrl: "http://localhost:4943",
  verifyQuerySignatures: false,
  fetchRootKey: false,
  // Add other necessary fields if required by BaseIcAdapter or IIAdapter
};

describe('IIAdapter', () => {
  let adapter: IIAdapter;

  beforeEach(() => {
    // Mock AuthClient.create
    vi.spyOn(AuthClient, 'create').mockResolvedValue({
      isAuthenticated: () => Promise.resolve(false),
      login: () => {},
      logout: () => Promise.resolve(),
      getIdentity: () => ({
        getPrincipal: () => ({ toString: () => 'test-principal' })
      }),
      idleManager: {
        registerCallback: () => {}
      }
    } as any);
    
    adapter = new IIAdapter(mockConfig);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize the auth client in constructor', async () => {
    // AuthClient.create should be called immediately in constructor
    // Wait a tick for the async initialization to start
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(AuthClient.create).toHaveBeenCalled();
  });

  it('should not have agent initially', () => {
    expect(adapter['agent']).toBeNull();
  });

  it('should wait for AuthClient initialization when connecting', async () => {
    // Clear previous mocks
    vi.clearAllMocks();
    
    // Mock a delayed AuthClient creation
    const mockAuthClient = {
      isAuthenticated: vi.fn().mockResolvedValue(false),
      login: vi.fn((options: any) => {
        // Simulate login error
        setTimeout(() => options.onError('Test error'), 10);
      }),
      logout: vi.fn().mockResolvedValue(undefined),
      getIdentity: vi.fn().mockReturnValue(null),
      idleManager: { registerCallback: vi.fn() }
    };
    
    vi.spyOn(AuthClient, 'create').mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockAuthClient as any), 100))
    );
    
    const newAdapter = new IIAdapter(mockConfig);
    
    // Give time for constructor initialization to start
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // Connect should wait for AuthClient to be ready then fail with test error
    await expect(newAdapter.connect()).rejects.toThrow('Test error');
  });

  it('should connect successfully when AuthClient is ready', async () => {
    // Create a more complete mock of AuthClient
    const mockPrincipal = {
      isAnonymous: () => false,
      toText: () => 'test-principal-123',
      toString: () => 'test-principal-123',
      toUint8Array: () => new Uint8Array([1, 2, 3])
    };
    
    const mockIdentity = {
      getPrincipal: () => mockPrincipal
    };
    
    const mockAuthClient = {
      isAuthenticated: vi.fn().mockResolvedValue(false),
      login: vi.fn((options: any) => {
        // Immediately call onSuccess callback
        Promise.resolve().then(() => options.onSuccess());
      }),
      logout: vi.fn().mockResolvedValue(undefined),
      getIdentity: vi.fn().mockReturnValue(mockIdentity),
      idleManager: {
        registerCallback: vi.fn()
      }
    };
    
    // Override the create mock to return our more complete mock
    vi.spyOn(AuthClient, 'create').mockResolvedValue(mockAuthClient as any);
    
    // Create a new adapter with the mocked AuthClient
    const testAdapter = new IIAdapter(mockConfig);
    
    // Wait for AuthClient to be initialized from constructor
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Now connect should work
    const connectPromise = testAdapter.connect();
    
    // Give the async operations time to complete
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const account = await connectPromise;
    expect(account).toBeDefined();
    expect(account.owner).toBe('test-principal-123');
  });
});
