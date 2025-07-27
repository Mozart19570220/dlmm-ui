"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const WalletWrapper = dynamic(() =>
  Promise.resolve(({ children }: { children: React.ReactNode }) => {
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

    return (
      <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    );
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WalletWrapper>{children}</WalletWrapper>;
}