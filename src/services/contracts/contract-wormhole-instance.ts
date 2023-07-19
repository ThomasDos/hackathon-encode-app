import abiBridgeWormhole from '@/constant/abi-bridge-wormhole'
import WORMHOLE_CONTRACT_ADDRESSES from '@/constant/wormhole-contract-addresses'
import { ethers } from 'ethers'
import { Chain } from 'wagmi'

function contractWormholeInstance(chain: Chain) {
  const bridgeAddress =
    WORMHOLE_CONTRACT_ADDRESSES[chain.network as keyof typeof WORMHOLE_CONTRACT_ADDRESSES].bridgeAddress
  const contract = new ethers.Contract(bridgeAddress, abiBridgeWormhole)

  return contract
}

export default contractWormholeInstance
