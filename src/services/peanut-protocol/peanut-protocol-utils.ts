import peanut from '@squirrel-labs/peanut-sdk'

const CHAIN_ID = {
  eth: 'ethereum-mainnet',
  '1': 'ethereum-mainnet',
  goerli: 'ethereum-goerli',
  '3': 'polygon-mainnet',
  '5': 'ethereum-goerli',
  matic: 'polygon-mainnet',
  '137': 'polygon-mainnet',
  mumbai: 'polygon-mumbai',
  arb: 'arbitrum-mainnet',
  '42161': 'arbitrum-mainnet',
  opt: 'optimism-mainnet',
  '10': 'optimism-mainnet',
  xdai: 'xdai-mainnet',
  '100': 'xdai-mainnet',
  avax: 'avalanche-mainnet',
  '43114': 'avalanche-mainnet',
  bnb: 'bsc-mainnet',
  '56': 'bsc-mainnet',
  fil: 'filecoin-mainnet',
  'fil-2': 'filecoin-hyperspace',
  'scroll-l2p': 'scroll-pre_alpha_l2',
  'scroll-alpha': 'scroll-alpha',
  '534353': 'scroll-alpha'
}

export enum TokenType {
  ether,
  erc20,
  erc721,
  erc1155
}

interface PeanutCreateLink {
  signer: any
  chainId: keyof typeof CHAIN_ID
  tokenType: TokenType
  tokenAmount: number
}

export async function peanutCreateLink({ signer, chainId, tokenType, tokenAmount }: PeanutCreateLink) {
  const data = {
    signer,
    chainId,
    tokenAmount,
    tokenType,
    gasLimit: 100000,
    verbose: true
  }

  console.log('data', data)
  try {
    const receipt = await peanut.createLink(data)
    console.log('receipt', receipt)
    const { link, txReceipt } = receipt
    console.log('link:', link)
    console.log('txReceipt:', txReceipt)

    return { link, txReceipt }
  } catch (error) {
    console.log('error', error)
    return { link: null, txReceipt: null, error }
  }
}

interface PeanutClaimLink {
  signer: any
  link: string
}

export async function peanutClaimLink({ signer, link }: PeanutClaimLink) {
  const claimTx = await peanut.claimLink({ signer, link })
  console.log('claimTx:', claimTx)
}
