"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import createMeteoraClient from "@/lib/meteoraClient";
import { PublicKey } from "@solana/web3.js";

export default function HomePage() {
  const { connected, publicKey } = useWallet();
  const [pools, setPools] = useState<any[]>([]);

  useEffect(() => {
    const fetchPools = async () => {
      try {
        if (!publicKey) return;
        // example: you may fetch pool addresses from your own API,
        // or hardcode a specific DLMM pool address:
        const poolAddress = new PublicKey("ARwi1S4DaiTG5DX7S4M4ZsrXqpMD1MrTmbu9ue2tpmEq");
        const client = await createMeteoraClient(poolAddress);
        const activeBin = await client.getActiveBin();
        console.log("activeBin", activeBin);
        setPools([{ poolId: poolAddress, activeBin }]);
      } catch (error) {
        console.error("Error fetching pools:", error);
      }
    };

    if (connected) {
      fetchPools();
    }
  }, [connected, publicKey]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-6">DLMM UI</h1>
      <WalletMultiButton />

      {connected && (
        <div className="mt-6 text-green-600">
          ✅ Connected: {publicKey?.toBase58()}
          <div className="mt-4 text-sm text-white">
            {pools.length > 0 ? (
              <ul>
                {pools.map((pool, i) => (
                  <li key={i}>
                    Pool ID: {pool.poolId.toBase58()} · Active Bin: {pool.activeBin.binId}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Fetching pools...</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}