import close from "assets/icons/close.png";
import React, { useState } from "react";

import bumpkin from "assets/npcs/bumpkin.png";
import goblin from "assets/npcs/goblin.gif";
import man from "assets/npcs/idle.gif";
import { Panel } from "components/ui/Panel";

import { Tab } from "components/ui/Tab";
import { ITEM_DETAILS } from "features/game/types/images";
import { useTranslation } from "react-i18next";
import { BagItem } from "src/features/farming/hud/lib/types";
import { BuildItem } from "hooks/modules/BuildItem";
import { Button } from "components/ui/Button";
import { buildList, build, buildItemList, buildBatch } from "hooks/WolfConfig";
const TAB_CONTENT_HEIGHT = 340;

//月卡
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MonthlyCard: React.FC<Props> = ({ onClose }) => {
  const [tab, setTab] = useState<string>("craft");
  const { t } = useTranslation();
  const [amount, setAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  return <div className="flex flex-col"></div>;
};
