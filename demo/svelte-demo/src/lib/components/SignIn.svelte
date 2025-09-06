<script lang="ts">
  import {
    availableWallets,
    isConnected,
    principalId,
    connectWallet,
    disconnectWallet,
    lastEvent,
    connectingWalletId,
    error
  } from "../stores/pnp";
  import { balance, fetchBalance } from "../stores/ledger";

  const formatICP = (b: bigint | null): string => {
    if (!b) return "...";
    const s = b.toString().padStart(9, "0");
    const i = s.slice(0, -8) || "0";
    const d = s.slice(-8).replace(/0+$/, "");
    return d ? `${i}.${d}` : i;
  };

  const handleConnect = async (walletId: string) => {
    error.set(null);
    try {
      await connectWallet(walletId);
      await fetchBalance();
    } catch (e) {
      error.set(e.message);
    }
  };
</script>

<div class="container">
  {#if $isConnected}
    <div class="card">
      <div class="status">✅ Connected</div>
      <div class="info">
        <label>Principal ID</label>
        <code>{$principalId}</code>
      </div>
      <div class="info">
        <label>ICP Balance</label>
        <code>{formatICP($balance)} ICP</code>
      </div>
      <div class="note">
        💡 <strong>Tip:</strong> If using Plug wallet with multiple accounts, you can select which account to use during connection.
      </div>
      <button class="btn-disconnect" on:click={disconnectWallet}>
        Disconnect
      </button>
    </div>
  {:else}
    <div class="card">
      <h2>Connect Wallet</h2>
      <div class="wallets">
        {#each $availableWallets as wallet}
          <button
            class="wallet-btn"
            disabled={$connectingWalletId === wallet.id}
            on:click={() => handleConnect(wallet.id)}
          >
            <div class="wallet-info">
              <img src={wallet.logo} alt={wallet.walletName} />
              <span>{wallet.walletName}</span>
              {#if wallet.chain}
                <span class="chain-badge chain-{wallet.chain.toLowerCase()}">{wallet.chain}</span>
              {/if}
            </div>
            {#if $connectingWalletId === wallet.id}
              <span class="spinner">⟳</span>
            {/if}
          </button>
        {/each}
      </div>
      {#if $error}
        <div class="error">{$error}</div>
      {/if}
    </div>
  {/if}

  {#if $lastEvent}
    <div class="card events">
      <h3>Latest Event</h3>
      <pre>{JSON.stringify($lastEvent, null, 2)}</pre>
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 480px;
    margin: 0 auto;
    padding: 2rem;
  }

  .card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }

  h2, h3 {
    margin: 0 0 1rem;
    color: #1a202c;
  }

  .status {
    color: #2f855a;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .info {
    background: #f7fafc;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .info label {
    display: block;
    font-size: 0.875rem;
    color: #4a5568;
    margin-bottom: 0.5rem;
  }

  code {
    font-family: monospace;
    word-break: break-all;
    color: #2d3748;
  }

  .wallets {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .wallet-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .wallet-btn:hover:not(:disabled) {
    background: #edf2f7;
    border-color: #cbd5e0;
  }

  .wallet-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .wallet-btn img {
    width: 24px;
    height: 24px;
  }

  .wallet-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
  }

  .wallet-info span {
    color: #2d3748;
    font-weight: 500;
  }

  .chain-badge {
    margin-left: auto;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .chain-icp {
    background: #e6f3ff;
    color: #0074e4;
  }

  .chain-sol {
    background: #f0e6ff;
    color: #9945ff;
  }

  .chain-eth {
    background: #f5f5ff;
    color: #627eea;
  }

  .spinner {
    animation: spin 1s linear infinite;
    display: inline-block;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .btn-disconnect {
    width: 100%;
    padding: 0.75rem;
    background: #fff5f5;
    border: 1px solid #feb2b2;
    border-radius: 8px;
    color: #c53030;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-disconnect:hover {
    background: #fed7d7;
  }

  .error {
    margin-top: 1rem;
    padding: 0.75rem;
    background: #fff5f5;
    border: 1px solid #feb2b2;
    border-radius: 6px;
    color: #c53030;
    font-size: 0.875rem;
  }

  .events pre {
    background: #f7fafc;
    border-radius: 8px;
    padding: 1rem;
    font-size: 0.75rem;
    max-height: 200px;
    overflow-y: auto;
  }

  .note {
    margin-top: 1rem;
    padding: 0.75rem;
    background: #e6f7ff;
    border: 1px solid #91d5ff;
    border-radius: 6px;
    color: #0050b3;
    font-size: 0.875rem;
  }

  .note strong {
    font-weight: 600;
  }
</style>
