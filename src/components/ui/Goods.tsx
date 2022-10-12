import React, { useContext, useState, useEffect } from "react";

import { useActor } from "@xstate/react";
import Decimal from "decimal.js-light";
import { ITEM_DETAILS } from "features/game/types/images";
import { CraftableItem, Ingredient } from "features/game/types/craftables";

import { Context } from "features/game/GameProvider";
import { queryBagByName } from "hooks/WolfConfig";
interface Props {
  item: Ingredient;
}

export const Goods: React.FC<Props> = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bagNumber, setBagNumber] = useState<number>(0);

  const loadBagByName = async () => {
    setIsLoading(true);

    try {
      console.log("not Load???");

      const result = await queryBagByName(item.item);

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
    <span className="text-xs text-shadow text-center mt-2 ">
      (My:{`${bagNumber} `})
    </span>
  );
};