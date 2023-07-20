import WORMHOLE_CONTRACT_ADDRESSES from '@/constant/wormhole-contract-addresses'
import { redeemOnEth } from '@certusone/wormhole-sdk'
import { ethers } from 'ethers'
import toast from 'react-hot-toast'

async function finaliseRedeemWormholeFromTargetChain(targetChain: string, attestationVaa: any) {
  //@ts-ignore
  const providerBrowser = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const signer = providerBrowser.getSigner()
  const targetChainBridgeAddress =
    WORMHOLE_CONTRACT_ADDRESSES[targetChain as keyof typeof WORMHOLE_CONTRACT_ADDRESSES].bridgeAddress
  await redeemOnEth('0xF890982f9310df57d00f659cf4fd87e65adEd8d7', signer, attestationVaa.vaaBytes)
  toast.success('Successfully redeemed to Wormhole')
}

export default finaliseRedeemWormholeFromTargetChain
