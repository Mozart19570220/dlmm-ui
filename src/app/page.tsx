"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import client from "@/lib/meteoraClient";

export default function HomePage() {
  const { connected, publicKey } = useWallet();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pools, setPools] = useState<any[]>([]);

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const allPools = await client.getAllPools();
        setPools(allPools);
        console.log("Fetched pools:", allPools);
      } catch (error) {
        console.error("Error fetching pools:", error);
      }
    };

    if (connected) {
      fetchPools();
    }
  }, [connected]);

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
                  <li key={i}>Pool ID: {pool.poolId.toString()}</li>
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