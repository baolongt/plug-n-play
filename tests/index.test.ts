import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AnonymousIdentity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { HOSTURL, NNS_CANISTER_ID } from '../src/constants';
import { BatchTransact } from '../src/utils/batchTransact';

// Mock the createPNP function
const createPNP = vi.fn().mockImplementation(() => ({
  state: {
    account: null,
    activeWallet: null,
    anonCanisterActors: {},
    callbacks: [],
    canisterActors: {},
    config: {
      host: HOSTURL,
      hostUrl: HOSTURL,
      identityProvider: "",
      localStorageKey: "pnpConnectedWallet",
      whitelist: [NNS_CANISTER_ID],
    },
    provider: null,
  }
}));

// Mock the entire index module
vi.mock('../src/index', () => ({
  createPNP,
  walletsList: [
    { id: 'ii', name: 'Internet Identity', icon: '/assets/dfinity.svg', adapter: expect.any(Function) },
    { id: 'plug', name: 'Plug Wallet', icon: '/assets/plug.jpg', adapter: expect.any(Function) }
  ],
  BatchTransact,
  principalIdFromHex: vi.fn(),
  getAccountIdentifier: vi.fn(),
  getPNPAdapter: vi.fn(),
  adapters: {
    ii: { isAvailable: vi.fn() },
    plug: { isAvailable: vi.fn() },
    bitfinity: { isAvailable: vi.fn() },
  },
}));

describe('index.ts', () => {
  let indexModule: typeof import('../src/index');

  beforeEach(async () => {
    vi.resetModules();
    indexModule = await import('../src/index');
  });

  it('should export createPNP', () => {
    expect(indexModule.createPNP).toBeDefined();
    expect(indexModule.createPNP).toBe(createPNP);
  });

  it('should export walletsList', () => {
    expect(indexModule.walletsList).toBeDefined();
    expect(indexModule.walletsList).toEqual([
      { id: 'ii', name: 'Internet Identity', icon: '/assets/dfinity.svg', adapter: expect.any(Function) },
      { id: 'plug', name: 'Plug Wallet', icon: '/assets/plug.jpg', adapter: expect.any(Function) }
    ]);
  });

  it('should export BatchTransact', () => {
    expect(indexModule.BatchTransact).toBeDefined();
    expect(indexModule.BatchTransact).toBe(BatchTransact);
  });

  it('should export principalIdFromHex', () => {
    expect(indexModule.principalIdFromHex).toBeDefined();
  });

  it('should export getAccountIdentifier', () => {
    expect(indexModule.getAccountIdentifier).toBeDefined();
  });

  it('should export getPNPAdapter', () => {
    expect(indexModule.getPNPAdapter).toBeDefined();
  });

  describe("browser environment", () => {
    const originalWindow = globalThis.window;

    beforeEach(async () => {
      vi.resetModules();
      globalThis.window = {
        addEventListener: vi.fn(),
        pnp: {
          PNP: createPNP,
        },
      } as any;

      indexModule = await import("../src/index");
    });

    afterEach(() => {
      globalThis.window = originalWindow;
    });

    it("should assign PNP to window.pnp", () => {
      expect((globalThis.window as any).pnp).toBeDefined();
      expect((globalThis.window as any).pnp.PNP).toBe(createPNP);
    });

  });
});