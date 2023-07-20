import finaliseRedeemWormholeFromTargetChain from '@/services/wormhole/finalise-redeem-wormhole-from-target-chain'
import getRedeemTokenVaa from '@/services/wormhole/get-redeem-token-vaa'
import useTransactionsStore from '@/store/transactions.store'
import toast from 'react-hot-toast'

function useRedeemToken(transactionHash: string) {
  const receipt = useTransactionsStore((state) => state.receipt)
  const vaa = useTransactionsStore((state) => state.vaa)
  const setVaa = useTransactionsStore((state) => state.setVaa)
  const setSequence = useTransactionsStore((state) => state.setSequence)

  async function redeemToken() {
    try {
      if (!vaa) {
        await getRedeemTokenVaa(receipt, setVaa, setSequence)
      } else {
        await finaliseRedeemWormholeFromTargetChain('goerli', vaa)
        toast.success('Token redeemed')
      }
    } catch (error) {
      console.log('error: ', error)
      toast.error('something went wrong with redeeming token')
    }
  }

  return { redeemToken }
}
export default useRedeemToken
