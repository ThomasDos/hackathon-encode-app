'use client'
import Input from '@/components/ui/input'
import { useEthersSigner } from '@/hooks/use-ethers-signer'
import { TokenType, peanutCreateLink } from '@/services/peanut-protocol/peanut-protocol-utils'
import { ethers } from 'ethers'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useWalletClient } from 'wagmi'

function Peanut() {
  const { data: wallet } = useWalletClient()
  const signer = useEthersSigner()

  console.log('wallet:', wallet)
  const [tokenAmount, setTokenAmount] = useState(0)
  // const signer = useEthersSigner()

  const handleCreateLink = async () => {
    if (!tokenAmount) {
      return toast.error('Please enter a amount of tokens')
    }

    if (!wallet) {
      return toast.error('Please connect your wallet')
    }
    const signer = new ethers.Wallet(
      process.env.NEXT_PUBLIC_PRIVATE_KEY as string,
      new ethers.providers.JsonRpcProvider(wallet.chain.rpcUrls.public.http[0])
    )

    console.log('signer:', signer)
    try {
      const { link, txReceipt } = await peanutCreateLink({
        tokenAmount,
        chainId: '5',
        tokenType: TokenType.ether,
        signer
      })
    } catch (e) {
      console.log('Error :', e)
    }
  }

  return (
    <main className='flex flex-col items-center'>
      <h1 className='text-xl'>PEANUT PROTOCOLE : SMART CHEQUES</h1>
      <div className='flex p-10 gap-6 justify-center flex-col items-center'>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
          <strong className='font-bold'>Proceed carefully!</strong>
          <span className='block sm:inline'> Messing around with SDK peanut protocl, sending goerli ETH</span>
        </div>
        <div className='flex flex-col'>
          <Input
            type='number'
            label='Amount of tokens'
            id='amount-token'
            className='my-2'
            required
            placeholder='0'
            value={tokenAmount}
            onChange={(value) => setTokenAmount(value as number)}
          />
          <div className='flex p-10 gap-6 justify-center'>
            <button
              onClick={handleCreateLink}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Create the Smart Cheque
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Peanut
