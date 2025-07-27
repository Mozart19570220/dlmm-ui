'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { createMeteoraClient } from '@/lib/meteoraClient';
import { PublicKey } from '@solana/web3.js';

type PoolDisplay = {
  poolId: PublicKey;
  activeBin: { binId: number };
};

export default function HomePage() {
  const { connected, publicKey } = useWallet();
  const [pools, setPools] = useState<PoolDisplay[]>([]);

  useEffect(() => {
    const fetchPools = async () => {
      try {
        if (!publicKey) return;

        const poolAddress = new PublicKey('ARwi1S4DaiTG5DX7S4M4ZsrXqpMD1MrTmbu9ue2tpmEq');
        const client = await createMeteoraClient(poolAddress);
        const activeBin = await client.getActiveBin();

        setPools([{ poolId: poolAddress, activeBin }]);
      } catch (error) {
        console.error('Error fetching pools:', error);
      }
    };

    if (connected) {
      fetchPools();
    }
  }, [connected, publicKey]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">DLMM Pools</h1>
      <ul className="space-y-2">
        {pools.map((pool) => (
          <li key={pool.poolId.toBase58()} className="p-4 border rounded shadow">
            <p><strong>Pool ID:</strong> {pool.poolId.toBase58()}</p>
            <p><strong>Active Bin:</strong> {pool.activeBin.binId}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}