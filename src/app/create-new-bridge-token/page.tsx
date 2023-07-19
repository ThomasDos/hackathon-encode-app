'use client'

import useAttestToken from '@/hooks/use-attest-token'
import toast from 'react-hot-toast'
import { Chain, useNetwork, useSwitchNetwork } from 'wagmi'

function CreateNewBridgeToken() {
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const { vaaKey, attestToken } = useAttestToken(chain as Chain, switchNetwork)
  const handleAttestToken = async () => {
    await attestToken()
    toast.success('Token attested')
  }
  return (
    <main>
      <div className='flex p-10 gap-6 justify-center'>
        <button
          onClick={handleAttestToken}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          ATTEST TOKEN
        </button>
      </div>
    </main>
  )
}

export default CreateNewBridgeToken
