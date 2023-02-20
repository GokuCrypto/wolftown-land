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

import { queryBagByType, putLand, reapingLand } from "hooks/WolfConfig";
import {
  reward,
  synthesis,
  getWolfUserGoodsToChainList,
} from "hooks/WolfConfig";
import { t } from "i18next";
interface Props {
  items: Partial<Record<any, any>>;
  landData?: any;
  isBulk?: boolean;
  onClose: () => void;
  shitData?: any;
}
/*操作台 */
export const LandItems: React.FC<Props> = ({
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

  const [shitName, setShitName] = useState<any>({
    goodsName: shitData == "" ? shitData : "Field Shit 1",
    goodsUrl:
      shitData == "Animal feces"
        ? "https://img.wolftown.games/bag/shit.gif"
        : shitData == "Animal feces ball"
        ? "https://img.wolftown.games/bag/shitball.gif"
        : "https://img.wolftown.games/other/blank.png",
    id: landData.id,
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
  const [bagAnimal, setBagAnimal] = useState<WolfUserGoods[]>();
  const [bagLand, setBagLand] = useState<WolfUserGoods[]>();
  const [bagShit, setBagShit] = useState<WolfUserGoods[]>();

  const loadBagByType = async () => {
    setIsLoading(true);
    try {
      console.log("not Animal???");
      const result = await queryBagByType("Animal", "");
      if (result) {
        setBagAnimal(result?.filter((val: any) => val.landLock != 1));
      }
      console.log("bagAnimal", result);
      const result2 = await queryBagByType("Equip", "Land-");
      if (result2) {
        setBagLand(result2);
      }
      console.log("bagLand", result2);

      const result3 = await queryBagByType("Meterial", "Animal feces");
      if (result3) {
        setBagShit(result3);
      }
      console.log("bagShit", result3);

      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBagByType();
  }, []);

  console.log("buildAnimal", landBuilditems);

  const handleNextLand = async () => {
    //提交数据

    let animals = "";

    if (landInfo.goodsName == "Field Land 1") {
      setMessage("Land Please select land!");
      return false;
    }

    for (var i = 0; i < landBuilditems.length; i++) {
      if (landBuilditems[i].goodsName.indexOf("Field") == -1) {
        animals = animals + landBuilditems[i].goodsName + "@";
      }
    }

    let shit = "";
    if (shitName.goodsName != "Field Shit 1") {
      shit = shitName.goodsName;
    }

    const result = await putLand(landInfo.goodsName, animals, shit);

    if (!result.success) {
      setMessage(result.message);
    } else {
      setMessage("Land succeeded!");
    }
  };
  /**收割土地 */
  const handleNextReaping = async () => {
    //提交数据

    let animals = "";

    if (landInfo.goodsName == "Field Land 1") {
      setMessage("Land Please select land!");
      return false;
    }

    const result = await reapingLand(landInfo.id);

    if (!result.success) {
      setMessage(result.message);
    } else {
      setMessage("Land succeeded!");
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
            ]);
            setSelected({
              goodsName: "Field 1",
              goodsUrl: "https://img.wolftown.games/other/blank.png",
            });
          }}
        >
          Clear
        </Button>
        {landData.landId ? (
          <>
            <Button
              className="text-xs mt-1"
              onClick={() => {
                handleNextReaping();
              }}
            >
              Reaping
            </Button>
          </>
        ) : (
          <>
            <Button
              className="text-xs mt-1"
              onClick={() => {
                handleNextLand();
              }}
            >
              Confirm
            </Button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex">
      <div className="w-3/5 flex flex-wrap h-fit">
        <span className="w-100 text-shadow text-center">{t("Land")}</span>
        <Box key={landInfo.goodsName} image={landInfo.goodsUrl} />
        <span className="w-100 text-shadow text-center">{t("Animal")}</span>
        {Object.values(landBuilditems).map((item, idx) => (
          <Box
            isSelected={selected.goodsName === item.goodsName}
            key={item.goodsName}
            onClick={() => {
              setSelected(item);
              setSelectedNum(idx);
            }}
            image={item.goodsUrl}
          />
        ))}
        <span className="w-100 text-shadow text-center">
          {t("Animal feces")}
        </span>
        <Box key={shitName.goodsName} image={shitName.goodsUrl} />
        <span
          style={{ fontSize: "3px" }}
          className="w-100 text-shadow text-center "
        >
          {t("Animal manure is a very good fertilizer")}
        </span>
      </div>

      <OuterPanel className="flex-1 w-2/3">
        <div className="flex flex-col justify-center items-center p-2 relative">
          <span className=" text-shadow text-center">{t("My Land")}</span>

          {bagLand?.map((item) => (
            <Box
              key={item.goodsName}
              image={item.goodsUrl}
              onClick={() => {
                setLandinfo({
                  goodsName: item.goodsName,
                  goodsUrl: item.goodsUrl,
                });
              }}
            />
          ))}

          <div className="border-t border-white w-full mt-2 pt-1">
            <div className="flex justify-center items-end"></div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center p-2 relative">
          <span className=" text-shadow text-center">{t("Animal feces")}</span>

          {bagShit?.map((item) => (
            <Box
              key={item.goodsName}
              image={item.goodsUrl}
              onClick={() => {
                setShitName({
                  goodsName: item.goodsName,
                  goodsUrl: item.goodsUrl,
                });
              }}
            />
          ))}

          <div className="border-t border-white w-full mt-2 pt-1">
            <div className="flex justify-center items-end"></div>
          </div>
        </div>
      </OuterPanel>
      <OuterPanel className="flex-1 w-2/3">
        <div className="flex flex-col justify-center items-center p-2 relative">
          <span className="text-shadow text-center">{t("My animals")}</span>

          {bagAnimal?.map((item) => (
            <Box
              key={item.goodsName}
              image={item.goodsUrl}
              onClick={() => {
                let landBuilditems2 = landBuilditems;

                if (
                  JSON.stringify(landBuilditems).indexOf(item.goodsName) == -1
                ) {
                  landBuilditems2[selectedNum] = {
                    goodsName: item.goodsName,
                    goodsUrl: item.goodsUrl,
                  };
                  setLandBuilditems(landBuilditems2);

                  setSelected({
                    goodsName: item.goodsName,
                    goodsUrl: item.goodsUrl,
                  });
                }
              }}
            />
          ))}

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
