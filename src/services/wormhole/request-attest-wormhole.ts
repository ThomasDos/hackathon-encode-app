import { getEmitterAddressEth, getSignedVAAWithRetry } from '@certusone/wormhole-sdk'
import { Chain } from 'wagmi'

const requestAttestWormhole = async (chain: Chain, targetChain: string, tokenAddress: string) => {
  try {
    // const wormholeContract = contractWormholeInstance(chain)
    // console.log('wormholeContract:', wormholeContract)
    // const tx = await wormholeContract.attestToken(tokenAddress, 0)
    // console.log('tx:', tx)
    // const rc = await tx.wait()

    // console.log('rc > ', rc.logs)

    // const provider = getRpcProvider(chain.rpcUrls.default.http[0])

    // const receipt = await provider.getTransactionReceipt(
    //   '0x30d9c6e24d0df20c28b90db8fe7b9ae56c2c4ccbc772e6c33f8115f7a31fcf4c'
    // )

    // const rc = mockReceiptAttestTokenSepolia
    // console.log('rc:', rc)

    // const seq = parseSequenceFromLogEth(rc as any, '0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78')
    // console.log('seq:', seq)
    //335
    const emitterAddress = getEmitterAddressEth('0xDB5492265f6038831E89f495670FF909aDe94bd9')
    // const chainId = WORMHOLE_CONTRACT_ADDRESSES[chain.network as keyof typeof WORMHOLE_CONTRACT_ADDRESSES].chainId
    // console.log('chainId:', chainId)
    // console.log('emitterAddress:', emitterAddress)

    const attestationVaa = await getSignedVAAWithRetry(
      ['https://wormhole-v2-testnet-api.certus.one'],
      10002,
      emitterAddress,
      '335',
      {},
      1000,
      5
    )

    console.log('<<<<<<<<<<<<<attestationVaa>>>>>>>>>>', attestationVaa)

    return attestationVaa
  } catch (error) {
    console.log('error: ', error)
  }
}

export default requestAttestWormhole
