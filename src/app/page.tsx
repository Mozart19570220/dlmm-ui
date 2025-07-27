'use client';

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { dlmmClient } from "@/lib/meteoraClient";

interface Pool {
  mintA: string;
  mintB: string;
  poolAddress: string;
}

export default function HomePage() {
  const { connected, publicKey } = useWallet();
  const [pools, setPools] = useState<Pool[]>([]);

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const result = await dlmmClient.getAllPools();
        const simplified = result.map((pool) => ({
          mintA: pool.tokenAMint.toBase58(),
          mintB: pool.tokenBMint.toBase58(),
          poolAddress: pool.address.toBase58(),
        }));
        setPools(simplified);
      } catch (error) {
        console.error("Failed to fetch pools:", error);
      }
    };

    fetchPools();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-6">DLMM Pools Viewer</h1>

      <WalletMultiButton />

      {connected && publicKey && (
        <p className="text-green-600 mt-4">
          ✅ Connected: {publicKey.toBase58()}
        </p>
      )}

      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Pools:</h2>
        {pools.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {pools.map((pool) => (
              <li key={pool.poolAddress} className="border p-4 rounded">
                <p><strong>Mint A:</strong> {pool.mintA}</p>
                <p><strong>Mint B:</strong> {pool.mintB}</p>
                <p><strong>Address:</strong> {pool.poolAddress}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}