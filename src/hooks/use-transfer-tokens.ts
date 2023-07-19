import abiBridgeWormhole from '@/constant/abi-bridge-wormhole'
import { EH_ADDRESS } from '@/constant/token-ERC20-sepolia-address'
import WORMHOLE_CONTRACT_ADDRESSES from '@/constant/wormhole-contract-addresses'
import { utils } from 'ethers'
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'

function useTransferToken(amount: number) {
  const targetChainId = 2 // Goerli

  const targetAddress = utils.hexZeroPad('0xcCE64F20d934f320137F84A1Adbfa8E53AAAaa4C', 32)
  const { chain } = useNetwork()

  const chainEnum = WORMHOLE_CONTRACT_ADDRESSES[chain?.network as keyof typeof WORMHOLE_CONTRACT_ADDRESSES]
  const { config } = usePrepareContractWrite({
    address: chainEnum?.bridgeAddress ?? '',
    abi: abiBridgeWormhole,
    functionName: 'transferTokens',
    args: [EH_ADDRESS, amount * 10 ** 18, targetChainId, targetAddress, 10000000, 0]
  })
  const { data, isLoading, isSuccess, write, writeAsync } = useContractWrite(config)

  return { data, isLoading, isSuccess, writeAsync, write }
}
export default useTransferToken

// payableAmount(ether)
// token(address)
// amount(uint256)
// recipientChain(uint16)
// recipient(bytes32)
// arbiterFee(uint256)
// nonce(uint32)
