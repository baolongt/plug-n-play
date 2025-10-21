import { Signer } from "@slide-computer/signer";
import { SignerAgent } from "@slide-computer/signer-agent";

export interface AdapterConstructor {
  new (config: any): AdapterInterface;
}

export interface AdapterConfig {
  id: string;
  enabled: boolean;
  logo: string;
  walletName: string;
  chain: "ICP" | "SOL" | "ETH" | "MULTI";
  website?: string;
  adapter: AdapterConstructor;
  config: {
    [key: string]: any;
  };
}

export interface AdapterConstructorArgs {
  adapter: AdapterConfig;
  config: any;
}

export interface GetActorOptions {
  canisterId: string;
  idl: any;
  anon?: boolean;
  requiresSigning?: boolean;
}

export enum AdapterStatus {
  INIT = "INIT",
  READY = "READY",
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
  DISCONNECTING = "DISCONNECTING",
  DISCONNECTED = "DISCONNECTED",
  ERROR = "ERROR",
}

export enum AdapterChain {
  ICP = "icp",
  SOL = "sol",
  ETH = "eth",
}

export interface AdapterAddresses {
  [key: string]: string | any;
}

export interface AdapterInterface {
  openChannel(): Promise<void>;
  isConnected(): Promise<boolean>;
  connect(): Promise<any>;
  disconnect(): Promise<void>;
  getPrincipal(): Promise<string>;
  getAccountId(): Promise<string>;
  getAddresses(): Promise<AdapterAddresses>;
  createActor<T>(
    canisterId: string,
    idl: any,
    options?: { requiresSigning?: boolean }
  ): any;
  undelegatedActor?<T>(
    canisterId: string,
    idlFactory: any,
    options?: { requiresSigning?: boolean }
  ): any;

  /**
   * Get current Signer instance, only exist if signer implement BaseSignerAdapter
   */
  getSigner(): Signer | null;

  /**
   * Get current SignerAgent instance, only exist if signer implement BaseSignerAdapter
   */
  getSignerAgent(): SignerAgent<Signer> | null;
}

export interface AdapterWallet {
  adapter: AdapterConstructor;
}
