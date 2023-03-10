
export interface Balances {
  BUSD: string;
  WTWOOL: string;
  WTMILK: string;
  integral: string;
  Build: string;
}

export interface Allowances {
  BUSD: string;
  WTWOOL: string;
  WTMILK: string;
}

export const EMPTY_ALLOWANCES: Allowances = {
  BUSD: '0',
  WTWOOL: '0',
  WTMILK: '0'
}

export const EMPTY_BALANCES: Balances = {
  BUSD: '0',
  WTWOOL: '0',
  WTMILK: '0',
  integral: '0',
  Build: '0'
}

export interface BagItem {
  id: string;
  name: string;
  type: string;
  image: string;
  amount: number;
  attribute: string;//0 可以合成  1 可兑换
  pow: number
  level: number

}


export interface WolfUserGoodsToChain {
  id: string;
  sign: string;
  name: string;
  image: string;
  goodsFalseId: string;
  owner: string;
  attribute: string;//0待核销   1已核销
}