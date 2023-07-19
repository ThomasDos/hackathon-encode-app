'use client'
import Navigation from '@/components/layout/navigation'
import { config } from '@/services/connect-kit-client'
import { ConnectKitProvider } from 'connectkit'
import { Inter } from 'next/font/google'
import { WagmiConfig } from 'wagmi'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <html lang='en'>
          <body className={`${inter.className} min-h-screen`}>
            <Navigation />
            {children}
          </body>
        </html>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
