import { Connection } from '@solana/web3.js';
import { createDLMMClient } from '@meteora-ag/dlmm';

const RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com';
const connection = new Connection(RPC_ENDPOINT);

// Create the DLMM client using the factory function
const client = await createDLMMClient(connection);

export default client;