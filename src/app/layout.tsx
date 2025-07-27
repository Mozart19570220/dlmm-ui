'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] });

// Prevent SSR issues by wrapping wallet logic dynamically
const WalletWrapper = dynamic(() => Promise.resolve(({ children }) => {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        {children}
      </WalletModalProvider>
    </WalletProvider>
  );
}), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletWrapper>
          {children}
        </WalletWrapper>
      </body>
    </html>
  );
}