import { Connection, PublicKey } from "@solana/web3.js";
import DLMM from "@meteora-ag/dlmm";

const RPC_ENDPOINT = process.env.NEXT_PUBLIC_RPC_URL || "https://api.mainnet-beta.solana.com";
const connection = new Connection(RPC_ENDPOINT, "confirmed");

// Optional: set up a static pool or dynamic retrieval
export default async function createMeteoraClient(poolAddress: string | PublicKey) {
  const publicKey = typeof poolAddress === "string" ? new PublicKey(poolAddress) : poolAddress;
  const dlmmPool = await DLMM.create(connection, publicKey);
  return dlmmPool;
}