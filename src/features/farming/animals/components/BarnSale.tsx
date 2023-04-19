import React, { useContext, useState } from "react";

import close from "assets/icons/close.png";
import market from "assets/icons/market.png";
import { useTranslation } from "react-i18next";
import { MyListItems } from "././MyListItems";
import { WolfTownStoreItems } from "././WolfTownStoreItems";
import { Panel } from "components/ui/Panel";
import { Tab } from "components/ui/Tab";
import { ANIMALS } from "features/game/types/craftables";
import { MarketItems } from "././MarketItems";
import * as Auth from "features/auth/lib/Provider";
import { useActor } from "@xstate/react";

interface Props {
  onClose: () => void;
}

export const BarnSale: React.FC<Props> = ({ onClose }) => {
  const [tab, setTab] = useState("Market");
  const { authService } = useContext(Auth.Context);
  const [authState] = useActor(authService);
  const { t } = useTranslation();

  return (
    <Panel className="pt-5 relative">
      <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
        <div className="flex">
          <Tab isActive={tab === "Market"} onClick={() => setTab("Market")}>
            <img src={market} className="h-5 mr-2" />
            <span className="text-sm text-shadow">{t("Wolf Town Market")}</span>
          </Tab>

          <Tab isActive={tab === "My List"} onClick={() => setTab("My List")}>
            <img src={market} className="h-5 mr-2" />
            <span className="text-sm text-shadow">{t("My List")}</span>
          </Tab>
          <Tab isActive={tab === "Store"} onClick={() => setTab("Store")}>
            <img src={market} className="h-5 mr-2" />
            <span className="text-sm text-shadow">{t("Wolf Town Store")}</span>
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
          minHeight: "600px",
        }}
      >
        {tab === "Market" && <MarketItems onClose={onClose} />}

        {tab === "My List" && <MyListItems onClose={onClose} />}
        {tab === "Store" && <WolfTownStoreItems onClose={onClose} />}
      </div>
    </Panel>
  );
};
