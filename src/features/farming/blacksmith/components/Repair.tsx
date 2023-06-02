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
  getFiveLevelWeapons,
  repairWeapons
} from "hooks/WolfConfig";
import { ERRORS } from "lib/errors";
interface Props {
  items: Partial<Record<InventoryItemName, CraftableItem>>;
  isBulk?: boolean;
  onClose: () => void;
}
//修复界面
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
  const [showWeapon, setShowWeapon] = useState(false);
  const [message, setMessage] = useState("");
  const [goodsName, setGoodsName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [amount, setamount] = useState<number>(0);
  const [url, setUrl] = useState("");
  const [
    {
      context: { state },
    },
  ] = useActor(gameService);
  const inventory = state.inventory;

  const repairWeapon = async() =>{
    const getFiveLevelWeapon = await getFiveLevelWeapons();
    setamount(getFiveLevelWeapon.result.amount);
    setUrl(getFiveLevelWeapon.result.url);
    setGoodsName(getFiveLevelWeapon.result.goodsName);

    // console.log("weaponsssssssssssssssssssssssssssss",getFiveLevelWeapon.result.amount);
    // console.log("weaponsssssssssssssssssssssssssssss",amount);
    // console.log("weaponsssssssssssssssssssssssssssss",amount);
  
}
  useEffect(() => {
    repairWeapon();
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

  
const repairFiveLevelWeapons = async(goodsName:string) =>{
  const reslut = await repairWeapons(goodsName);
  if (!reslut.success) {
    setMessage(reslut.message);
  } else {
    setMessage("repairWeapon succeeded!");
  }
}
  // if (amount>0){
  //   setShowWeapon(true);
  // }
  // const Action = () => {
    // return (
  //     <>
  //       <Button
  //         className="text-xxs sm:text-xs mt-1 whitespace-nowrap"
  //         onClick={() => repairWeapons(selected.name)}
  //       >
  //         {t("repair")}
  //       </Button>

  //       {/* <Button
  //         className="text-xxs sm:text-xs mt-1 whitespace-nowrap"
  //         onClick={() => mint()}
  //       >
  //         {t("Mint")}
  //       </Button> */}
  //       <span className="text-xs mt-1 text-shadow">{message}</span>
  //     </>
  //   );
  // };
  return (
<div className="flex">
      <div className="w-full flex flex-wrap h-fit">
        <span className="text-shadow text-center">
          {t("Use glue to repair siege equipment")}
          <div>
          {amount > 0 ? (
    <div>
      {t('There are currently')}{amount}{t('items that need to be repaired')}
    <Box
    image={url}
    count={new Decimal(amount)}
    key={goodsName}
    /> 
            <Button
            className="text-xs mt-3"
            onClick={() => repairFiveLevelWeapons(goodsName)
            }
            >
              {t("repair")}
            </Button>
            
            {message}
            
            </div>
    
) : (
  <span className="mt-2 ml-2 text-shadow">{t("There are no items to repair")}</span>
)}
          </div>
          {/* <Button
          className="text-xs mt-3"
           onClick={() => repairFiveLevelWeapons("Cyclone wheel car")}>
            repair
            {amount}
          </Button> */}
        </span>
      </div>
    </div>

  )

  
};
