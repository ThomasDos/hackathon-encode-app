import { getDefaultConfig } from 'connectkit'
import { createConfig } from 'wagmi'
import { arbitrumGoerli, avalancheFuji, bscTestnet, mainnet, sepolia } from 'wagmi/chains'

export const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_API_KEY, // or infuraId
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    chains: [sepolia, mainnet, arbitrumGoerli, avalancheFuji, bscTestnet],

    // Required
    appName: 'Demeter',
    // Optional
    appDescription: '',
    appUrl: 'https://family.co', // your app's url
    appIcon: 'https://family.co/logo.png' // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
)
