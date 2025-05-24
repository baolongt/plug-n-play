import { HttpAgent, Actor, ActorSubclass, Identity } from "@dfinity/agent";
import { AnonymousIdentity } from "@dfinity/agent";

export interface AgentConfig {
  host?: string;
  identity?: Identity;
  verifyQuerySignatures?: boolean;
  fetchRootKey?: boolean;
}

/**
 * Creates an HTTP agent with standard configuration
 */
export function createAgent(config: AgentConfig): HttpAgent {
  const agent = HttpAgent.createSync({
    host: config.host,
    identity: config.identity || new AnonymousIdentity(),
    verifyQuerySignatures: config.verifyQuerySignatures,
  });

  if (config.fetchRootKey) {
    agent.fetchRootKey().catch(e => {
      console.warn("Failed to fetch root key:", e);
    });
  }

  return agent;
}

/**
 * Creates an actor with an agent
 */
export function createActorWithAgent<T>(
  agent: HttpAgent,
  canisterId: string,
  idlFactory: any
): ActorSubclass<T> {
  return Actor.createActor<T>(idlFactory, {
    agent,
    canisterId,
  });
} 