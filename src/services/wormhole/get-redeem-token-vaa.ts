import { getEmitterAddressEth, getSignedVAAWithRetry, parseSequenceFromLogEth } from '@certusone/wormhole-sdk'
import toast from 'react-hot-toast'

const getRedeemTokenVaa = async (
  receipt: any,
  setVaa: (receipt: any) => void,
  setSequence: (sequence: string) => void
) => {
  try {
    if (!receipt) return null

    const seq = parseSequenceFromLogEth(receipt as any, '0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78')
    setSequence(seq)
    const emitterAddress = getEmitterAddressEth('0xDB5492265f6038831E89f495670FF909aDe94bd9')

    const attestationVaa = await getSignedVAAWithRetry(
      ['https://wormhole-v2-testnet-api.certus.one'],
      10002,
      emitterAddress,
      '336',
      {},
      1000,
      5
    )

    setVaa(attestationVaa)
    toast.success('VAA retrieved successfully')
    return attestationVaa
  } catch (error) {
    console.log('error: ', error)
  }
}

export default getRedeemTokenVaa
