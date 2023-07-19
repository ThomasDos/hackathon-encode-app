import WORMHOLE_CONTRACT_ADDRESSES from '@/constant/wormhole-contract-addresses'
import {
  createWrappedOnEth,
  getEmitterAddressEth,
  getSignedVAAWithRetry,
  parseSequenceFromLogEth
} from '@certusone/wormhole-sdk'
import { Chain } from 'wagmi'
import contractWormholeInstance from '../contracts/contract-wormhole-instance'
import getRpcProvider from '../custom-ethers-provider'

const requestAttestWormhole = async (chain: Chain, tx: string, targetChain: string) => {
  try {
    const wormholeContract = contractWormholeInstance(chain)
    const tx = await wormholeContract.attestToken()

    const provider = getRpcProvider(chain.rpcUrls.default.http[0])

    const rc = await provider.getTransactionReceipt(tx)
    console.log('rc > ', rc.logs)

    const seq = parseSequenceFromLogEth(rc, '0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78')
    //SEPOLIA -> Transfer -> get the VAA with receipt from the transfer > switch on goerli -> redeem with the VAA
    const emitterAddress = getEmitterAddressEth('0xDB5492265f6038831E89f495670FF909aDe94bd9')
    const chainId = WORMHOLE_CONTRACT_ADDRESSES[chain.network as keyof typeof WORMHOLE_CONTRACT_ADDRESSES].chainId

    const attestationVaa = await getSignedVAAWithRetry(
      ['https://wormhole-v2-testnet-api.certus.one'],
      chainId as any,
      emitterAddress,
      seq.toString(),
      {},
      1000,
      5
    )

    //@ts-ignore
    const providerBrowser = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const signer = providerBrowser.getSigner()
    const targetChainBridgeAddress =
      WORMHOLE_CONTRACT_ADDRESSES[targetChain as keyof typeof WORMHOLE_CONTRACT_ADDRESSES].bridgeAddress
    await createWrappedOnEth(targetChainBridgeAddress, signer, attestationVaa.vaaBytes)
    console.log('Successfully attested to Wormhole')
  } catch (error) {
    console.log('error: ', error)
  }
}

export default requestAttestWormhole
