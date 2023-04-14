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

import { queryBagByType, putArena } from "hooks/WolfConfig";

import { t } from "i18next";
import { BigNumber } from "ethers";

interface Props {
  items: Partial<Record<any, any>>;

  isBulk?: boolean;
  onClose: () => void;
  position: string;
}
/*操作台 */
export const ArenaItems: React.FC<Props> = ({
  items,
  onClose,
  isBulk = false,
  position,
}) => {
  const [selected, setSelected] = useState<any>(Object.values(items)[0]);
  const [selectedNum, setSelectedNum] = useState(0);

  const [arenaInfo, setArenainfo] = useState<any>({
    goodsName: "Field 1",
    goodsUrl: "https://img.wolftown.games/other/blank.png",
  });

  /*   const [selectedIngredientName, setSelectedIngredientName] = useState<string>(
    Object.values(items)[0].name
  ); */
  const { setToast } = useContext(ToastContext);
  const { gameService, shortcutItem } = useContext(Context);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const [landBuilditems, setLandBuilditems] = useState(Object.values(items));

  const [message, setMessage] = useState("");
  const [
    {
      context: { state },
    },
  ] = useActor(gameService);

  const [isLoading, setIsLoading] = useState(false);
  const [bagWeapon, setWeapon] = useState<WolfUserGoods[]>();
  const [bagAnimal, setBagAnimal] = useState<WolfUserGoods[]>();

  const loadBagByType = async () => {
    setIsLoading(true);
    try {
      console.log("not Animal???");
      const result = await queryBagByType("Weapon", "");
      if (result) {
        setWeapon(result);
      }
      console.log("bagWeapon", result);
      const result2 = await queryBagByType("Animal", "");
      if (result2) {
        setBagAnimal(result2);
      }
      console.log("bagAnimal", result2);
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBagByType();
  }, []);

  console.log("buildAnimal", landBuilditems);

  const handleNextArena = async () => {
    //提交数据

    let weapons = "";

    if (arenaInfo.goodsName == "Field 1") {
      setMessage("Land Please select land!");
      return false;
    }

    for (var i = 0; i < landBuilditems.length; i++) {
      if (landBuilditems[i].goodsName.indexOf("Field") == -1) {
        weapons = weapons + landBuilditems[i].goodsName + "@";
      }
    }

    const result = await putArena(arenaInfo.goodsName, weapons, position);

    if (!result.success) {
      setMessage(result.message);
    } else {
      setMessage("Arena succeeded!");
    }
  };

  const Action = () => {
    return (
      <div>
        <Button
          className="text-xs mt-1"
          onClick={() => {
            setLandBuilditems([
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
            ]);
            setArenainfo({
              goodsName: "Field 1",
              goodsUrl: "https://img.wolftown.games/other/blank.png",
            });
          }}
        >
          {t("Clear")}
        </Button>

        <Button
          className="text-xs mt-1"
          onClick={() => {
            handleNextArena();
          }}
        >
          {t("Confirm")}
        </Button>
      </div>
    );
  };

  return (
    <div className="flex">
      <div className="w-3/5 flex flex-wrap h-fit">
        <span className="w-100 text-shadow text-center">{t("Animal")}</span>
        <Box key={arenaInfo.goodsName} image={arenaInfo.goodsUrl} />
        <span className="w-100 text-shadow text-center">{t("weapon")}</span>
        {Object.values(landBuilditems).map((item, idx) => (
          <Box
            isSelected={selectedNum === idx}
            key={item.goodsName}
            onClick={() => {
              setSelected(item);
              setSelectedNum(idx);
            }}
            image={item.goodsUrl}
          />
        ))}
      </div>

      <OuterPanel className="flex-1 w-2/3">
        <div className="flex flex-col justify-center items-center p-2 relative">
          <span className=" text-shadow text-center">{t("My Animal")}</span>
            <div style={{ height: "220px", overflowY: "scroll",paddingRight: "20px" }}>
            {bagAnimal?.map((item) => (
            <Box
              key={item.goodsName}
              image={item.goodsUrl}
              onClick={() => {
                setArenainfo({
                  goodsName: item.goodsName,
                  goodsUrl: item.goodsUrl,
                });
              }}
            />
          ))}
            </div>
          <div className="border-t border-white w-full mt-2 pt-1">
            <div className="flex justify-center items-end"></div>
          </div>


        </div>
      </OuterPanel>
      <OuterPanel className="flex-1 w-2/3 ">
      <div className="flex flex-col justify-center items-center p-2 relative">
          <span className=" text-shadow text-center">{t("My weapons")}</span>
          <div style={{ height: "220px", overflowY: "scroll",paddingRight: "20px" }}>
            {bagWeapon?.map((item) => (
              <Box
                key={item.goodsName}
                image={item.goodsUrl}
                count={new Decimal(item.amount)}
                onClick={() => {
                  let landBuilditems2 = landBuilditems;

                  /*   if (
                    JSON.stringify(landBuilditems).indexOf(item.goodsName) == -1
                  ) { */
                  landBuilditems2[selectedNum] = {
                    goodsName: item.goodsName,
                    goodsUrl: item.goodsUrl,
                  };
                  setLandBuilditems(landBuilditems2);

                  setSelected({
                    goodsName: item.goodsName,
                    goodsUrl: item.goodsUrl,
                  });
                  /* } */
                }}
              />
            ))}
          </div>

          <div className="border-t border-white w-full mt-2 pt-1">
            <div className="flex justify-center items-end"></div>
          </div>
          {Action()}
          <span className="text-xs text-base"> {message} </span>
        </div>
      </OuterPanel>
    </div>
  );
};
