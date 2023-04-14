import React, { useContext, useState, useEffect } from "react";

import { useActor } from "@xstate/react";
import Decimal from "decimal.js-light";
import { ITEM_DETAILS } from "features/game/types/images";
import { CraftableItem, Ingredient } from "features/game/types/craftables";
import { useTranslation } from "react-i18next";
import { Context } from "features/game/GameProvider";
import { queryBagByName, queryBagByType } from "hooks/WolfConfig";
interface Props {
  item: Ingredient;
}

export const Goods: React.FC<Props> = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bagNumber, setBagNumber] = useState<number>(0);
  const { t } = useTranslation();
  const loadBagByName = async () => {
    setIsLoading(true);

    try {
      if (item.item.indexOf("Land-") == -1) {
        const result = await queryBagByName(item.item);

        if (result.amount) {
          setBagNumber(result.amount);
        } else {
          setBagNumber(0);
        }
      } else {
        let result = await queryBagByType(
          "Equip",
          item.item.replace("Max", "")
        );

        if (item.item.indexOf("MaxLand-") > -1) {
          result = result.filter((val: any) => val.nftId > 60000);
        } else {
          result = result.filter((val: any) => val.nftId < 60000);
        }

        if (result.length) {
          setBagNumber(result.length);
        } else {
          setBagNumber(0);
        }
      }

      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBagByName();
  }, [item]);

  return (
    <span className="text-xs text-shadow text-center mt-2 ">
      (My:{`${bagNumber} `})
    </span>
  );
};
