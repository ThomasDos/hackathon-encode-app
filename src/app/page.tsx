'use client'

import useApproveToken from '@/hooks/use-approve-token'
import useTransferTokens from '@/hooks/use-transfer-tokens'
import { WormholeConnectConfig } from '@wormhole-foundation/wormhole-connect'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Home() {
  const [tokenAmount, setTokenAmount] = useState(0)
  const {
    writeAsync: writeAsyncTransferToken,
    data,
    isLoading: isLoadingTransferTokens,
    isSuccess
  } = useTransferTokens(tokenAmount)
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

    toast.success('Token approved')
  }

  const handleTransferTokens = async () => {
    if (!writeAsyncTransferToken || !tokenAmount) return
    const tx = await writeAsyncTransferToken()
    console.log('tx', tx)
    toast.success('Token transfered')
  }

  const transactionIsLoading = isLoadingTransferTokens || isLoadingAproveToken

  return (
    <main className='flex flex-col items-center'>
      <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
        <strong className='font-bold'>Proceed carefully!</strong>
        <span className='block sm:inline'> Please make sure that you have correctly attest your token first.</span>
      </div>

      <div className='flex p-10 gap-6 justify-center'>
        <button
          onClick={handleApproveToken}
          disabled={transactionIsLoading}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          APPROVE TOKEN
        </button>
        <button
          onClick={handleTransferTokens}
          disabled={transactionIsLoading}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          TRANSFER TOKEN
        </button>
      </div>

      <div>
        <label htmlFor='token-amount' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          Put the amount of tokens you want to transfer
        </label>
        <input
          type='number'
          id='token-amount'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          required
          placeholder='0'
          value={tokenAmount}
          onChange={(e) => setTokenAmount(Number(e.target.value))}
        />
      </div>
    </main>
  )
}
