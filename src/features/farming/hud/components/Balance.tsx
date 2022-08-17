import React, { useContext, useState } from "react";
import { useActor } from "@xstate/react";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import { InnerPanel } from "components/ui/Panel";
import { Panel } from "components/ui/Panel";
import { Tab } from "components/ui/Tab";
import token from "assets/land/1.png";
import close from "assets/icons/close.png";

import { Context } from "features/game/GameProvider";
import Decimal from "decimal.js-light";

import { getUserAddress } from '../../../../hooks/WHashConfig'
import { DepositTabContent } from './DepositTabContent'
import { WithdrawTabContent } from './WithdrawTabContent'
import { WalletBalances } from './WalletBalances'


type Tab = "deposit" | "withdraw" | "balance";

export const Balance: React.FC = () => {
  const { t } = useTranslation();
  const { gameService } = useContext(Context);
  const [game] = useActor(gameService);
  const [isShown, setIsShown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [depositAddress, setDepositAddress] = useState('')

  const [currentTab, setCurrentTab] = useState<Tab>("balance");
  // const [inventoryItems] = useState<InventoryItemName[]>(
  //   makeInventoryItems(inventory)
  // );
  /*   const [selectedItem, setSelectedItem] = useState<InventoryItemName>(); */

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab);
  };

  const openBalance = async () => {
    setIsOpen(true)
    if(!depositAddress) {
      try {
        const address = await getUserAddress()
        if(address) {
          setDepositAddress(address)
        }
      } catch(e) {
        console.log(e)
      }
    }
  }

  return (
    <div>
      <InnerPanel 
        className="fixed top-2 right-2 z-50 flex items-center shadow-lg cursor-pointer"
      >
        <div className="flex items-center" onClick={openBalance}> 
          <img
            src={token}
            className="w-8 img-highlight"
          />
          <span
            className="text-white text-sm text-shadow ml-2"
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            {isShown === false ? (
              game.context.state.balance
                .toDecimalPlaces(4, Decimal.ROUND_DOWN)
                .toString()
            ) : (
              <small>{game.context.state.balance.toString()}</small>
            )}
          </span>
        </div>
      </InnerPanel>
      <Modal size="lg" centered scrollable show={isOpen} onHide={() => setIsOpen(false)}>
        <Panel className="pt-5 relative">
          <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
            <div className="flex">
              <Tab
                className="flex items-center"
                isActive={currentTab === "balance"}
                onClick={() => handleTabClick("balance")}
              >
                {/*<img src={seeds} className="h-4 sm:h-5 mr-2" />*/}
                <span className="text-xs sm:text-sm overflow-hidden text-ellipsis">
                  {t("Balance")}
                </span>
              </Tab>
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
            </div>
            <img
              src={close}
              className="h-6 cursor-pointer mr-2 mb-1"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {currentTab === "balance" && <WalletBalances />}
          {currentTab === "deposit" && <DepositTabContent address={depositAddress} />}
          {currentTab === "withdraw" && <WithdrawTabContent balance="11" />}
        </Panel>
      </Modal>
    </div>
  );
};
