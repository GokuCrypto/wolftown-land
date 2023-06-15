import React, { useContext, useState, useEffect } from "react";
import { useActor } from "@xstate/react";
import classNames from "classnames";
import Decimal from "decimal.js-light";
import ReCAPTCHA from "react-google-recaptcha";
import close from "assets/icons/close.png";

import token from "assets/wt/balance.png";
import { Modal } from "react-bootstrap";
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
import backgroundImages from "public/images/farme1.png"
import { useTranslation } from "react-i18next";
import {
  queryBagByType,
  adventureTeam
} from "hooks/WolfConfig";
import {
  reward,
  synthesis,
  getWolfUserGoodsToChainList,
} from "hooks/WolfConfig";
interface Props {
  isBulk?: boolean;
  onClose: () => void;
}
/*操作台 */

export const AdventureTeam: React.FC<Props> = ({

  onClose,
  isBulk = false,
}) => {
   const [items,setItem] = useState<Partial<Record<any, any>>>({});
  const [selected, setSelected] = useState<any>(Object.values(items)[0]);
  const [selectedNum, setSelectedNum] = useState(0);

  /*   const [selectedIngredientName, setSelectedIngredientName] = useState<string>(
    Object.values(items)[0].name
  ); */
  const { setToast } = useContext(ToastContext);
  const { gameService, shortcutItem } = useContext(Context);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const [landBuilditems, setLandBuilditems] = useState(Object.values(items));
  const [landMaxBuilditems, SetlandMaxBuilditems] = useState(
    Object.values(items)
  );
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [
    {
      context: { state },
    },
  ] = useActor(gameService);
  const [harvestedItems, setHarvestedItems] = useState([]);
  const [harvestedAmounts, setHarvestedAmounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bagAnimal, setBagAnimal] = useState<WolfUserGoods[]>();
  const [bagLand, setBagLand] = useState<WolfUserGoods[]>();
  const [bagShit, setBagShit] = useState<WolfUserGoods[]>();
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const loadBagByType = async () => {
    setIsLoading(true);
    try {
      console.log("not Animal???");
      const result = await queryBagByType("Animal", "");
      if (result) {
        setBagAnimal(result?.filter((val: any) => val.landLock != 1));
      }
      console.log("bagAnimal", result);
    
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


    for (var i = 0; i < landBuilditems.length; i++) {
      if (landBuilditems[i].goodsName.indexOf("Field") == -1) {
        animals = animals + landBuilditems[i].goodsName + "@";
      }
    }

    const result = await adventureTeam( animals);

    if (!result.success) {
      setMessage(result.message);
    } else {
      setMessage("Land succeeded!");
    }
  };


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const Action = () => {
    return (
      <div>
        {/*   <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          {t("Auto")}
        </label> */}
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
          {t("Clear")}
        </Button>
      </div>
    );
  };

  return (
    
    <div className="flex">


      <OuterPanel className="flex-1 w-2/3" style={{backgroundImage:`url(${backgroundImages})`} as {[key: string]: React.CSSProperties}}>
      <div className="w-3/5 flex flex-wrap h-fit">
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
         {/* {Array.from({ length: 20 }).map((_, idx) => (
      <Box
        isSelected={selected.goodsName === landBuilditems[idx]?.goodsName}
        key={idx}
        onClick={() => {
          setSelected(landBuilditems[idx]);
          setSelectedNum(idx);
        }}
        image={landBuilditems[idx]?.goodsUrl}
      />
    ))} */}
      </div>
      </OuterPanel>
      <OuterPanel className="flex-1 w-2/3">
        <div className="flex flex-col justify-center items-center p-2 relative">
          <span className="text-shadow text-center">{t("My animals")}</span>
          <div
            style={{
              height: "220px",
              overflowY: "scroll",
              paddingRight: "20px",
            }}
          >
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
