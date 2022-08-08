import { Button, useWalletModal, ButtonProps } from "@pancakeswap/uikit";
import useAuth from "hooks/useAuth";
import { useTranslation } from "contexts/Localization";
import Trans from "./Trans";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { loginInEth } from "./WolfConfig";
import { connect } from "http2";

import { _getAddress } from "./ethereum";

const getEthInfo = async () => {
  const { account, chainId } = await useWeb3React();
  console.log("钱包地址", account, "链id", chainId);
};

const ConnectWalletButton = ({ children, ...props }: ButtonProps) => {
  const { t } = useTranslation();

  const [connected, setConnected] = useState(false);

  const connectedInfo = async () => {
    const account = await _getAddress();
    if (account && account.length > 10) {
      setConnected(true);
    }
  };

  const { login, logout } = useAuth();
  console.log("accountlogin", login);

  const { onPresentConnectModal } = useWalletModal(login, logout, t);

  connectedInfo();

  const { account, chainId } = useWeb3React();
  console.log("account", account);
  getEthInfo();

  return (
    <Button
      C
      onClick={connected ? loginInEth : onPresentConnectModal}
      {...props}
    >
      <img src={"/images/pic/home_0000s_0025_30.png"} />
      {children || <Trans>Connect Wallet</Trans>}
    </Button>
  );
};

export default ConnectWalletButton;
