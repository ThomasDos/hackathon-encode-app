interface WormholeContractAddress {
  bridgeAddress: `0x${string}`
  chainId: number
}

type WormholeContractAddresses = Record<string, WormholeContractAddress>

const WORMHOLE_CONTRACT_ADDRESSES: WormholeContractAddresses = {
  mainnet: { bridgeAddress: '0x3ee18B2214AFF97000D974cf647E7C347E8fa585', chainId: 1 },
  sepolia: { bridgeAddress: '0xDB5492265f6038831E89f495670FF909aDe94bd9', chainId: 10002 },
  goerli: { bridgeAddress: '0xF890982f9310df57d00f659cf4fd87e65adEd8d7', chainId: 2 }
}

export default WORMHOLE_CONTRACT_ADDRESSES
