import finaliseAttestWormholeFromTargetChain from '@/services/wormhole/finalise-attest-wormhole-from-target-chain'
import requestAttestWormhole from '@/services/wormhole/request-attest-wormhole'
import { Chain } from 'wagmi'

function useAttestToken(chain: Chain, switchNetwork: any) {
  const tokenAddress = '0x3913117C28e721d94EB4aEaCFAc3F1b663caC6C0'
  const targetChain = 'goerli'

  let vaaKey

  async function attestToken() {
    try {
      console.log('BEFORE SWITCH')
      if (!switchNetwork) return null
      console.log('AFTER SWITCH')
      const vaa = await requestAttestWormhole(chain as Chain, targetChain, tokenAddress)

      console.log('vaa > ', vaa)

      // switch network to goerli
      // switchNetwork(goerli.id)

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
