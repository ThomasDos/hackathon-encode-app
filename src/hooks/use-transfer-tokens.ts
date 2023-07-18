import abiBridgeWormhole from '@/constant/abi-bridge-wormhole'
import WORMHOLE_CONTRACT_ADDRESSES from '@/constant/wormhole-contract-addresses'
import { toBeHex } from 'ethers'
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'

function useTransferToken() {
  const targetChainId = 5 // Polygon mainnet
  const tokenAddress = '0x7a9673cb6faeb696ac7b76f622c7933256e324d2'

  const targetAddress = toBeHex('0x6D891B23C4d4Bd02270F9cb9699A42bF0eaB40c4', 32)
  console.log('targetAddress:', targetAddress)
  const { chain } = useNetwork()
  console.log('chain:', chain)
  console.log('WORMHOLE_CONTRACT_ADDRESSES', WORMHOLE_CONTRACT_ADDRESSES)

  const chainEnum = WORMHOLE_CONTRACT_ADDRESSES[chain?.network as keyof typeof WORMHOLE_CONTRACT_ADDRESSES]
  console.log('bridgeAddress:', chainEnum)
  const { config } = usePrepareContractWrite({
    address: chainEnum?.bridgeAddress ?? '',
    abi: abiBridgeWormhole,
    functionName: 'transferTokens',
    args: [tokenAddress, 10000, targetChainId, targetAddress, 250000, 0]
  })
  const { data, isLoading, isSuccess, write, writeAsync } = useContractWrite(config)

  return { data, isLoading, isSuccess, writeAsync }
}
export default useTransferToken

// payableAmount(ether)
// token(address)
// amount(uint256)
// recipientChain(uint16)
// recipient(bytes32)
// arbiterFee(uint256)
// nonce(uint32)
