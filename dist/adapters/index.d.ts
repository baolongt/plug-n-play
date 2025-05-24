import { Adapter } from '../types';
import { SiwsAdapter } from './ic/SiwsAdapter';
import { IIAdapter, PlugAdapter, NFIDAdapter, OisyAdapter } from './ic';
export declare const Adapters: Record<string, Adapter.Config>;
export { SiwsAdapter, IIAdapter, PlugAdapter, NFIDAdapter, OisyAdapter };
export { BaseAdapter } from './BaseAdapter';
export { BaseDelegationAdapter } from './BaseDelegationAdapter';
export { BaseSignerAdapter } from './BaseSignerAdapter';
