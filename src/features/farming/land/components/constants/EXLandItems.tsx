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
import { CraftableItem, Ingredient } from "features/game/types/craftables";
import { InventoryItemName } from "features/game/types/game";
import { Goods } from "components/ui/Goods";

import { WolfUserGoods } from "hooks/modules/WolfUserGoods";
import { useTranslation } from "react-i18next";
import { queryBagByType, putLand, reapingLand } from "hooks/WolfConfig";
import {
  reward,
  synthesis,
  getWolfUserGoodsToChainList,
} from "hooks/WolfConfig";
import { unlockLand } from "hooks/WHashConfig";
interface Props {
  items: Partial<Record<any, any>>;
  landData?: any;
  isBulk?: boolean;
  onClose: () => void;
  shitData?: any;
}
/*操作台 */

export const ExLandItems: React.FC<Props> = ({
  items,
  onClose,
  isBulk = false,
  landData,
  shitData,
}) => {
  const [selected, setSelected] = useState<any>(Object.values(items)[0]);
  const [selectedNum, setSelectedNum] = useState(0);
  const [landInfo, setLandinfo] = useState<any>({
    goodsName: landData.landId ? landData.landId : "Field Land 1",
    goodsUrl: landData.url
      ? landData.url
      : "https://img.wolftown.games/other/blank.png",
    id: landData.id,
  });

  /*   const [selectedIngredientName, setSelectedIngredientName] = useState<string>(
    Object.values(items)[0].name
  ); */
  const { setToast } = useContext(ToastContext);
  const { gameService, shortcutItem } = useContext(Context);
  const [showCaptcha, setShowCaptcha] = useState(false);

  //   const [landBuilditems, setLandBuilditems] = useState(Object.values(items));
  const [landMaxBuilditems, setLandMaxBuilditems] = useState(
    Object.values(items)
  );
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [
    {
      context: { state },
    },
  ] = useActor(gameService);

  console.log("buildAnimal", landMaxBuilditems);

  /**收割土地 */

  const Action = () => {
    return (
      <div>
        <Button
          className="text-xs mt-1"
          onClick={() => {
            unlockLand()
              .then((result) => {
                if (result?.message) {
                  setMessage(result.message);
                } else {
                  setMessage(" unlockland Successful ");
                }
                console.log(result);
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        >
          {t("Confirm")}
        </Button>
      </div>
    );
  };
  return (
    <div className="flex-1 ">
      <OuterPanel className="flex-1 w-full ">
        <div className="flex flex-col justify-center items-center p-2 relative">
          <span className="text-shadow text-center">
            {t("Unlock requires 10000WTWOOL")}
          </span>
          <div className="border-t border-white w-full mt-2 pt-1">
            <div className="flex justify-center items-end"></div>
          </div>
          {Action()}
          <span className="text-xs text-base"> {message}</span>
        </div>
      </OuterPanel>
    </div>
  );
};
