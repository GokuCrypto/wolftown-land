import close from "assets/icons/close.png";
import React, { useState } from "react";

import bumpkin from "assets/npcs/bumpkin.png";
import goblin from "assets/npcs/goblin.gif";
import man from "assets/npcs/idle.gif";
import { Panel } from "components/ui/Panel";

import { Tab } from "components/ui/Tab";
import { ITEM_DETAILS } from "features/game/types/images";
import { useTranslation } from "react-i18next";
import { Contributor, ContributorRole } from "./constants/contributors";
import { LandItems } from "./constants/LandItems";

const TAB_CONTENT_HEIGHT = 340;

const AVATARS: Record<Contributor["avatar"], string> = {
  bumpkin,
  goblin,
  man,
  // TODO!
  woman: man,
};

const ROLE_BADGES: Record<ContributorRole, string> = {
  artist: ITEM_DETAILS["Artist"].image,
  coder: ITEM_DETAILS["Coder"].image,
  moderator: ITEM_DETAILS["Discord Mod"].image,
};

interface Props {
  onClose: () => void;
  landData?: any;
  animalIds?: any[];
}

export const Contributors: React.FC<Props> = ({
  onClose,
  landData,
  animalIds,
}) => {
  const [tab, setTab] = useState<string>("craft");
  const { t } = useTranslation();

  let BlankGoods = [
    {
      goodsName: "Field 1",
      goodsUrl: "https://img.wolftown.games/other/blank.png",
    },
    {
      goodsName: "Field 2",
      goodsUrl: "https://img.wolftown.games/other/blank.png",
    },
    {
      goodsName: "Field 3",
      goodsUrl: "https://img.wolftown.games/other/blank.png",
    },
  ];

  if (animalIds && animalIds.length > 0) {
    for (var i = 0; i < animalIds?.length; i++) {
      BlankGoods[i].goodsName = animalIds[i].animalId;
      BlankGoods[i].goodsUrl = animalIds[i].url;
    }
  }

  return (
    <Panel className="pt-5 relative">
      <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
        <div className="flex">
          <Tab isActive={tab === "craft"} onClick={() => setTab("craft")}>
            <span className="text-sm text-shadow">{t("Land")}</span>
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
          <LandItems
            items={BlankGoods}
            isBulk
            onClose={onClose}
            landData={landData}
          />
        )}
      </div>
    </Panel>
  );
};
