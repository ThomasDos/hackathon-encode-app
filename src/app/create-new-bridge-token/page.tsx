'use client'

import useAttestToken from '@/hooks/use-attest-token'
import { Chain, useNetwork, useSwitchNetwork } from 'wagmi'

function CreateNewBridgeToken() {
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const { vaaKey, attestToken } = useAttestToken(chain as Chain, switchNetwork)
  const handleAttestToken = async () => {
    await attestToken()
  }
  return (
    <main>
      <div className='flex p-10 gap-6 justify-center'>
        <button onClick={handleAttestToken}>ATTEST TOKEN</button>
      </div>
    </main>
  )
}

export default CreateNewBridgeToken
