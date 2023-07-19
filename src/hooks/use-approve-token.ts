import abiERC20Token from '@/constant/abi-erc20-token'
import { EH_ADDRESS } from '@/constant/token-ERC20-sepolia-address'
import WORMHOLE_CONTRACT_ADDRESSES from '@/constant/wormhole-contract-addresses'
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'

function useApproveTokens() {
  const { chain } = useNetwork()

  const chainEnum = WORMHOLE_CONTRACT_ADDRESSES[chain?.network as keyof typeof WORMHOLE_CONTRACT_ADDRESSES]
  const { config } = usePrepareContractWrite({
    address: EH_ADDRESS,
    abi: abiERC20Token,
    functionName: 'approve',
    args: [chainEnum?.bridgeAddress, 10 * 10 ** 18]
  })
  const { data, isLoading, isSuccess, writeAsync, write } = useContractWrite(config)

  return { data, isLoading, isSuccess, writeAsync, write }
}
export default useApproveTokens
