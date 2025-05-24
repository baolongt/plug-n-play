import { BrowserExtensionTransport } from '@slide-computer/signer-extension';
import { BaseSignerAdapter } from '../BaseSignerAdapter';
import { PlugAdapterConfig } from '../../types/AdapterConfigs';
export declare class PlugAdapter extends BaseSignerAdapter<PlugAdapterConfig> {
    protected transport: BrowserExtensionTransport | null;
    constructor(args: any);
    private initializeTransport;
    protected ensureTransportInitialized(): Promise<void>;
}
