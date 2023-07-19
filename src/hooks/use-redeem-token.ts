import finaliseRedeemWormholeFromTargetChain from '@/services/wormhole/finalise-redeem-wormhole-from-target-chain'
import getRedeemTokenVaa from '@/services/wormhole/get-redeem-token-vaa'

function useRedeemToken() {
  let vaaKey

  async function redeemToken() {
    try {
      const vaa = await getRedeemTokenVaa()

      console.log('vaa > ', vaa)

      await finaliseRedeemWormholeFromTargetChain('goerli', vaa)
      vaaKey = vaa
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return { vaaKey, redeemToken }
}
export default useRedeemToken
