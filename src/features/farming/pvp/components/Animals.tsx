import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import { OuterPanel } from "components/ui/Panel";
import Decimal from "decimal.js-light";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PvpData } from "hooks/modules/PvpData";
import Datetime from "react-datetime";

import { reward } from "hooks/WolfConfig";
import { WolfUserGoods } from "hooks/modules/WolfUserGoods";

import { pvp } from "hooks/WHashConfig";

const ITEM_CARD_MIN_HEIGHT = "148px";

interface Props {
  tabName: string;
  tabItems: WolfUserGoods[];
  // onClick: (item: BagItem) => void;
}

/**
 * 日期格式化
 * @param {*} date
 * @param {*} fmt
 */
const dateFormat = (date: any, fmt: any) => {
  date = new Date(date);
  var a = ["日", "一", "二", "三", "四", "五", "六"];
  var o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
    w: date.getDay(), // 周
    W: a[date.getDay()], // 大写周
    T: "T",
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

const TAB_CONTENT_HEIGHT = 384;

interface Props {
  onClose: () => void;
}

// const isSeed = (selectedItem: InventoryItemName) => selectedItem in SEEDS();

export const Animals = ({ tabName, tabItems }: Props) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [confirmation, setConfirmation] = useState("Send to Chain");
  const [message, setMessage] = useState("");
  const [confirmationSynthesis, setConfirmationSynthesis] =
    useState("Synthesis");

  // const { ref: itemContainerRef, showScrollbar } =
  //   useShowScrollbar(TAB_CONTENT_HEIGHT);
  // const [scrollIntoView] = useScrollIntoView();
  const [selecteds, setSelecteds] = useState<WolfUserGoods[]>([]);

  const [price, setPrice] = useState(new Decimal(0));

  const [type, setType] = useState("0");
  const [dateValue, setDateValue] = useState<any>(new Date());
  const [isLodding, setIslodding] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setPrice(new Decimal(0));
    } else {
      setPrice(new Decimal(Number(e.target.value)));
    }
  };

  const onSelecttChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      setType("BUSD");
    } else {
      setType(e.target.value);
    }
  };

  var valid = (current: any) => {
    return current.isAfter(new Date());
  };

  const Action = () => {
    const handleNextSong = async () => {
      const pvpData = new PvpData();
      let goodsName = "";

      if (selecteds.length == 0) {
        setMessage("Please select first!");
        return;
      }

      selecteds.map((val) => {
        goodsName += val.goodsName + ",";
      });

      pvpData.goodsName = goodsName;
      pvpData.pvpType = type;

      console.log("pvpData", pvpData);
      const result = await pvp(pvpData);
      if (result?.message) {
        setMessage(result.message);
      } else {
        setMessage("Successful listing in the market!");
      }
    };

    return (
      <div>
        <Button
          className="text-xs mt-3"
          onClick={() => {
            setSelecteds([]);
          }}
        >
          {t("Clear")}
        </Button>
        <Button
          className="text-xs mt-3"
          onClick={() => {
            handleNextSong();
          }}
        >
          {t("Battle")}
        </Button>
        <span className="text-xs text-base"> {message} </span>
      </div>
    );
  };

  console.log(
    "selectedsselectedsselecteds",
    selecteds,
    selecteds?.some((val) => {
      return val.goodsName === "Sheep-92";
    })
  );

  return (
    <>
      <div className="flex" style={{ minHeight: TAB_CONTENT_HEIGHT }}>
        <div className="w-3/5 flex flex-wrap h-fit">
          {tabItems.length > 0 ? (
            tabItems.map((item) => (
              <Box
                isSelected={selecteds?.some((val) => {
                  return val.goodsName === item.goodsName;
                })}
                key={item.goodsName}
                onClick={() => {
                  if (
                    !selecteds?.some((val) => {
                      return val.goodsName === item.goodsName;
                    })
                  ) {
                    selecteds.push(item);
                    setSelecteds(selecteds);
                    setIslodding(!isLodding);
                  }
                }}
                image={item.goodsUrl}
                count={new Decimal(item.amount)}
              />
            ))
          ) : (
            <span className="mt-2 ml-2 text-shadow">{t("No item")}</span>
          )}
        </div>
        <OuterPanel className="flex-1 w-1/3">
          <div className="flex flex-col justify-center items-center p-2 relative">
            {selecteds.map((selected) => (
              <span className="text-shadow text-center mt-2 sm:text-sm flex">
                <img key={selected?.goodsUrl} src={selected?.goodsUrl}></img>{" "}
                {selected?.goodsName}
              </span>
            ))}

            <span className="text-shadow text-center mt-2 sm:text-sm">
              {"------------"}
            </span>
            <span className="text-shadow text-center mt-2 sm:text-sm">
              {"Select the combat mode"}
            </span>
            <span className="text-shadow text-center mt-2 sm:text-sm">
              <select
                className="text-shadow text-center mt-2 sm:text-sm bg-brown-200"
                defaultValue={type}
                onChange={onSelecttChange}
              >
                <option value={"0"}>1V1</option>
                <option value={"1"}>3V3</option>
                <option value={"2"}>Disorderly fighting</option>
              </select>
            </span>

            {Action()}
          </div>
        </OuterPanel>
      </div>
    </>
  );
};
