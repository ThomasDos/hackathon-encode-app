'use client'

import mockReceiptTransferToken from '@/constant/mock-receipt-transfer-token'
import useApproveToken from '@/hooks/use-approve-token'
import useAttestToken from '@/hooks/use-attest-token'
import useTransferTokens from '@/hooks/use-transfer-tokens'
import getRpcProvider from '@/services/custom-ethers-provider'
import {
  getEmitterAddressEth,
  getSignedVAAWithRetry,
  parseSequenceFromLogEth,
  redeemOnEth
} from '@certusone/wormhole-sdk'
import { WormholeConnectConfig } from '@wormhole-foundation/wormhole-connect'
import { ContractReceipt, ethers } from 'ethers'
import { useNetwork } from 'wagmi'

export default function Home() {
  const { chain } = useNetwork()

  const getSequence = async () => {
    if (!chain) return
    try {
      const provider = getRpcProvider(chain.rpcUrls.default.http[0])
      console.log('provider:')
      const rc = await provider.getTransactionReceipt(
        '0xb58977af4eb717b25d74e0a5de693fdab1cbd30659a114adf24dfd6a6712823d'
      )
      console.log('rc', rc)
      const seq = parseSequenceFromLogEth(
        mockReceiptTransferToken as any as ContractReceipt,
        '0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78'
      )
      console.log('SEQ', seq)

      const emitterAddress = getEmitterAddressEth('0xDB5492265f6038831E89f495670FF909aDe94bd9')

      const attestationVaa = await getSignedVAAWithRetry(
        ['https://wormhole-v2-testnet-api.certus.one'],
        10002,
        emitterAddress,
        seq.toString(),
        {},
        1000,
        5
      )

      console.log('attestationVaa', attestationVaa)

      //@ts-ignore
      const providerBrowser = new ethers.providers.Web3Provider(window.ethereum, 'any')
      const signer = providerBrowser.getSigner()
      console.log('getSigner:', signer)
      const address = await signer.getAddress()
      console.log('address:', address)
      const res = await redeemOnEth('0xF890982f9310df57d00f659cf4fd87e65adEd8d7', signer, attestationVaa.vaaBytes)
      console.log('res', res)
    } catch (error) {
      console.log('error', error)
    }
  }

  getSequence()

  const { writeAsync, data, isLoading: isLoadingTransferTokens, isSuccess } = useTransferTokens()
  const {
    writeAsync: writeAsyncApproveToken,
    data: dataApproveToken,
    isSuccess: isSuccessApproveToken,
    isLoading: isLoadingAproveToken
  } = useApproveToken()

  const {
    write: writeAttestToken,
    writeAsync: writeAsyncAttestToken,
    data: dataAttestToken,
    isSuccess: isSuccessAttestToken,
    isLoading: isLoadingAttestToken
  } = useAttestToken()
  console.log('dataAttestToken', dataAttestToken)

  const config: WormholeConnectConfig = {
    env: 'testnet',
    networks: ['ethereum', 'polygon', 'solana'],
    tokens: ['ETH', 'WETH', 'MATIC', 'WMATIC']
  }

  const handleAttestToken = async () => {
    if (!writeAsyncAttestToken) return
    const tx = await writeAsyncAttestToken()

    console.log('tx', tx)
  }
  const handleApproveToken = async () => {
    if (!writeAsyncApproveToken) return

    const tx = await writeAsyncApproveToken()
    console.log('tx', tx)
  }

  const handleTransferTokens = async () => {
    if (!writeAsync) return
    const tx = await writeAsync()
    console.log('tx', tx)
  }

  const transactionIsLoading = isLoadingTransferTokens || isLoadingAproveToken || isLoadingAttestToken

  return (
    <main>
      <div className='flex p-10 gap-6 justify-center'>
        <button onClick={handleAttestToken} disabled={transactionIsLoading}>
          ATTEST TOKEN
        </button>
        <button onClick={handleApproveToken} disabled={transactionIsLoading}>
          APPROVE TOKEN
        </button>
        <button onClick={handleTransferTokens} disabled={transactionIsLoading}>
          TRANSFER TOKEN
        </button>
      </div>
      {/* <WormholeBridge /> */}
    </main>
  )
}
