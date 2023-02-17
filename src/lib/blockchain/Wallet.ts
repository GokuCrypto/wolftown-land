import { CONFIG } from "lib/config";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import WalletJSON from "./abis/Wallet.json";

const walletAddress = CONFIG.WALLET_CONTRACT;

/**
 * Token contract
 */
export class Wallet {
  private web3: Web3;
  private account: string;

  private contract: any;

  constructor(web3: Web3, account: string, address?: string) {
    this.web3 = web3;
    this.account = account;
    this.contract = new this.web3.eth.Contract(
      WalletJSON as AbiItem[],
      (address as string ) || (walletAddress as string)
    );
  }

  public async deposit(token: string, amount: string) {
    return new Promise((resolve, reject) => {
      this.contract.methods
        .deposit(token, amount)
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

  public async withdraw(id: string, token: string, amount: string, s: string, signature: string) {
    return new Promise((resolve, reject) => {
      this.contract.methods
        .withdrawSigle(id, token, amount, signature)
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

  public async depositNFTs(token: string, tokenIds: number[]) {
    return new Promise((resolve, reject) => {
      this.contract.methods
        .depositNFTs(token, tokenIds)
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
