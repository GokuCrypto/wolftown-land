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
import { useTranslation } from "react-i18next";
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

export const ExchangeRecord: React.FC<Props> = ({
  items,
  onClose,
  isBulk = false,
}) => {
  const [selected, setSelected] = useState<WolfUserGoodsToChain>();
  const { setToast } = useContext(ToastContext);
  const { gameService, shortcutItem } = useContext(Context);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allItems, setAllItems] = useState<WolfUserGoodsToChain[]>([]);
  const { t } = useTranslation();
  const [
    {
      context: { state },
    },
  ] = useActor(gameService);
  const inventory = state.inventory;

  const loadWolfUserGoodsToChainList = async () => {
    setIsLoading(true);
    try {
      const itemsForChain = await getWolfUserGoodsToChainList();
      console.log(
        "itemsForChain.result.wolfUserGoodsToChainList",
        itemsForChain.result
      );
      setAllItems(
        itemsForChain.result.wolfUserGoodsToChainList.map((item: any) => {
          return {
            id: item.id,
            name: item.goodsName,
            goodsFalseId: item.goodsFalseId,
            image: item.goodsUrl,
            sign: item.sign,
            owner: itemsForChain.result.owner,
            attribute: item.writeOff,
            ctime: item.createTime,
          } as WolfUserGoodsToChain;
        })
      );
      setIsLoading(false);
    } catch (e: any) {
      if (e.message === ERRORS.SESSION_EXPIRED) {
        gameService.send("EXPIRED");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWolfUserGoodsToChainList();
  }, []);

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

  const Action = () => {
    return (
      <>
        <Button
          className="text-xxs sm:text-xs mt-1 whitespace-nowrap"
          onClick={() =>
            handleNextToChain(
              selected?.owner,
              selected?.goodsFalseId,
              selected?.sign
            )
          }
        >
          {t("Send To Chain")}
        </Button>

        <Button
          className="text-xxs sm:text-xs mt-1 whitespace-nowrap"
          onClick={() => mint(selected?.owner)}
        >
          {t("Mint")}
        </Button>
        <span className="text-xs mt-1 text-shadow">{message}</span>
      </>
    );
  };

  return (
    <div className="flex">
      <div className="w-3/5 flex flex-wrap h-fit">
        <span className="text-shadow text-center">
          {" "}
          {t("If the Exchage operation is interrupted, you can continue here")}
        </span>

        {Object.values(allItems).map((item) => (
          <Box
            isSelected={selected?.id === item.id}
            key={item.id}
            onClick={() => setSelected(item)}
            image={ITEM_DETAILS[item.name].image}
            /* count={inventory[item.name]} */
          />
        ))}
      </div>

      {selected ? (
        <OuterPanel className="flex-1 w-1/3">
          <div className="flex flex-col justify-center items-center p-2 relative">
            {/*  <Stock item={selected} /> */}
            <span className="text-shadow text-center">{selected?.name}</span>
            <span className="text-shadow text-center"> Time:</span>
            <span className="text-shadow text-center">{selected?.ctime}</span>
            <img
              src={
                ITEM_DETAILS[
                  typeof selected?.name == "undefined" ? "" : selected?.name
                ].image
              }
              className="h-16 img-highlight mt-1"
              alt={selected?.name}
            />

            {Action()}
          </div>
        </OuterPanel>
      ) : (
        <></>
      )}
    </div>
  );
};
