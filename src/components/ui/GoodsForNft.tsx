import React, { useContext, useState, useEffect } from "react";

import { useActor } from "@xstate/react";
import Decimal from "decimal.js-light";
import { ITEM_DETAILS } from "features/game/types/images";
import { CraftableItem } from "features/game/types/craftables";
import { Context } from "features/game/GameProvider";
import { queryBagByName } from "hooks/WolfConfig";
interface Props {
  item: CraftableItem;
}

export const GoodsForNft: React.FC<Props> = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bagNumber, setBagNumber] = useState<number>(0);

  const loadBagByName = async () => {
    setIsLoading(true);

    try {
      console.log("not Load???");

      const result = await queryBagByName(item.name);

      if (result.amount) {
        setBagNumber(result.amount);
      }

      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };
  console.log("bagNumber", bagNumber);

  useEffect(() => {
    loadBagByName();
  }, [item]);

  return (
    <span className="w-32 -mt-4 sm:mr-auto bg-blue-600 text-shadow border text-xxs p-1 rounded-md">
      {`${bagNumber} in Bag`}
    </span>
  );
};
