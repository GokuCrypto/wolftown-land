import close from "assets/icons/close.png";
import React, { useState } from "react";

import bumpkin from "assets/npcs/bumpkin.png";
import goblin from "assets/npcs/goblin.gif";
import man from "assets/npcs/idle.gif";
import { Panel } from "components/ui/Panel";

import { Tab } from "components/ui/Tab";
import { ITEM_DETAILS } from "features/game/types/images";
import { useTranslation } from "react-i18next";
import { BagItem } from  "src/features/farming/hud/lib/types"
import { BuildItem } from "hooks/modules/BuildItem";
import { Button } from "components/ui/Button";
import { buildList, build,buildItemList,buildBatch } from "hooks/WolfConfig";
const TAB_CONTENT_HEIGHT = 340;


interface Props {
  onClose: () => void;
   buildGoodsItem:BuildItem;
}

export const Buildpop: React.FC<Props> = ({
  onClose,
   buildGoodsItem,
}) => {
  const [tab, setTab] = useState<string>("craft");
  const { t } = useTranslation();
  const [amount,setAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
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
  const onInputChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/^(\-)*(\d+).*$/, "$1$2"); // 过滤非数字输入
    if (inputValue === "") {
      // 输入为空，设置为0
      setAmount("0");
  } else {
      setAmount(inputValue);
    }
    ;
  }
  console.log("builllllllllllllllld",buildGoodsItem)
  const buildInit = async (ids: string) => {
    setIsLoading(true);
    try {
      const amounts = Number(amount);
      const result = await buildBatch(buildGoodsItem,amounts);

      if (result?.success) {
        setMsg("Success Build");
      } else {
        setMsg(result?.message);
      }

      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
   };
  return (
    <Panel className="pt-5 relative">
      <div className="flex flex-wrap justify-center items-center">
        <p
          style={{ color: "#af1d18", fontSize: "30px" }}
          className="text-xs text-center pt-2"
        >
          {buildGoodsItem.goodsType}
        </p>
        <br />
        <p style={{ color: "red" }}>{msg}</p>
        <br />
        <br />
      </div>
      <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
        <div className="flex">
          <Tab isActive={tab === "craft"} onClick={() => setTab("craft")}>
            <span className="text-sm text-shadow">{t("batchBuild")}</span>
          </Tab>
        </div>
        <img
          src={close}
          className="h-6 cursor-pointer mr-2 mb-1"
          onClick={onClose}
        />
      </div>

      <div style={{ minHeight: "200px" }}>
        <span>{`${t("Please enter the quantity of items")} (${buildGoodsItem.amount} ${t("times")})`}</span>
        <div className="w-20 ml-4 flex justify-center">
                <img src={buildGoodsItem.goodsUrl} className="h-8" />x{buildGoodsItem.amount}
              </div>
        <input
        onChange={onInputChangeAmount}
        value={amount.toString()}
        className="ml-20 shadow-inner shadow-black bg-brown-200 p-2 w-50"
        />
              <div className="w-30 ml-8 flex justify-center">
                <Button
                  className="w-30 bg-brown-200 active:bg-brown-200 "
                  onClick={() => {
                    buildInit(buildGoodsItem.id);
                  }}
                >
                  {t("Build")}
                </Button>
              </div>
      </div>

    </Panel>
  );
};
