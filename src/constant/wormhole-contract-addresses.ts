import { Chain } from 'wagmi'

type WormholeContractAddresses = Record<keyof Chain, Record<string, `0x${string}`>>
const WORMHOLE_CONTRACT_ADDRESSES: WormholeContractAddresses = {
  mainnet: { bridgeAddress: '0x3ee18B2214AFF97000D974cf647E7C347E8fa585' },
  sepolia: { bridgeAddress: '0xDB5492265f6038831E89f495670FF909aDe94bd9' }
}

export default WORMHOLE_CONTRACT_ADDRESSES
