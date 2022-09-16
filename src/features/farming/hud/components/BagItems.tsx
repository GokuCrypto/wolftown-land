import React, { useContext, useState, useEffect, useMemo } from "react";
import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";
import { InventoryItemName } from "features/game/types/game";

import seeds from "assets/icons/seeds.png";
import sunflowerPlant from "assets/crops/sunflower/crop.png";
import close from "assets/icons/close.png";

import { Panel } from "components/ui/Panel";
import { Tab } from "components/ui/Tab";

import { SEEDS, CROPS } from "features/game/types/crops";
import {
  FOODS,
  TOOLS,
  FLAGS,
  BLACKSMITH_ITEMS,
  BARN_ITEMS,
  MARKET_ITEMS,
  getKeys,
} from "features/game/types/craftables";
import { RESOURCES } from "features/game/types/resources";

import seed from "assets/crops/beetroot/seed.png";
import crop from "assets/crops/sunflower/crop.png";
import tool from "assets/tools/hammer.png";
import nft from "assets/nfts/gnome.gif";
import food from "assets/crops/wheat/flour.png";
import resource from "assets/resources/wood.png";

import Decimal from "decimal.js-light";
import { InventoryTabContent } from "./InventoryTabContent";
import { ITEM_DETAILS } from "features/game/types/images";
import { useTranslation } from "react-i18next";
import { queryBaglist } from "hooks/WolfConfig";
import { ERRORS } from "lib/errors";
import { BagItem } from "../lib/types";
import { BagItemsTabContent } from "./BagItemsTabContent";

type Tab = "Meterial" | "Equip" | "Weapon" | "Animal";
const TABS = ["Meterial", "Equip", "Weapon", "Animal"];

interface Props {
  onClose: () => void;
}

// export type TabItems = Record<string, { img: string; items: object }>;

// const BASKET_CATEGORIES: TabItems = {
//   Seeds: {
//     img: seed,
//     items: SEEDS(),
//   },
//   Tools: {
//     img: tool,
//     items: TOOLS,
//   },
//   Resources: {
//     img: resource,
//     items: RESOURCES,
//   },
//   Crops: {
//     img: crop,
//     items: CROPS(),
//   },
// };

// const COLLECTIBLE_CATEGORIES: TabItems = {
//   NFTs: {
//     img: nft,
//     items: { ...BLACKSMITH_ITEMS, ...BARN_ITEMS, ...MARKET_ITEMS, ...FLAGS },
//   },
//   Foods: {
//     img: food,
//     items: FOODS(),
//   },
//   Eggs: {
//     img: food,
//     items: {
//       "Pink Egg": ITEM_DETAILS["Pink Egg"],
//       "Purple Egg": ITEM_DETAILS["Purple Egg"],
//       "Red Egg": ITEM_DETAILS["Red Egg"],
//       "Blue Egg": ITEM_DETAILS["Blue Egg"],
//       "Orange Egg": ITEM_DETAILS["Orange Egg"],
//       "Green Egg": ITEM_DETAILS["Green Egg"],
//       "Yellow Egg": ITEM_DETAILS["Yellow Egg"],
//     },
//   },
// };

// export type Inventory = Partial<Record<InventoryItemName, Decimal>>;

// const makeInventoryItems = (inventory: Inventory) => {
//   const items = getKeys(inventory) as InventoryItemName[];
//   return items.filter(
//     (itemName) => !!inventory[itemName] && !inventory[itemName]?.equals(0)
//   );
// };
const TAB_CONTENT_HEIGHT = 380;

export const BagItems: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const { gameService, shortcutItem } = useContext(Context);
  const [game] = useActor(gameService);
  const inventory = game.context.state.inventory;

  const [currentTab, setCurrentTab] = useState<Tab>("Meterial");
  // const [inventoryItems] = useState<InventoryItemName[]>(
  //   makeInventoryItems(inventory)
  // );
  const [selectedItem, setSelectedItem] = useState<BagItem>();

  const [allItems, setAllItems] = useState<BagItem[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const loadBagItems = async () => {
    setIsLoading(true);
    try {
      const items = await queryBaglist();
      setAllItems(
        items.map((item: any) => {
          return {
            id: item.id,
            name: item.goodsName,
            type: item.goodsType,
            image: item.goodsUrl,
            amount: item.amount,
            attribute: item.remark,
          } as BagItem;
        })
      );
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

  const items = useMemo(() => {
    return allItems.filter((i) => i.type === currentTab);
  }, [currentTab, allItems]);

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab);
    setSelectedItem(items[0]);
  };

  return (
    <Panel className="pt-5 relative">
      <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
        <div className="flex">
          {TABS.map((tab) => {
            return (
              <Tab
                key={tab}
                className="flex items-center"
                isActive={currentTab === tab}
                onClick={() => handleTabClick(tab as Tab)}
              >
                {/*<img src={seeds} className="h-4 sm:h-5 mr-2" />*/}
                <span className="text-xs sm:text-sm overflow-hidden text-ellipsis">
                  {t(tab)}
                </span>
              </Tab>
            );
          })}
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
        <BagItemsTabContent
          tabName={currentTab}
          tabItems={items}
          selectedItem={items[0]}
          onClose={onClose}
        />
      )}
    </Panel>
  );
};
