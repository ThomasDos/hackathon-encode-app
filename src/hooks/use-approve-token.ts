import abiERC20Token from '@/constant/abi-erc20-token'
import WORMHOLE_CONTRACT_ADDRESSES from '@/constant/wormhole-contract-addresses'
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'

function useApproveTokens() {
  const tokenAddress = '0x7a9673cb6faeb696ac7b76f622c7933256e324d2'

  const { chain } = useNetwork()

  const chainEnum = WORMHOLE_CONTRACT_ADDRESSES[chain?.network as keyof typeof WORMHOLE_CONTRACT_ADDRESSES]
  console.log('chainEnum: APPROVE TOKEN', chainEnum)
  const { config } = usePrepareContractWrite({
    address: tokenAddress,
    abi: abiERC20Token,
    functionName: 'approve',
    args: [chainEnum?.bridgeAddress, 10 * 10 ** 16]
  })
  const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config)

  return { data, isLoading, isSuccess, writeAsync }
}
export default useApproveTokens
