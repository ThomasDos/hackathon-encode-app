import { createWrappedOnEth } from '@certusone/wormhole-sdk'
import { ethers } from 'ethers'

async function finaliseAttestWormholeFromTargetChain(targetChain: string, attestationVaa: any) {
  //@ts-ignore
  const providerBrowser = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const signer = providerBrowser.getSigner()
  // const targetChainBridgeAddress =
  //   WORMHOLE_CONTRACT_ADDRESSES[targetChain as keyof typeof WORMHOLE_CONTRACT_ADDRESSES].bridgeAddress
  await createWrappedOnEth('0xF890982f9310df57d00f659cf4fd87e65adEd8d7', signer, attestationVaa.vaaBytes)
  console.log('Successfully attested to Wormhole')
}

export default finaliseAttestWormholeFromTargetChain
