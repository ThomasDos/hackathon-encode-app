import { ethers } from 'ethers'

function getRpcProvider(network: string) {
  return new ethers.JsonRpcProvider(`https://1rpc.io/${network}`)
}

export default getRpcProvider
