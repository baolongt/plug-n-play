import { HttpAgent, ActorSubclass, Identity } from '@dfinity/agent';
export interface AgentConfig {
    host?: string;
    identity?: Identity;
    verifyQuerySignatures?: boolean;
    fetchRootKey?: boolean;
}
/**
 * Creates an HTTP agent with standard configuration
 */
export declare function createAgent(config: AgentConfig): HttpAgent;
/**
 * Creates an actor with an agent
 */
export declare function createActorWithAgent<T>(agent: HttpAgent, canisterId: string, idlFactory: any): ActorSubclass<T>;
