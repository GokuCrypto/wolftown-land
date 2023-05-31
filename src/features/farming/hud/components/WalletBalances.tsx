import React, { useEffect, useState } from "react";
import { Box } from "components/ui/Box";
import { OuterPanel, InnerPanel } from "components/ui/Panel";
import { Button } from "components/ui/Button";
import { Panel } from "components/ui/Panel";
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
import { Tab } from "components/ui/Tab";
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
          <div>
            WOOL: {freshBalances.WTWOOL}{" "}
            <span
              className="ml-10 text-sm cursor-pointer"
              style={{ color: "#9a6aff" }}
              onClick={() => {
                window.open(
                  "https://pancakeswap.finance/swap?outputCurrency=0xAA15535fd352F60B937B4e59D8a2D52110A419dD",
                  "_blank"
                );
              }}
            >
              {t("Buy WOOL")}
            </span>
          </div>
          <div>
            MILK: {freshBalances.WTMILK}{" "}
            <span
              className="ml-10 text-sm cursor-pointer"
              style={{ color: "#9a6aff" }}
              onClick={() => {
                window.open(
                  "https://pancakeswap.finance/swap?outputCurrency=0x60Ca032Ba8057FedB98F6A5D9ba0242AD2182177",
                  "_blank"
                );
              }}
            >
              {t("Buy MILK")}
            </span>
          </div>
          <div>
            --------------
            <img
              className="w-5"
              src="https://img.wolftown.games/token/integral.png"
            />
            --------------
          </div>
          <div>My integral: {freshBalances.integral}</div>
          <div>My Invite: {freshBalances.Invite}</div>
          <div>-------------- --------------</div>
          <div>
            {" "}
            <Button onClick={getAirDrop} className="mb-2">
              {t("Redeem Points")}
            </Button>
          </div>

          <div>-------------- --------------</div>
          <div>{message}</div>
        </div>
      </div>
      {/* 回购 */}
    </div>
  );
};
