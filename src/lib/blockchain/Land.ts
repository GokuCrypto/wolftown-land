import { CONFIG } from "lib/config";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import LandJSON from "./abis/Land.json";
import LandLevel from "./abis/LandLevel.json";

import { multicall } from './utils'
import Decimal from "decimal.js-light";

const tokenAddress = CONFIG.LAND_CONTRACT;
const tokenLevelAddress = CONFIG.LAND_LEVEL_CONTRACT;
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
export class Land {
  private web3: Web3;
  private account: string;

  private contract: any;

  constructor(web3: Web3, account: string, address?: string) {
    this.web3 = web3;
    this.account = account;
    this.contract = new this.web3.eth.Contract(
      LandJSON as AbiItem[],
      (address as string) || (tokenAddress as string)
    );
  }

  public async isApprovedForAll(spender: string) {
    return await this.contract.methods
      .isApprovedForAll(this.account, spender)
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

  public async getLands() {
    const balance = await this.contract.methods.balanceOf(this.account).call()


    const count = balance
    const idCalls = Array.from({ length: count }, (_, i) => {
      return {
        address: tokenAddress,
        name: 'tokenOfOwnerByIndex',
        params: [this.account, i],
      }
    })

    const ids: any[] = await multicall(LandJSON, idCalls)

    const traitCalls = ids.map((id: any) => {
      return {
        address: tokenAddress,
        name: 'getTrait',
        params: id
      }
    })

    const levels = ids.map((id: any) => {
      return {
        address: tokenLevelAddress,
        name: 'getLevel',
        params: id
      }
    })

    const traits = await multicall(LandJSON, traitCalls)
    const levelDatas = await multicall(LandLevel, levels)

    console.log("levelDataslevelDatas", levelDatas)

    const lands = ids.map(([id], i: number) => {
      const power = traits[i].power.toNumber()
      const level = levelDatas[i]

      const type = traits[i].kind === 0 ? 'farm' : 'mine'
      const imageSmall = `/images/lands/${type}_${level}.png`
      console.log("idididid", id)
      return {
        id: Number(id.toString()),
        name: `Land #${id}`,
        type,
        power,
        level,
        imageSmall
      }
    })


    return lands
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
