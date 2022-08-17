import React, { useEffect, useState } from "react";
import { Box } from "components/ui/Box";
import { CopyField } from "components/ui/CopyField";

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

const ITEM_CARD_MIN_HEIGHT = "148px";

interface Props {
  address: string;
}

const TAB_CONTENT_HEIGHT = 380;

export const DepositTabContent = ({ address }: Props) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col" style={{ minHeight: TAB_CONTENT_HEIGHT }}>
      <div className="mt-2">
        { t("Deposit Address") }
      </div>
      <div className="mt-2">
        <CopyField text={address} />
      </div>
    </div>
  );
};
