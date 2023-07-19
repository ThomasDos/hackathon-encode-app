import { ethers } from 'ethers'

function getRpcProvider(url: string) {
  return new ethers.providers.JsonRpcProvider(url)
}

export default getRpcProvider
