import { PostMessageTransport } from '@slide-computer/signer-web';
import { BaseSignerAdapter } from '../BaseSignerAdapter';
import { OisyAdapterConfig } from '../../types/AdapterConfigs';
export declare class OisyAdapter extends BaseSignerAdapter<OisyAdapterConfig> {
    protected transport: PostMessageTransport | null;
    constructor(args: any);
    private initializeTransport;
    protected ensureTransportInitialized(): Promise<void>;
    getAccountId(): Promise<string>;
}
