const NETWORK = import.meta.env.VITE_NETWORK as "mainnet" | "mumbai";
const DONATION_ADDRESS = import.meta.env.VITE_DONATION_ADDRESS;

const POLYGON_CHAIN_ID = NETWORK === "mainnet" ? 56 : 56;

const API_URL = import.meta.env.VITE_API_URL;
const WISHING_WELL_CONTRACT = import.meta.env.VITE_WISHING_WELL_CONTRACT;
const BETA_CONTRACT = import.meta.env.VITE_BETA_CONTRACT;
const FARM_CONTRACT = import.meta.env.VITE_FARM_CONTRACT;
const INVENTORY_CONTRACT = import.meta.env.VITE_INVENTORY_CONTRACT;
const PAIR_CONTRACT = import.meta.env.VITE_PAIR_CONTRACT;
const SESSION_CONTRACT = import.meta.env.VITE_SESSION_CONTRACT;
const TOKEN_CONTRACT = import.meta.env.VITE_TOKEN_CONTRACT;
const DISCORD_REDIRECT = import.meta.env.VITE_DISCORD_REDIRECT;
const CLIENT_VERSION = import.meta.env.VITE_CLIENT_VERSION as string;
const RELEASE_VERSION = import.meta.env.VITE_RELEASE_VERSION as string;

const BUSD_CONTRACT = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
const WTWOOL_CONTRACT = "0xAA15535fd352F60B937B4e59D8a2D52110A419dD"
const WTMILK_CONTRACT = "0x60Ca032Ba8057FedB98F6A5D9ba0242AD2182177"
const WALLET_CONTRACT = "0x5EaE7A5c17080627c4F6596FFfc4e645A8136bf2"
const ANIMAL_CONTRACT = "0x14f112d437271e01664bb3680BcbAe2f6A3Fb5fB"
const ANIMAL_LEVEL_CONTRACT = "0xeb5577Dd6e058b3E236E8d0adf655410661F699d"
const LAND_CONTRACT = "0x7A7E298FfeB8f316E39496592062619f9B83044E"
const LAND_LEVEL_CONTRACT = "0x47b8f8C5c450E8bC91B18F1E4D715f8A23a6d728"
const MULTICALL_CONTRACT = "0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B"
const RPC_URL = "https://bscrpc.com/"
const WT_API_URL = "https://app.wolftown.games"

export const CONFIG = {
  NETWORK,
  POLYGON_CHAIN_ID,
  DONATION_ADDRESS,
  API_URL,
  DISCORD_REDIRECT,

  WISHING_WELL_CONTRACT,
  BETA_CONTRACT,
  FARM_CONTRACT,
  INVENTORY_CONTRACT,
  PAIR_CONTRACT,
  SESSION_CONTRACT,
  TOKEN_CONTRACT,
  CLIENT_VERSION,
  RELEASE_VERSION,
  BUSD_CONTRACT,
  WTWOOL_CONTRACT,
  WTMILK_CONTRACT,
  WALLET_CONTRACT,
  ANIMAL_CONTRACT,
  LAND_CONTRACT,
  RPC_URL,
  MULTICALL_CONTRACT,
  WT_API_URL
};
