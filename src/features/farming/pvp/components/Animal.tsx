import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";
import React, { useContext, useEffect, useMemo, useState } from "react";

import close from "assets/icons/close.png";

import { Panel } from "components/ui/Panel";
import { Tab } from "components/ui/Tab";

import { queryBaglist } from "hooks/WolfConfig";
import { ERRORS } from "lib/errors";
import { useTranslation } from "react-i18next";
import { WolfUserGoods } from "hooks/modules/WolfUserGoods";
import { isMainThread } from "worker_threads";
import { Animals } from "./Animals";

interface Props {
  onClose: () => void;
}

const TAB_CONTENT_HEIGHT = 380;

export const Animal: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const { gameService, shortcutItem } = useContext(Context);
  const [game] = useActor(gameService);
  const inventory = game.context.state.inventory;

  // const [inventoryItems] = useState<InventoryItemName[]>(
  //   makeInventoryItems(inventory)
  // );
  const [selectedItem, setSelectedItem] = useState<WolfUserGoods>();

  const [allItems, setAllItems] = useState<WolfUserGoods[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const loadBagItems = async () => {
    setIsLoading(true);
    try {
      const items = await queryBaglist();

      setAllItems(items.filter((val: any) => val.goodsType == "Animal"));

      setIsLoading(false);
    } catch (e: any) {
      if (e.message === ERRORS.SESSION_EXPIRED) {
        gameService.send("EXPIRED");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBagItems();
  }, []);

  return (
    <Panel className="pt-5 relative  ">
      <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
        <div className="flex">
          <Tab className="flex items-center">
            <span className="text-xs sm:text-sm overflow-hidden text-ellipsis">
              {t("Animal")}
            </span>
          </Tab>
        </div>
        <img
          src={close}
          className="h-6 cursor-pointer mr-2 mb-1"
          onClick={onClose}
        />
      </div>
      {isLoading ? (
        <div
          className="flex flex-col"
          style={{ minHeight: TAB_CONTENT_HEIGHT }}
        >
          <div className="mt-2">
            <span className="text-shadow loading mt-2">Loading</span>
          </div>
        </div>
      ) : (
        <Animals tabName={"Animal"} tabItems={allItems} onClose={onClose} />
      )}
    </Panel>
  );
};
