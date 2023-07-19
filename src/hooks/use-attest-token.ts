import { EH_ADDRESS } from '@/constant/token-ERC20-sepolia-address'
import finaliseAttestWormholeFromTargetChain from '@/services/wormhole/finalise-attest-wormhole-from-target-chain'
import requestAttestWormhole from '@/services/wormhole/request-attest-wormhole'
import { Chain } from 'wagmi'

function useAttestToken(chain: Chain, switchNetwork: any) {
  const targetChain = 'goerli'

  let vaaKey

  async function attestToken() {
    try {
      if (!switchNetwork) return null

      const vaa = await requestAttestWormhole(chain as Chain, targetChain, EH_ADDRESS)

      console.log('vaa > ', vaa)

      await finaliseAttestWormholeFromTargetChain('goerli', vaa)
      vaaKey = vaa
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return { vaaKey, attestToken }
}
export default useAttestToken

// token(address)
// nonce(uint256)
