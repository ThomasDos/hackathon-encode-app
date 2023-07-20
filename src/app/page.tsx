'use client'

import useApproveToken from '@/hooks/use-approve-token'
import useTransferTokens from '@/hooks/use-transfer-tokens'
import { db } from '@/services/firebase'
import useTransactionsStore from '@/store/transactions.store'
import { WormholeConnectConfig } from '@wormhole-foundation/wormhole-connect'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Home() {
  const [tokenAmount, setTokenAmount] = useState(0)
  const [sponsorName, setSponsorName] = useState('')
  const [sponsors, setSponsors] = useState<any[]>([])
  const [tokenAddress, setTokenAddress] = useState('')

  const { writeAsync: writeAsyncTransferToken, isLoading: isLoadingTransferTokens } = useTransferTokens(
    tokenAddress as `0x${string}`,
    tokenAmount
  )
  const { writeAsync: writeAsyncApproveToken, isLoading: isLoadingAproveToken } = useApproveToken(
    tokenAddress as `0x${string}`
  )

  const resetStore = useTransactionsStore((state) => state.resetStore)

  const config: WormholeConnectConfig = {
    env: 'testnet',
    networks: ['ethereum', 'polygon', 'solana'],
    tokens: ['ETH', 'WETH', 'MATIC', 'WMATIC']
  }

  const handleApproveToken = async () => {
    if (!writeAsyncApproveToken) return
    if (!tokenAddress) {
      toast.error('Please enter a token address')
      return
    }
    await writeAsyncApproveToken()
    toast.success('Token approved')
  }

  const handleTransferTokens = async () => {
    if (!writeAsyncTransferToken) return
    if (!tokenAddress) {
      toast.error('Please enter a token address')
      return
    }
    if (!tokenAmount) {
      toast.error('Please enter a token amount')
      return
    }

    const tx = await writeAsyncTransferToken()
    toast.success('Token transfered')

    await setDoc(doc(db, 'sponsors', tx.hash), {
      sponsor: sponsorName,
      created_at: new Date().toISOString()
    })
  }

  useEffect(() => {
    getDocs(collection(db, 'sponsors')).then((querySnapshot) => {
      const sponsorsTemp: any[] = []
      querySnapshot.forEach((doc) => {
        sponsorsTemp.push({ ...doc.data() })
      })
      setSponsors(sponsorsTemp)
    })
  }, [])

  const transactionIsLoading = isLoadingTransferTokens || isLoadingAproveToken

  return (
    <main className='flex flex-col items-center'>
      <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
        <strong className='font-bold'>Proceed carefully!</strong>
        <span className='block sm:inline'> Please make sure that you have correctly attest your token first.</span>
      </div>
      <div className='flex gap-5 my-5'>
        {sponsors.length > 0 &&
          sponsors.map((sponsor) => (
            <span
              key={sponsor.sponsor}
              className='bg-green-100 text-green-800 text-xl font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'>
              {sponsor.sponsor}
            </span>
          ))}
      </div>

      <div className='flex flex-col my-10'>
        <label htmlFor='token-address' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          Put the address of tokens you want to transfer
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

      <div className='my-5'>
        <label htmlFor='sponsor' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          Please enter the sponsor name
        </label>
        <input
          type='text'
          id='sponsor'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          required
          placeholder='Your sponsor name'
          value={sponsorName}
          onChange={(e) => setSponsorName(e.target.value)}
        />
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

      <div className='flex p-10 gap-6 justify-center'>
        <button
          onClick={() => {
            resetStore()
            setTokenAddress('')
            setTokenAmount(0)
          }}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          RESET FLOW
        </button>
      </div>
    </main>
  )
}
