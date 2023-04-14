import React, { useState } from "react";

import hammer from "assets/icons/hammer.png";
import close from "assets/icons/close.png";

import { Panel } from "components/ui/Panel";
import { Tab } from "components/ui/Tab";

import { SynthesisGoods, ExchangesGoods } from "features/game/types/craftables";
import { ExchangeGoods } from "./ExchangeGoods";
import { ExchangeRecord } from "./ExchangeRecord";
import { Repair } from "./Repair";

import { CraftingItems } from "./CraftingItems";
import { useTranslation } from "react-i18next";

interface Props {
  onClose: () => void;
}

export const Crafting: React.FC<Props> = ({ onClose }) => {
  const [tab, setTab] = useState<string>("craft");
  const { t } = useTranslation();
  return (
    <Panel className="pt-5 relative">
      <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
        <div className="flex">
          <Tab isActive={tab === "craft"} onClick={() => setTab("craft")}>
            <span className="text-sm text-shadow">{t("synthesis")}</span>
          </Tab>
          <Tab isActive={tab === "exchange"} onClick={() => setTab("exchange")}>
            <span className="text-sm text-shadow">{t("exchange")}</span>
          </Tab>
          <Tab isActive={tab === "record"} onClick={() => setTab("record")}>
            <span className="text-sm text-shadow">{t("record")}</span>
          </Tab>
          <Tab isActive={tab === "repair"} onClick={() => setTab("repair")}>
            <span className="text-sm text-shadow">{t("repair")}</span>
          </Tab>
        </div>
        <img
          src={close}
          className="h-6 cursor-pointer mr-2 mb-1"
          onClick={onClose}
        />
      </div>

      <div
        style={{
          minHeight: "200px",
        }}
      >
        {tab === "craft" && (
          <CraftingItems items={SynthesisGoods} isBulk onClose={onClose} />
        )}
        {tab === "exchange" && (
          <ExchangeGoods items={ExchangesGoods} isBulk onClose={onClose} />
        )}

        {tab === "record" && (
          <ExchangeRecord items={SynthesisGoods} isBulk onClose={onClose} />
        )}
        {tab === "repair" && (
          <Repair items={SynthesisGoods} isBulk onClose={onClose} />
        )}
      </div>
    </Panel>
  );
};
