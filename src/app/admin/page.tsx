'use client'

import useRedeemToken from '@/hooks/use-redeem-token'
import getRpcProvider from '@/services/custom-ethers-provider'
import useTransactionsStore from '@/store/transactions.store'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNetwork } from 'wagmi'

function Admin() {
  const { chain } = useNetwork()
  const [transactionHash, setTransactionHash] = useState('')
  const { redeemToken } = useRedeemToken(transactionHash)
  const receipt = useTransactionsStore((state) => state.receipt)
  const setReceipt = useTransactionsStore((state) => state.setReceipt)
  const resetStore = useTransactionsStore((state) => state.resetStore)

  const handleRequestToken = async () => {
    if (!transactionHash) {
      return toast.error('Please enter a transaction hash')
    }

    if (!receipt) {
      await handleRetrieveReceipt()
    } else {
      await redeemToken()
      toast.success('Token redeemed')
    }
  }

  const handleRetrieveReceipt = async () => {
    if (!chain) return
    const provider = getRpcProvider('https://rpc.sepolia.org')
    const receipt = await provider.getTransactionReceipt(transactionHash)
    setReceipt(receipt)
    toast.success('Receipt retrieved')
  }
  return (
    <main>
      <div className='flex p-10 gap-6 justify-center flex-col items-center'>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
          <strong className='font-bold'>Proceed carefully!</strong>
          <span className='block sm:inline'>
            {' '}
            Please make sure that you retrieve the receipt / VAA from SEPOLIA then redeem from GOERLI
          </span>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='token-redeem' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Put the transaction hash of token to redeem
          </label>
          <input
            type='text'
            id='token-redeem'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
            placeholder='0x...'
            value={transactionHash}
            onChange={(e) => setTransactionHash(e.target.value)}
          />
          <div className='flex p-10 gap-6 justify-center'>
            <button
              onClick={handleRequestToken}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              REDEEM TOKEN
            </button>
          </div>
        </div>

        <div className='flex p-10 gap-6 justify-center'>
          <button
            onClick={() => resetStore()}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            RESET FLOW
          </button>
        </div>
      </div>
    </main>
  )
}

export default Admin
