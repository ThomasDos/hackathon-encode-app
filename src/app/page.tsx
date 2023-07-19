'use client'

import useApproveToken from '@/hooks/use-approve-token'
import useTransferTokens from '@/hooks/use-transfer-tokens'
import { WormholeConnectConfig } from '@wormhole-foundation/wormhole-connect'

export default function Home() {
  const { writeAsync, data, isLoading: isLoadingTransferTokens, isSuccess } = useTransferTokens()
  const {
    writeAsync: writeAsyncApproveToken,
    data: dataApproveToken,
    isSuccess: isSuccessApproveToken,
    isLoading: isLoadingAproveToken
  } = useApproveToken()

  const config: WormholeConnectConfig = {
    env: 'testnet',
    networks: ['ethereum', 'polygon', 'solana'],
    tokens: ['ETH', 'WETH', 'MATIC', 'WMATIC']
  }

  const handleApproveToken = async () => {
    if (!writeAsyncApproveToken) return

    const tx = await writeAsyncApproveToken()
    console.log('tx', tx)
  }

  const handleTransferTokens = async () => {
    if (!writeAsync) return
    const tx = await writeAsync()
    console.log('tx', tx)
  }

  const transactionIsLoading = isLoadingTransferTokens || isLoadingAproveToken

  return (
    <main>
      <div className='flex p-10 gap-6 justify-center'>
        <button onClick={handleApproveToken} disabled={transactionIsLoading}>
          APPROVE TOKEN
        </button>
        <button onClick={handleTransferTokens} disabled={transactionIsLoading}>
          TRANSFER TOKEN
        </button>
      </div>
    </main>
  )
}
