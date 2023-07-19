'use client'

import useRedeemToken from '@/hooks/use-redeem-token'
import toast from 'react-hot-toast'

function Admin() {
  const { redeemToken } = useRedeemToken()
  const handleRequestToken = async () => {
    const tx = await redeemToken()
    console.log('tx', tx)
    toast.success('Token redeemed')
  }
  return (
    <main>
      <div className='flex p-10 gap-6 justify-center'>
        <button
          onClick={handleRequestToken}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          REDEEM TOKEN
        </button>
      </div>
    </main>
  )
}

export default Admin
