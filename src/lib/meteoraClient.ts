import { Connection } from "@solana/web3.js";
import { createDLMMClient } from "@meteora-ag/dlmm";

const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";
const connection = new Connection(RPC_ENDPOINT);
const client = createDLMMClient(connection);

export default client;