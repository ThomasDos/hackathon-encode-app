'use client'

import useAttestToken from '@/hooks/use-attest-token'
import getRpcProvider from '@/services/custom-ethers-provider'
import useTransactionsStore from '@/store/transactions.store'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Chain, useNetwork } from 'wagmi'

function CreateNewBridgeToken() {
  const { chain } = useNetwork()
  const [tokenAddress, setTokenAddress] = useState('')
  const [transactionHash, setTransactionHash] = useState('')
  const resetStore = useTransactionsStore((state) => state.resetStore)
  const setReceipt = useTransactionsStore((state) => state.setReceipt)
  const receipt = useTransactionsStore((state) => state.receipt)

  const { attestToken } = useAttestToken(chain as Chain)
  const handleAttestToken = async () => {
    await attestToken()
  }
  const handleRetrieveReceipt = async () => {
    if (!chain) return
    const provider = getRpcProvider(chain?.rpcUrls.default.http[0])
    const receipt = await provider.getTransactionReceipt(transactionHash)
    setReceipt(receipt)
    toast.success('Receipt retrieved')
  }
  return (
    <main className='flex flex-col items-center'>
      <h1 className='text-xl'>Create the Bridge for my ERC20 TOKEN</h1>
      <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5' role='alert'>
        <strong className='font-bold'>Temporarly!</strong>
        <span className='block sm:inline'> Bridge will be made from Sepolia to Goerli testnet for demo purpose.</span>
      </div>
      <div className='flex gap-5'>
        <div className='flex flex-col'>
          <label htmlFor='token-address' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Put the address of tokens you want to attest
          </label>
          <input
            type='text'
            id='token-address'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
            placeholder='0x...'
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
          <div className='flex p-10 gap-6 justify-center'>
            <button
              onClick={handleAttestToken}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              ATTEST TOKEN
            </button>
          </div>
        </div>

        {!receipt && (
          <div className='flex flex-col'>
            <label htmlFor='token-receipt' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Put the transaction hash of token approval
            </label>
            <input
              type='text'
              id='token-receipt'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              required
              placeholder='0x...'
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
            />
            <div className='flex p-10 gap-6 justify-center'>
              <button
                onClick={handleRetrieveReceipt}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                RETRIEVE RECEIPT
              </button>
            </div>
          </div>
        )}
      </div>

      <div className='flex p-10 gap-6 justify-center'>
        <button
          onClick={() => resetStore()}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          RESET FLOW
        </button>
      </div>
    </main>
  )
}

export default CreateNewBridgeToken
