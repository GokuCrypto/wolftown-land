import close from "assets/icons/close.png";
import React, { useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import boo from "assets/other/boo5.gif";
import init from "assets/other/init.gif";
import goblin from "assets/npcs/goblin.gif";
import arenabg from "assets/other/arena/arenabg.png";
import { Panel } from "components/ui/Panel";

import { Tab } from "components/ui/Tab";
import { ITEM_DETAILS } from "features/game/types/images";
import { useTranslation } from "react-i18next";
import { Animal } from "./Animal";
import { ArenaItems } from "./ArenaItems";
const TAB_CONTENT_HEIGHT = 340;
interface Props {
  onClose: () => void;
  position?: any;
}

export const Fight: React.FC<Props> = ({ onClose, position }) => {
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
    {
      goodsName: "Field 4",
      goodsUrl: "https://img.wolftown.games/other/blank.png",
    },
    {
      goodsName: "Field 5",
      goodsUrl: "https://img.wolftown.games/other/blank.png",
    },
    {
      goodsName: "Field 6",
      goodsUrl: "https://img.wolftown.games/other/blank.png",
    },
  ];

  return (
    <Panel className="pt-5 relative ">
      <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
        <div className="flex">
          <Tab isActive={tab === "craft"} onClick={() => setTab("craft")}>
            <span className="text-sm text-shadow">{t("Fight Animal")}</span>
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
          <ArenaItems
            position={position}
            items={BlankGoods}
            isBulk
            onClose={onClose}
          />
        )}
      </div>
    </Panel>
  );
};
