import { EH_ADDRESS } from '@/constant/token-ERC20-sepolia-address'
import finaliseAttestWormholeFromTargetChain from '@/services/wormhole/finalise-attest-wormhole-from-target-chain'
import requestAttestWormhole from '@/services/wormhole/request-attest-wormhole'
import useTransactionsStore from '@/store/transactions.store'
import toast from 'react-hot-toast'
import { Chain } from 'wagmi'

function useAttestToken(chain: Chain) {
  const receipt = useTransactionsStore((state) => state.receipt)
  const setReceipt = useTransactionsStore((state) => state.setReceipt)
  const vaa = useTransactionsStore((state) => state.vaa)
  const setVaa = useTransactionsStore((state) => state.setVaa)
  const sequence = useTransactionsStore((state) => state.sequence)
  const setSequence = useTransactionsStore((state) => state.setSequence)

  async function attestToken() {
    try {
      if (!vaa) {
        await requestAttestWormhole(chain as Chain, EH_ADDRESS, receipt, setReceipt, setVaa, setSequence)
        toast.success('Token attestation completed')
      } else {
        await finaliseAttestWormholeFromTargetChain('goerli', vaa)
        toast.success('Wrapped Token sucessfully created')
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return { attestToken }
}
export default useAttestToken

// token(address)
// nonce(uint256)
