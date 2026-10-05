import type { AgentCard } from '@a2a-js/sdk';

/**
 * The Agent Card the platform fetches to discover this agent.
 *
 * The urls must be publicly reachable: the gateway advertises them to clients,
 * and /rpc and /rest are the transport prefixes the agent proxy create form
 * defaults to.
 *
 * pushNotifications is false because the gateway generates a route per
 * advertised capability, and this agent serves no push notification config
 * operations.
 */
export function buildAgentCard(baseUrl: string): AgentCard {
  const base = baseUrl.replace(/\/+$/, '');
  return {
    name: 'Trip Planning Agent',
    description: 'Searches flights and hotels, books them, and plans a day by day itinerary.',
    version: '1.0.0',
    // Each interface carries its own protocolVersion, which is where the
    // gateway reads the A2A version from.
    supportedInterfaces: [
      {
        protocolBinding: 'JSONRPC',
        url: `${base}/rpc`,
        protocolVersion: '1.0',
        tenant: '',
      },
      {
        protocolBinding: 'HTTP+JSON',
        url: `${base}/rest`,
        protocolVersion: '1.0',
        tenant: '',
      },
    ],
    capabilities: {
      streaming: true,
      pushNotifications: false,
      extensions: [],
    },
    defaultInputModes: ['text/plain'],
    defaultOutputModes: ['text/plain'],
    skills: [
      {
        id: 'search-flights',
        name: 'Search flights',
        description: 'Lists flights between two airports with departure times and fares.',
        tags: ['flights', 'search'],
        examples: ['flights LHR CMB'],
        inputModes: ['text/plain'],
        outputModes: ['text/plain'],
        securityRequirements: [],
      },
      {
        id: 'search-hotels',
        name: 'Search hotels',
        description: 'Lists hotels in a city with their rating and nightly rate.',
        tags: ['hotels', 'search'],
        examples: ['hotels Colombo'],
        inputModes: ['text/plain'],
        outputModes: ['text/plain'],
        securityRequirements: [],
      },
      {
        id: 'book',
        name: 'Book',
        description: 'Books a flight or hotel from a search result and returns a reference.',
        tags: ['flights', 'hotels', 'booking'],
        examples: ['book UL504', 'book grand-colombo'],
        inputModes: ['text/plain'],
        outputModes: ['text/plain'],
        securityRequirements: [],
      },
      {
        id: 'itinerary',
        name: 'Plan an itinerary',
        description: 'Builds a day by day plan for a city, streaming one day at a time.',
        tags: ['planning', 'streaming'],
        examples: ['itinerary Colombo 3'],
        inputModes: ['text/plain'],
        outputModes: ['text/plain'],
        securityRequirements: [],
      },
    ],
    provider: undefined,
    securitySchemes: {},
    securityRequirements: [],
    signatures: [],
  };
}
