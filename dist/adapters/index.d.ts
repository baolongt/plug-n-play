import { Adapter } from '../types';
import { IIAdapter } from './ic';
import { UnifiedSignerAdapter } from './ic/UnifiedSignerAdapter';
export declare const Adapters: Record<string, Adapter.Config>;
export { IIAdapter, UnifiedSignerAdapter };
export { BaseAdapter } from './BaseAdapter';
export { BaseDelegationAdapter } from './BaseDelegationAdapter';
export { BaseSignerAdapter } from './BaseSignerAdapter';
