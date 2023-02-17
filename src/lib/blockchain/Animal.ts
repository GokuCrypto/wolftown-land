import { CONFIG } from "lib/config";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import AnimalJSON from "./abis/Animal.json";
import { multicall } from './utils'

const tokenAddress = CONFIG.ANIMAL_CONTRACT;

export const fetchAnimals = async (ids: number[]) => {
  const groupSize = ids.length / 100 + (ids.length % 100 === 0 ? 0 : 1)

  const groupedAnimals = await Promise.all(
    Array.from({ length: groupSize }, async (_, i) => {
      const groupIds = ids.slice(i * 100, i * 100 + 100)
        const url = `${CONFIG.WT_API_URL}/animals?ids=${encodeURIComponent(JSON.stringify(groupIds))}`  
    
     const response = await fetch(url)
      const animals = await response.json()
      return animals
    }),
  )
  const traits = groupedAnimals.reduce((acc, group, i) => {
    Object.assign(acc, group)
    return acc
  }, {})
  return ids.map((id) => {
    return {
      id,
      name: traits[id].name,
      isSheep: traits[id].name.includes('Sheep'),
      image: traits[id].image,
      imageSmall: traits[id].imageSmall,
      attributes: traits[id].attributes,
    }
  })
}

/**
 * Token contract
 */
export class Animal {
  private web3: Web3;
  private account: string;

  private contract: any;

  constructor(web3: Web3, account: string, address?: string) {
    this.web3 = web3;
    this.account = account;
    this.contract = new this.web3.eth.Contract(
      AnimalJSON as AbiItem[],
      (address as string ) || (tokenAddress as string)
    );
  }

  public async isApprovedForAll(spender: string) {
    return await this.contract.methods
      .allowance(this.account, spender)
      .call();
  }

  /**
   * Keep full wei amount as used for approving/sending
   */
  public async balanceOf(address: string) {
    const balance = await this.contract.methods
      .balanceOf(address)
      .call({ from: this.account });

    return balance;
  }

  public async getAniamls() {
    const balance = await this.contract.methods.balanceOf(this.account)
    const calls = Array.from( { length: balance }).map((_,i) => {
      return {
        address: tokenAddress,
        name: 'tokenOfOwnerByIndex',
        params: [this.account, i],
      }
    })
    const ids = await multicall(AnimalJSON, calls)
    const animals = await fetchAnimals(ids.map((id: any) => id[0].toNumber()))
    return animals
  }

  /**
   * Onchain SFL balance
   */
  public async totalSupply() {
    const supply = await this.contract.methods
      .totalSupply()
      .call({ from: this.account });

    return supply;
  }

  public async approveForAll(spender: string) {
    return new Promise((resolve, reject) => {
      this.contract.methods
        .setApprovalForAll(spender, true)
        .send({ from: this.account })
        .on("error", function (error: any) {
          console.log({ error });
          reject(error);
        })
        .on("transactionHash", function (transactionHash: any) {
          console.log({ transactionHash });
        })
        .on("receipt", function (receipt: any) {
          console.log({ receipt });
          resolve(receipt);
        });
    });
  }
}
