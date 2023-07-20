import { getEmitterAddressEth, getSignedVAAWithRetry, parseSequenceFromLogEth } from '@certusone/wormhole-sdk'
import toast from 'react-hot-toast'
import { Chain } from 'wagmi'
import contractWormholeInstance from '../contracts/contract-wormhole-instance'

const requestAttestWormhole = async (
  chain: Chain,
  tokenAddress: string,
  receipt: any,
  setReceipt: (receipt: any) => void,
  setVaa: (vaa: any) => void,
  setSequence: (sequence: string) => void,
  vaa: any,
  sequence: string
) => {
  try {
    let receiptTemp = receipt
    if (!receiptTemp) {
      const wormholeContract = contractWormholeInstance(chain)
      const tx = await wormholeContract.attestToken(tokenAddress, 0)
      receiptTemp = await tx.wait()
      setReceipt(receiptTemp)
      toast.success('Token attestation started, please wait for the transaction to be mined. (approx. 20min)')
    }

    const seq = parseSequenceFromLogEth(receiptTemp as any, '0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78')
    setSequence(seq)
    //335
    const emitterAddress = getEmitterAddressEth('0xDB5492265f6038831E89f495670FF909aDe94bd9')

    const attestationVaa = await getSignedVAAWithRetry(
      ['https://wormhole-v2-testnet-api.certus.one'],
      10002,
      emitterAddress,
      seq,
      {},
      1000,
      5
    )

    setVaa(attestationVaa)
    toast.success('VAA retrieved successfully')
    return attestationVaa
  } catch (error) {
    console.log('error: ', error)
    toast.error('requested VAA not found in store')
  }
}

export default requestAttestWormhole
