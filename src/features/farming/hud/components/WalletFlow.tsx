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
import { airDrop, transactionFlowList } from "hooks/WolfConfig";

interface Props {}

const ITEM_CARD_MIN_HEIGHT = "148px";

const TAB_CONTENT_HEIGHT = 380;

export const WalletFlow: React.FC<Props> = ({}) => {
  const { t } = useTranslation();

  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    transactionFlowList({}, "1", "10000").then((data) => {
      if (data.success) {
        setRecords(data.result.records);
      }
    });
  }, []);

  return (
    <div className="flex flex-col" style={{ minHeight: TAB_CONTENT_HEIGHT }}>
      <div
        className="mt-2 ml-2"
        style={{
          maxHeight: "350px",
          overflowY: "scroll",
          width: "100%",
        }}
      >
        <table>
          <thead>
            <tr>
              <th className="w-40 "> {t("ID")}</th>
              <th className="w-20 "> {t("Token")}</th>
              <th className="w-30"> {t("Type")}</th>
              <th className="w-30"> {t("Amount")}</th>
              <th className="w-30"> {t("Date")}</th>
            </tr>
          </thead>

          <tbody
            style={{
              fontSize: "10px",
            }}
          >
            {records.map((record) => (
              <tr>
                <td className="w-40 ">{record.id}</td>
                <td className="w-20 ">{record.coin}</td>
                <td className="w-30 ">{record.transferType}</td>
                <td className="w-30 ">{record.amount}</td>
                <td className="w-30 ">{record.createTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
