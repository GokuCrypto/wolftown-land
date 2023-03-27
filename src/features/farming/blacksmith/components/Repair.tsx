import React, { useContext, useState, useEffect } from "react";
import { useActor } from "@xstate/react";
import classNames from "classnames";
import Decimal from "decimal.js-light";
import ReCAPTCHA from "react-google-recaptcha";

import token from "assets/wt/balance.png";

import { Box } from "components/ui/Box";
import { OuterPanel } from "components/ui/Panel";
import { Button } from "components/ui/Button";
import { ToastContext } from "features/game/toast/ToastQueueProvider";
import { Context } from "features/game/GameProvider";
import { ITEM_DETAILS } from "features/game/types/images";
import { CraftableItem } from "features/game/types/craftables";
import { InventoryItemName } from "features/game/types/game";
import { Stock } from "components/ui/Stock";
import { getContractHandler } from "hooks/ethereum";
import {
  reward,
  synthesis,
  getWolfUserGoodsToChainList,
} from "hooks/WolfConfig";
import { ERRORS } from "lib/errors";
interface Props {
  items: Partial<Record<InventoryItemName, CraftableItem>>;
  isBulk?: boolean;
  onClose: () => void;
}

export interface WolfUserGoodsToChain {
  id: string;
  sign: string;
  name: string;
  image: string;
  goodsFalseId: string;
  owner: string;
  attribute: string; //0待核销   1已核销
  ctime: Date;
}

export const Repair: React.FC<Props> = ({ items, onClose, isBulk = false }) => {
  const [selected, setSelected] = useState<WolfUserGoodsToChain>();
  const { setToast } = useContext(ToastContext);
  const { gameService, shortcutItem } = useContext(Context);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [
    {
      context: { state },
    },
  ] = useActor(gameService);
  const inventory = state.inventory;

  useEffect(() => {}, []);

  //兑换到链上
  const handleNextToChain = async (
    owner: string | undefined,
    falseid: string | undefined,
    sign: string | undefined
  ) => {
    //链上操作
    const contractss = await getContractHandler("WTCheckWebFree");

    if (!contractss) return false;
    console.log(
      "WebtoChain",
      "owner:",
      owner,
      "falseid:",
      falseid,
      "sign:",
      sign
    );
    const mygo = await contractss.WebtoChain(owner, falseid, "wolftown", sign);
  };

  //兑换到链上
  const mint = async (owner: string | undefined) => {
    //链上操作
    const contractss = await getContractHandler("WTAnimal");

    const wTCheckWebFree = await getContractHandler("WTCheckWebFree");
    if (!contractss) return false;
    if (!wTCheckWebFree) return false;
    //查询免费可用次数
    const mygo = await wTCheckWebFree.getAddressFreeLength(owner);
    if (mygo > 0) {
      await contractss.mint();
    } else {
      setMessage("Insufficient free minutes");
    }
  };

  return (
    <div className="flex">
      <div className="w-full flex flex-wrap h-fit">
        <span className="text-shadow text-center">
          Use glue to repair siege equipment
        </span>
      </div>
    </div>
  );
};
