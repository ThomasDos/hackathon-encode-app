'use client'

import useRedeemToken from '@/hooks/use-redeem-token'

function Admin() {
  const { redeemToken } = useRedeemToken()
  const handleRequestToken = async () => {
    const tx = await redeemToken()
    console.log('tx', tx)
  }
  return (
    <main>
      <div className='flex p-10 gap-6 justify-center'>
        <button onClick={handleRequestToken}>REDEEM TOKEN</button>
      </div>
    </main>
  )
}

export default Admin
