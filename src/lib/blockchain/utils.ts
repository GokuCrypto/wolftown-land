import { Interface } from '@ethersproject/abi'
import { CallOverrides } from '@ethersproject/contracts'
import { ERRORS } from "lib/errors";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { CONFIG } from "lib/config";
import MulticallABI from "./abis/Multicall.json";

const MINIMUM_GAS_PRICE = 40;

export async function estimateGasPrice(web3: Web3, incr = 1) {
  const minimum = MINIMUM_GAS_PRICE * 1000000000;
  try {
    const e = await web3.eth.getGasPrice();
    let gasPrice = e ? Number(e) * incr : undefined;
    if (!gasPrice || gasPrice < minimum) {
      gasPrice = minimum;
    }
    console.log({ gasPrice });
    return gasPrice;
  } catch {
    return minimum;
  }
}

export function parseMetamaskError(error: any): Error {
  console.log({ parse: error });
  if (error.code === 4001) {
    return new Error(ERRORS.REJECTED_TRANSACTION);
  }

  if (error.code === -32603) {
    console.log("Congested!");
    return new Error(ERRORS.NETWORK_CONGESTED);
  }

  return error;
}


const web3 = new Web3(CONFIG.RPC_URL)
const multicallContract = new web3.eth.Contract(MulticallABI as AbiItem[], CONFIG.MULTICALL_CONTRACT)

// const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER);
// const multi = new Contract(process.env.MULTICALL_CONTRACT, multicallABI, provider)

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

export async function multicall(abi: any[], calls: Call[]) {
  const itf = new Interface(abi)
  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }))
  for(let i = 0; i < 5; i++) {
    try {
      const { returnData } = await multicallContract.methods.aggregate(calldata).call()
      return returnData.map((call: any, i: number) => itf.decodeFunctionResult(calls[i].name, call))
    } catch(e) {
      if(i == 4) {
        console.log(e)
        return null
      }
    }
  }
}



