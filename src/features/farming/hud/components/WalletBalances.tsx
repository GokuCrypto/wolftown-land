import React, { useEffect, useState } from "react";
import { Box } from "components/ui/Box";
import { OuterPanel, InnerPanel } from "components/ui/Panel";
import { Button } from "components/ui/Button";

import { ITEM_DETAILS } from "features/game/types/images";
import { InventoryItemName } from "features/game/types/game";

import { SEEDS, CropName } from "features/game/types/crops";

import timer from "assets/icons/timer.png";
import lightning from "assets/icons/lightning.png";
import { useTranslation } from "react-i18next";
import { secondsToMidString } from "lib/utils/time";
import classNames from "classnames";
import { useShowScrollbar } from "lib/utils/hooks/useShowScrollbar";
import { useScrollIntoView } from "lib/utils/hooks/useScrollIntoView";
import { Inventory, TabItems } from "./InventoryItems";
import { getShortcuts } from "../lib/shortcuts";
import { hasBoost } from "features/game/lib/boosts";
import { getCropTime } from "features/game/events/plant";
import { getKeys } from "features/game/types/craftables";
import { WithdrawTokens } from "./WithdrawTokens";
import { getAccountInfo } from "hooks/WolfConfig";
import { Balances, EMPTY_BALANCES } from "../lib/types";
import { airDrop } from "hooks/WolfConfig";

interface Props {
  balances: Balances;
}

const ITEM_CARD_MIN_HEIGHT = "148px";

const TAB_CONTENT_HEIGHT = 380;

export const WalletBalances: React.FC<Props> = ({ balances }) => {
  const { t } = useTranslation();
  const [freshBalances, setFreshBalances] = useState<Balances>(balances);
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   setIsLoading(true);
  //   const load = async () => {
  //     const info = await getAccountInfo()
  //     setFreshBalances(info);
  //     setIsLoading(false);
  //   };
  //   load();
  // }, [balances]);
  const [message, setMessage] = useState("");
  const getAirDrop = async () => {
    //提交数据

    let weapons = "";

    const result = await airDrop();

    if (!result.success) {
      setMessage(result.message);
    } else {
      setMessage("AirDrop succeeded!");
    }
  };

  return (
    <div className="flex flex-col" style={{ minHeight: TAB_CONTENT_HEIGHT }}>
      <div className="mt-2 ml-2">
        <div>
          <div>BUSD: {freshBalances.BUSD}</div>
          <div>WOOL: {freshBalances.WTWOOL}</div>
          <div>MILK: {freshBalances.WTMILK}</div>
          <div>
            --------------
            <img
              className="w-5"
              src="https://img.wolftown.games/token/integral.png"
            />
            --------------
          </div>
          <div>My integral: {freshBalances.integral}</div>
          <div>-------------- --------------</div>
          <div>
            {" "}
            <Button onClick={getAirDrop} className="mb-2">
              {t("Get Test Data")}
            </Button>
          </div>
          <div>-------------- --------------</div>
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};
