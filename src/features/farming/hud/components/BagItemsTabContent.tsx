import React, { useEffect, useState, useContext } from "react";
import Decimal from "decimal.js-light";
import { Box } from "components/ui/Box";
import { OuterPanel } from "components/ui/Panel";
import { ITEM_DETAILS } from "features/game/types/images";
import { InventoryItemName } from "features/game/types/game";
import { useTranslation } from "react-i18next";
import { SEEDS, CropName } from "features/game/types/crops";
import { Button } from "components/ui/Button";
import { Context } from "features/game/GameProvider";
import { WolfUserGoodsToChain } from "../lib/types";

import timer from "assets/icons/timer.png";
import lightning from "assets/icons/lightning.png";

import { secondsToMidString } from "lib/utils/time";
import classNames from "classnames";
import { useShowScrollbar } from "lib/utils/hooks/useShowScrollbar";
import { useScrollIntoView } from "lib/utils/hooks/useScrollIntoView";
import { Inventory, TabItems } from "./InventoryItems";
import { getShortcuts } from "../lib/shortcuts";
import { hasBoost } from "features/game/lib/boosts";
import { getCropTime } from "features/game/events/plant";
import { getKeys } from "features/game/types/craftables";
import { BagItem } from "../lib/types";
import { ERRORS } from "lib/errors";
import {
  reward,
  synthesis,
  getWolfUserGoodsToChainList,
} from "hooks/WolfConfig";

const ITEM_CARD_MIN_HEIGHT = "148px";

interface Props {
  tabName: string;
  tabItems: BagItem[];
  selectedItem?: BagItem;
  // onClick: (item: BagItem) => void;
}

const TAB_CONTENT_HEIGHT = 384;

interface Props {
  onClose: () => void;
}

// const isSeed = (selectedItem: InventoryItemName) => selectedItem in SEEDS();

export const BagItemsTabContent = ({
  tabName,
  tabItems,
  selectedItem,
}: Props) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [confirmation, setConfirmation] = useState("Send to Chain");
  const [message, setMessage] = useState("");
  const [confirmationSynthesis, setConfirmationSynthesis] =
    useState("Synthesis");

  // const { ref: itemContainerRef, showScrollbar } =
  //   useShowScrollbar(TAB_CONTENT_HEIGHT);
  // const [scrollIntoView] = useScrollIntoView();
  const [selected, setSelected] = useState<BagItem | undefined>(
    selectedItem || tabItems[0]
  );

  useEffect(() => {
    if (selectedItem) setSelected(selectedItem);
  }, [selectedItem]);

  //兑换到链上
  const handleNextReward = async (goodsName: string) => {
    const result = await reward(goodsName);

    if (!result.success) {
      setMessage(result.message);
    } else {
      setMessage("Request succeeded!");
    }
  };

  return (
    <>
      <div className="flex" style={{ minHeight: TAB_CONTENT_HEIGHT }}>
        <div className="w-3/5 flex flex-wrap h-fit">
          {tabItems.length > 0 ? (
            tabItems.map((item) => (
              <Box
                isSelected={selected?.name === item.name}
                key={item.name}
                onClick={() => setSelected(item)}
                image={item.image}
                count={new Decimal(item.amount)}
              />
            ))
          ) : (
            <span className="mt-2 ml-2 text-shadow">{t("No item")}</span>
          )}
        </div>
        <OuterPanel className="flex-1 w-1/3">
          <div className="flex flex-col justify-center items-center p-2 relative">
            {selected && (
              <span className="w-12 text-center -mt-4 sm:mr-auto bg-blue-600 text-shadow border text-xxs p-1 rounded-md">
                {selected?.amount}
              </span>
            )}
            {/*<span className="text-shadow text-center">{selected?.name}</span>*/}
            <img
              src={selected?.image}
              className="h-48 img-highlight mt-1"
              alt={selected?.name}
            />
            <span className="text-shadow text-center mt-2 sm:text-sm">
              {selected?.name}
            </span>

            <span className="text-xs">
              <span className="text-xs text-base"> {message} </span>
            </span>
          </div>
        </OuterPanel>
      </div>
    </>
  );
};
