import { getEmitterAddressEth, getSignedVAAWithRetry } from '@certusone/wormhole-sdk'

const getRedeemTokenVaa = async () => {
  try {
    // const rc = mockReceiptTransferToken
    // console.log('rc:', rc)

    // const seq = parseSequenceFromLogEth(rc as any, '0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78')
    // console.log('seq:', seq)
    //336
    const emitterAddress = getEmitterAddressEth('0xDB5492265f6038831E89f495670FF909aDe94bd9')
    // const chainId = WORMHOLE_CONTRACT_ADDRESSES[chain.network as keyof typeof WORMHOLE_CONTRACT_ADDRESSES].chainId

    const attestationVaa = await getSignedVAAWithRetry(
      ['https://wormhole-v2-testnet-api.certus.one'],
      10002,
      emitterAddress,
      '336',
      {},
      1000,
      5
    )

    console.log('<<<<<<<<<<<<<attestationVaa>>>>>>>>>>', attestationVaa)

    return attestationVaa
  } catch (error) {
    console.log('error: ', error)
  }
}

export default getRedeemTokenVaa
