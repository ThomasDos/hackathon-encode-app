'use client'

import useApproveToken from '@/hooks/use-approve-token'
import useTransferTokens from '@/hooks/use-transfer-tokens'
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

  const handleTransferTokens = async () => {
    if (!writeAsync || !writeAsyncApproveToken) return
    await writeAsyncApproveToken()
    console.log('End', isSuccessApproveToken)
    if (!isSuccessApproveToken) return

    const tx = await writeAsync()
    console.log('tx', tx)
  }

  return (
    <main>
      <button onClick={handleTransferTokens} disabled={isLoadingTransferTokens || isLoadingAproveToken}>
        TRANSFER TOKEN
      </button>
    </main>
  )
}
