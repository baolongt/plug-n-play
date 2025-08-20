import { writable, derived, get } from 'svelte/store';
// Import from source for development
import { PNP, ConfigBuilder } from '../../../../../src';
// Import actual extensions from packages
import { SolanaExtension } from '../../../../../packages/solana/src/extensions';
import { EthereumExtension } from '../../../../../packages/ethereum/src/extensions';

// Stores
export const pnpInstance = writable<PNP | null>(null);
export const isConnected = writable(false);
export const principalId = writable<string | null>(null);
export const lastEvent = writable<any>(null);
export const connectingWalletId = writable<string | null>(null);
export const error = writable<string | null>(null);
export const availableWallets = derived(pnpInstance, $p => $p?.getEnabledWallets() || []);

// Initialize PNP
const initPNP = () => {
    const pnp = new PNP(
        ConfigBuilder.create()
            .withEnvironment('ic')
            .withDelegation({
                timeout: BigInt(24 * 60 * 60 * 1000 * 1000 * 1000),
                targets: []
            })
            .withProviders({
                siws: 'guktk-fqaaa-aaaao-a4goa-cai',
                siwe: 'r4zqx-aiaaa-aaaar-qbuia-cai',
            })
            .withExtensions(SolanaExtension, EthereumExtension)
            .withIcAdapters()
            // Solana wallets
            .withAdapter('phantomSiws', { enabled: true })
            .withAdapter('solflareSiws', { enabled: true })
            .withAdapter('walletconnectSiws', {
                enabled: true,
                projectId: 'YOUR_PROJECT_ID',
                appName: 'PNP Demo',
                appDescription: 'Demo using WalletConnect SIWS',
                appUrl: 'https://example.com',
                appIcons: ['https://example.com/icon.png']
            })
            // Ethereum wallets
            .withAdapter('metamaskSiwe', { enabled: true })
            .build()
    );

    pnpInstance.set(pnp);
    
    // Auto-reconnect IC wallets (not Solana/Ethereum wallets)
    const stored = localStorage.getItem('pnpConnectedWallet');
    if (stored && !stored.includes('Siws') && !stored.includes('Siwe')) {
        pnp.connect(stored).then(account => {
            if (account) {
                isConnected.set(true);
                principalId.set(account.owner);
                lastEvent.set({ type: 'reconnected', walletId: stored });
            }
        }).catch(() => localStorage.removeItem('pnpConnectedWallet'));
    }
    return pnp;
};

// Helper to reset state
const resetState = () => {
    isConnected.set(false);
    principalId.set(null);
    connectingWalletId.set(null);
};

// Connect wallet
export const connectWallet = async (walletId: string) => {
    const pnp = get(pnpInstance);
    if (!pnp) throw new Error('PNP not initialized');
    
    resetState();
    connectingWalletId.set(walletId);
    lastEvent.set({ type: 'statusChange', status: 'CONNECTING', walletId });

    try {
        const account = await pnp.connect(walletId);
        if (!account) throw new Error("Connection cancelled");
        
        isConnected.set(true);
        principalId.set(account.owner);
        connectingWalletId.set(null);
        lastEvent.set({ type: 'connected', walletId, principal: account.owner });
        localStorage.setItem('pnpConnectedWallet', walletId);
        
        return account;
    } catch (err) {
        resetState();
        lastEvent.set({ type: 'error', message: err.message });
        throw err;
    }
};

// Disconnect wallet
export const disconnectWallet = async () => {
    const pnp = get(pnpInstance);
    if (!pnp) return;

    try {
        await pnp.disconnect();
        resetState();
        localStorage.removeItem('pnpConnectedWallet');
        lastEvent.set({ type: 'disconnected' });
    } catch (err) {
        resetState();
        throw err;
    }
};

// Initialize on load
initPNP();