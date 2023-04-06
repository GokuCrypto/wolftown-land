import React, { useContext, useState, useEffect } from "react";
import { useActor } from "@xstate/react";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import { InnerPanel } from "components/ui/Panel";
import { Panel } from "components/ui/Panel";
import { Tab } from "components/ui/Tab";
import token from "assets/land/1.png";
import balance from "assets/wt/wtwool.png";
import close from "assets/icons/close.png";
import { Context } from "features/game/GameProvider";
import Decimal from "decimal.js-light";
import { ERRORS } from "lib/errors";
import { getAccountInfo } from "hooks/WolfConfig";
import { getUserAddress } from "hooks/WHashConfig";
import { NftDepositTab } from "./NftDepositTab";
import { NftWithdrawTab } from "./NftWithdrawTab";
import { NftWithdrawRecords } from "./NftWithdrawRecords";

import { WalletFlow } from "./WalletFlow";

import { WalletBalances } from "./WalletBalances";
import { Balances, EMPTY_BALANCES } from "../lib/types";
import { useInterval } from "lib/utils/hooks/useInterval";

type Tab = "deposit" | "withdraw" | "balance" | "Capital flow" | "records";

export const NftWallet: React.FC = () => {
  const { t } = useTranslation();
  const { gameService } = useContext(Context);
  // console.log("gameService=", gameService.state)
  const [game] = useActor(gameService);
  const [isShown, setIsShown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [depositAddress, setDepositAddress] = useState("");
  const [balances, setBalances] = useState<Balances>(EMPTY_BALANCES);

  const [currentTab, setCurrentTab] = useState<Tab>("deposit");

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab);
  };

  const loadAccount = async () => {
    try {
      const info = await getAccountInfo();
      setBalances(info);
    } catch (e: any) {
      if (e.message === ERRORS.SESSION_EXPIRED) {
        gameService.send("EXPIRED");
      }
    }
  };

  useInterval(async () => {
    await loadAccount();
  }, 10 * 1000);

  useEffect(() => {
    loadAccount();
  }, []);

  const openBalance = async () => {
    setIsOpen(true);
    if (!depositAddress) {
      try {
        const address = await getUserAddress();
        if (address) {
          setDepositAddress(address);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div>
      <InnerPanel className="fixed top-2 right-2 z-50 flex items-center shadow-lg cursor-pointer">
        <div className="flex items-center text-white" onClick={openBalance}>
          <img src={balance} className="w-5 img-highlight" />
          <span className="ml-2">{t("NFT")}</span>
        </div>
      </InnerPanel>
      <Modal
        size="lg"
        centered
        scrollable
        show={isOpen}
        onHide={() => setIsOpen(false)}
      >
        <Panel className="pt-5 relative">
          <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
            <div className="flex">
              <Tab
                className="flex items-center"
                isActive={currentTab === "deposit"}
                onClick={() => handleTabClick("deposit")}
              >
                {/*<img src={seeds} className="h-4 sm:h-5 mr-2" />*/}
                <span className="text-xs sm:text-sm overflow-hidden text-ellipsis">
                  {t("Deposit")}
                </span>
              </Tab>
              <Tab
                className="flex items-center"
                isActive={currentTab === "withdraw"}
                onClick={() => handleTabClick("withdraw")}
              >
                {/*<img src={sunflowerPlant} className="h-4 sm:h-5 mr-2" />*/}
                <span className="text-xs sm:text-sm overflow-hidden text-ellipsis">
                  {t("Withdraw")}
                </span>
              </Tab>
              <Tab
                className="flex items-center"
                isActive={currentTab === "records"}
                onClick={() => handleTabClick("records")}
              >
                {/*<img src={sunflowerPlant} className="h-4 sm:h-5 mr-2" />*/}
                <span className="text-xs sm:text-sm overflow-hidden text-ellipsis">
                  {t("records")}
                </span>
              </Tab>
              {/*<Tab
                className="flex items-center"
                isActive={currentTab === "Capital flow"}
                onClick={() => handleTabClick("Capital flow")}
              >
                <span className="text-xs sm:text-sm overflow-hidden text-ellipsis">
                  {t("Capital flow")}
                </span>
              </Tab>*/}
            </div>
            <img
              src={close}
              className="h-6 cursor-pointer mr-2 mb-1"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {currentTab === "deposit" && (
            <NftDepositTab address={depositAddress} />
          )}
          {currentTab === "withdraw" && <NftWithdrawTab />}
          {currentTab === "records" && <NftWithdrawRecords />}
          {/*{currentTab === "Capital flow" && <WalletFlow />}*/}
        </Panel>
      </Modal>
    </div>
  );
};
