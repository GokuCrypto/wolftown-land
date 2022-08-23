
export interface Balances {
  BUSD: string;
  WTWOOL: string;
  WTMILK: string;
}

export const EMPTY_BALANCES: Balances = {
  BUSD: '0',
  WTWOOL: '0',
  WTMILK: '0'
}

export interface BagItem {
	id: string;
	name: string;
	type: string;
	image: string;
	amount: number;
}