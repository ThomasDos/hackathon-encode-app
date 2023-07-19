'use client'

import useApproveToken from '@/hooks/use-approve-token'
import useTransferTokens from '@/hooks/use-transfer-tokens'
import WormholeBridge, { WormholeConnectConfig } from '@wormhole-foundation/wormhole-connect'
import { useNetwork } from 'wagmi'

export default function Home() {
  const { chain } = useNetwork()

  const { writeAsync, data, isLoading: isLoadingTransferTokens, isSuccess } = useTransferTokens()
  const {
    writeAsync: writeAsyncApproveToken,
    data: dataApproveToken,
    isSuccess: isSuccessApproveToken,
    isLoading: isLoadingAproveToken
  } = useApproveToken()
  console.log('dataApproveToken:', dataApproveToken)
  console.log('isSuccess:', isSuccess)
  console.log('isSuccess:', isSuccess)
  console.log('data:', data)

  const config: WormholeConnectConfig = {
    env: 'mainnet',
    networks: ['ethereum', 'polygon', 'solana'],
    tokens: ['ETH', 'WETH', 'MATIC', 'WMATIC'],
    rpc: {
      ethereum: 'https://rpc.ankr.com/eth',
      solana: 'https://rpc.ankr.com/solana'
    }
  }

  const handleTransferTokens = async () => {
    if (!writeAsync || !writeAsyncApproveToken) return
    // await writeAsyncApproveToken()
    // console.log('End', isSuccessApproveToken)
    // if (!isSuccessApproveToken) return

    const tx = await writeAsync()
    console.log('tx', tx)
  }

  return (
    <main>
      <button onClick={handleTransferTokens} disabled={isLoadingTransferTokens || isLoadingAproveToken}>
        TRANSFER TOKEN
      </button>
      <WormholeBridge config={config} />
    </main>
  )
}
