import { ethers } from 'ethers'

const customHttpProvider = new ethers.providers.JsonRpcProvider('https://1rpc.io/eth')

export default customHttpProvider
