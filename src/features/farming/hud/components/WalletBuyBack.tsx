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
import { airDrop, buyback, buybackConfig } from "hooks/WolfConfig";
import { BuybackOrder } from "hooks/modules/BuybackOrder";

import { Tab } from "components/ui/Tab";
interface Props {
  balances: Balances;
}

const ITEM_CARD_MIN_HEIGHT = "148px";

const TAB_CONTENT_HEIGHT = 380;
const inputRegex = RegExp(`^[0-9]*$`);
export const WalletBuyBack: React.FC<Props> = ({ balances }) => {
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

  const [reciveBUSD, setReciveBUSD] = useState(0);
  const [exchangeWtwool, setExchangeWtwool] = useState("");

  const [personSurplus, setPersonSurplus] = useState(0);
  const [totalSurplus, setTotalSurplus] = useState(0);
  const [buybackConfigResult, setBuybackConfigResult] = useState<any>();

  useEffect(() => {
    queryConfig();
  }, []);

  const queryConfig = () => {
    buybackConfig().then((result) => {
      if (result?.result?.buybackConfig) {
        setBuybackConfigResult(result?.result?.buybackConfig);
        setPersonSurplus(result?.result?.personSurplus);
        setTotalSurplus(result?.result?.totalSurplus);
      }
    });
  };

  const handleBuyback = async () => {
    const buybackOrder = new BuybackOrder();
    buybackOrder.num = Number(exchangeWtwool);
    if (!exchangeWtwool) {
      setMessage("WTWOOL is null！");
      return;
    }

    const result = await buyback(buybackOrder);

    if (result?.result) {
      setMessage("Successfully redeemed " + result?.result + " BUSD");

      queryConfig();
    } else {
      setMessage(result?.message);
    }
  };

  const enforcer2 = (type: string, nextUserInput: string) => {
    if (nextUserInput === "" || inputRegex.test(nextUserInput)) {
      if (type === "buyback") {
        setExchangeWtwool(nextUserInput);

        if (buybackConfigResult?.price) {
          setReciveBUSD(
            Number(
              (buybackConfigResult?.price * Number(nextUserInput)).toFixed(5)
            )
          );
        }
      }
    }
  };

  return (
    <div className="flex flex-col" style={{ minHeight: TAB_CONTENT_HEIGHT }}>
      <div className="mt-2 ml-2">
        <div>
          <div>WOOL: {freshBalances.WTWOOL}</div>
          <div>-------------- --------------</div>
          <div>
            {t("Start Time")}: {buybackConfigResult?.startDate}
          </div>
          <div>
            {t("End       Time")}: {buybackConfigResult?.endDate}
          </div>
          <div>-------------- --------------</div>
          <div>
            {t("Total")}:
            {buybackConfigResult?.total ? buybackConfigResult?.total : 0}
            {" WTWOOL"}
          </div>
          <div>
            {t("Remaining limit")}: {personSurplus} {" WTWOOL"}
          </div>
          <div>
            {t("Price")}: {buybackConfigResult?.price} {" WTWOOL"}
          </div>
          <div>-------------- --------------</div>
          <div>
            {t("BUSD")}:
            <input
              className="text-shadow shadow-inner shadow-black bg-brown-200 w-48 p-2 text-right"
              value={reciveBUSD}
              inputMode="decimal"
              autoComplete="off"
              autoCorrect="off"
              type="text"
              pattern="^[0-9]*$"
              minLength={1}
              maxLength={100}
              spellCheck="false"
            />
          </div>
          <div>
            {t("WOOL")}:
            <input
              className="text-shadow shadow-inner shadow-black bg-brown-200 w-48 p-2 text-right"
              onChange={(event) => {
                enforcer2("buyback", event.target.value.replace(/\./g, ""));
              }}
              value={exchangeWtwool}
              inputMode="decimal"
              title={t("Amount")}
              autoComplete="off"
              autoCorrect="off"
              type="text"
              pattern="^[0-9]*$"
              minLength={1}
              maxLength={100}
              spellCheck="false"
              placeholder={t("Limit ") + personSurplus + " WTWOOL"}
            />
          </div>
          <div>-------------- --------------</div>
          <div>
            <Button onClick={handleBuyback} className="mb-2">
              {t("Exchange")}
            </Button>
          </div>

          <div>{message}</div>
        </div>
      </div>
      {/* 回购 */}
    </div>
  );
};
