import { BigNumber, Contract, providers, utils } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { AbiConfig, Constants } from "./WolfConfig";
import { AppEvent } from "./EventBus";

let first = true;
export const _isMetaMaskInstalled = async () => {
  if (typeof window === "undefined") return;
  const { ethereum } = window;
  const res = Boolean(ethereum && ethereum.isMetaMask);
  if (res && first) {
    first = false;

    const { account } = await useWeb3React();

    CurrentWalletEnv.wallet = account || "";
    console.log("account2", account);
    if (Constants.DEBUG_ADDRESS)
      CurrentWalletEnv.wallet = Constants.DEBUG_ADDRESS;
    AppEvent.emit("accountsChanged", CurrentWalletEnv.wallet);

    const _chain = await _getChain();
    CurrentWalletEnv.chain = `${parseInt(_chain)}`;
    AppEvent.emit("chainChanged", CurrentWalletEnv.chain);
  }
  return res;
};

export const _getProvider = () => {
  if (!_isMetaMaskInstalled()) return null;
  if (typeof window === "undefined") return null;
  return new providers.Web3Provider(window.ethereum);
};

export const _getChain = async () => {
  const req = async () => {
    const provider = _getProvider();
    if (!provider) return "";
    return `${(await provider.getNetwork()).chainId}`;
  };
  CurrentWalletEnv.chain = await req();
  AppEvent.emit("chainChanged", CurrentWalletEnv.chain);
  return CurrentWalletEnv.chain;
};

export const _getAddress = async () => {
  const req = async () => {
    const provider = _getProvider();
    if (!provider) return "";
    try {
      const accounts = await provider.listAccounts();
      return accounts.length > 0 ? accounts[0] : "";
    } catch (e) {
      return "";
    }
  };
  CurrentWalletEnv.wallet = await req();
  if (Constants.DEBUG_ADDRESS)
    CurrentWalletEnv.wallet = Constants.DEBUG_ADDRESS;
  AppEvent.emit("accountsChanged", CurrentWalletEnv.wallet);
  return CurrentWalletEnv.wallet;
};

export const getContractHandler = async (
  type: keyof typeof Constants.Contract,
  address = ""
) => {
  const provider = _getProvider();
  const chain = await _getChain();
  const getAddress = await _getAddress();
  /* console.log("if1",!address);
  console.log("if2",CurrentWalletEnv.chain !== Constants.Chain.ID);
  console.log("CurrentWalletEnv.wallet",CurrentWalletEnv.wallet);
  console.log("if2.5",!CurrentWalletEnv.wallet);
  console.log("if3",!provider); */

  if (!address) address = Constants.Contract[type];
  if (CurrentWalletEnv.chain !== Constants.Chain.ID) return null;
  if (!CurrentWalletEnv.wallet) return null;
  if (!provider) return null;
  /*   console.log("provider4",provider); */
  const signer = provider.getSigner();
  return new Contract(address, AbiConfig[type], signer);
};

export const CurrentWalletEnv = { wallet: "", chain: "" };
export const IsBscNetAndWalletHas = () => {
  return (
    !!CurrentWalletEnv.wallet && CurrentWalletEnv.chain === Constants.Chain.ID
  );
};
export const useWalletHook = () => {
  const [wallet, setWallet] = useState("");
  const [chain, setChain] = useState("");

  useEffect(() => {
    AppEvent.on("accountsChanged", setWallet);
    AppEvent.on("chainChanged", setChain);
    try {
      _getAddress().then(setWallet);
      _getChain().then(setChain);
    } catch (error) {}
    return () => {
      AppEvent.off("accountsChanged", setWallet);
      AppEvent.off("chainChanged", setChain);
    };
  }, []);

  return { wallet, chain };
};

export const connectMetamask = async () => {
  if (!(await _isMetaMaskInstalled())) return false;
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const switchToMainnet = async (): Promise<boolean> => {
  if (!(await _isMetaMaskInstalled())) return false;
  try {
    const chanid = await window.ethereum.request({
      method: "eth_chainId",
    });

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `${chanid}` }],
    });
    return true;
  } catch (e: any) {
    if (e && "code" in e && e.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        /*  params: [
          {
            chainId: `0x${parseInt(Constants.Chain.ID).toString(16)}`,
            rpcUrls: [Constants.Chain.PRC],
            chainName: Constants.Chain.Name,
            nativeCurrency: {
              name: Constants.Chain.nativeCurrency.name,
              symbol: Constants.Chain.nativeCurrency.symbol,
              decimals: 18,
            },
          },
        ], */
      });
      return switchToMainnet();
    }
    if (e && "message" in e) alert(e.message);
    return false;
  }
};

export const waitTransaction = async (res: Promise<any>) => {
  const provider = _getProvider();
  if (!provider) throw "not connect wallet";
  return new Promise<providers.TransactionReceipt>(async (resolve, reject) => {
    try {
      provider.once((await res).hash, resolve);
    } catch (e) {
      const msg = ContractActionError(e);
      if (msg) alert(msg);
      reject(e);
    }
  });
};

export const watchTransaction = async (
  txHash: string,
  callback: (rev: any, succ: boolean) => any
) => {
  const provider = _getProvider();
  if (!provider) return;
  return new Promise((resolve) => {
    provider.once(txHash, (transaction: providers.TransactionReceipt) => {
      callback(transaction, transaction.status === 1);
      resolve(transaction);
    });
  });
};

export const parseBigNumber = (bn: BigNumber, decimals = 2) => {
  if (!bn) return 0;
  try {
    return numberWithCommas(
      parseFloat(utils.formatUnits(bn)).toFixed(decimals)
    );
  } catch (e) {
    return bn;
  }
};
export const parseBigNumber1 = (bn: BigNumber, decimals = 2) => {
  if (!bn) return 0;
  try {
    return parseFloat(utils.formatUnits(bn)).toFixed(decimals);
  } catch (e) {
    return bn;
  }
};
export const parseBigNumberNoFixed = (bn: BigNumber) => {
  if (!bn) return 0;
  try {
    return parseFloat(utils.formatUnits(bn));
  } catch (e) {
    return bn;
  }
};

function numberWithCommas(x: string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const ContractActionError = (e: any) => {
  if (!e) return "";
  if (typeof e === "string") return e;
  if (typeof e !== "object") return String(e);
  if (e.code === 4001) return ""; // 用户拒绝
  let message = String(e.message) || String(e) || "";
  if (e.data && typeof e.data === "object") {
    if (e.data.message) message = `${message} : ${e.data.message}`;
  }
  return message;
};

export const parseTransactionByContract = (
  contract: Contract,
  transaction: providers.TransactionReceipt
) => {
  transaction.logs = transaction.logs || [];
  return transaction.logs
    .filter((log) => {
      if (log.address !== contract.address) return false;
      return true;
    })
    .map((log) => {
      const event = contract.interface.parseLog(log);
      return { log, event };
    });
};
