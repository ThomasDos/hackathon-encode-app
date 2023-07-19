import abiBridgeWormhole from '@/constant/abi-bridge-wormhole'
import WORMHOLE_CONTRACT_ADDRESSES from '@/constant/wormhole-contract-addresses'
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'

function useAttestToken() {
  const tokenAddress = '0x7a9673cb6faeb696ac7b76f622c7933256e324d2'

  const { chain } = useNetwork()

  const chainEnum = WORMHOLE_CONTRACT_ADDRESSES[chain?.network as keyof typeof WORMHOLE_CONTRACT_ADDRESSES]
  const { config } = usePrepareContractWrite({
    address: chainEnum?.bridgeAddress ?? '',
    abi: abiBridgeWormhole,
    functionName: 'attestToken',
    args: [tokenAddress, 0]
  })
  const { data, isLoading, isSuccess, write, writeAsync } = useContractWrite(config)

  return { data, isLoading, isSuccess, writeAsync, write }
}
export default useAttestToken

// token(address)
// nonce(uint256)
