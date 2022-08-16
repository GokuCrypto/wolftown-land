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
type Tab = "deposit" | "withdraw";

export const Balance: React.FC = () => {
  const { t } = useTranslation();
  const { gameService } = useContext(Context);
  const [game] = useActor(gameService);
  const [isShown, setIsShown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [currentTab, setCurrentTab] = useState<Tab>("deposit");
  // const [inventoryItems] = useState<InventoryItemName[]>(
  //   makeInventoryItems(inventory)
  // );
  /*   const [selectedItem, setSelectedItem] = useState<InventoryItemName>(); */

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab);
  };

  return (
    <div>
      <InnerPanel className="fixed top-2 right-2 z-50 flex items-center shadow-lg cursor-pointer">
        <img
          src={token}
          className="w-8 img-highlight"
          onClick={() => setIsOpen(true)}
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
      </InnerPanel>
      <Modal centered scrollable show={isOpen} onHide={() => setIsOpen(false)}>
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
            </div>
            <img
              src={close}
              className="h-6 cursor-pointer mr-2 mb-1"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {currentTab === "deposit" && "deposit"}
          {currentTab === "withdraw" && "withdraw"}
        </Panel>
      </Modal>
    </div>
  );
};
