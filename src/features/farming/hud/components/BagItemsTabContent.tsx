import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import { OuterPanel } from "components/ui/Panel";
import Decimal from "decimal.js-light";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { WolfMarket } from "hooks/modules/WolfMarket";
import Datetime from "react-datetime";

import { reward } from "hooks/WolfConfig";
import { BagItem } from "../lib/types";

import { marketAdd } from "hooks/WHashConfig";

const ITEM_CARD_MIN_HEIGHT = "148px";

interface Props {
  tabName: string;
  tabItems: BagItem[];
  selectedItem?: BagItem;
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

export const BagItemsTabContent = ({
  tabName,
  tabItems,
  selectedItem,
}: Props) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [confirmation, setConfirmation] = useState("Send to Chain");
  const [message, setMessage] = useState("");
  const [confirmationSynthesis, setConfirmationSynthesis] =
    useState("Synthesis");

  // const { ref: itemContainerRef, showScrollbar } =
  //   useShowScrollbar(TAB_CONTENT_HEIGHT);
  // const [scrollIntoView] = useScrollIntoView();
  const [selected, setSelected] = useState<BagItem | undefined>(
    selectedItem || tabItems[0]
  );

  const [price, setPrice] = useState(new Decimal(0));
  const [coinType, setCoinType] = useState("BUSD");
  const [type, setType] = useState("Price");
  const [dateValue, setDateValue] = useState<any>(new Date());

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setPrice(new Decimal(0));
    } else {
      setPrice(new Decimal(Number(e.target.value)));
    }
  };

  const onSelecttChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      setCoinType("BUSD");
    } else {
      setCoinType(e.target.value);
    }
  };

  const onSelecttTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      setType("Price");
    } else {
      setType(e.target.value);
    }
  };

  var valid = (current: any) => {
    return current.isAfter(new Date());
  };

  useEffect(() => {
    if (selectedItem) setSelected(selectedItem);
  }, [selectedItem]);

  const Action = () => {
    const handleNextSong = async (goods: BagItem) => {
      const wolfMarket = new WolfMarket();
      wolfMarket.goodsName = goods.name.replace("\\n", "");
      if (price.eq(0)) {
        setMessage("Please fill in the selling price!");
        return;
      }
      wolfMarket.price = price.toNumber();
      wolfMarket.currency = coinType;
      if (type == "Price") {
        wolfMarket.type = "0";
      } else {
        wolfMarket.type = "1";
        wolfMarket.biddingEndTime = dateFormat(
          dateValue,
          "yyyy-MM-dd hh:mm:ss"
        );
      }
      console.log("wolfMarket", wolfMarket);
      const result = await marketAdd(wolfMarket);
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
            if (selected) {
              handleNextSong(selected);
            }
          }}
        >
          sell out
        </Button>
        <span className="text-xs text-base"> {message} </span>
      </div>
    );
  };

  return (
    <>
      <div className="flex" style={{ minHeight: TAB_CONTENT_HEIGHT }}>
        <div className="w-3/5 flex flex-wrap h-fit">
          {tabItems.length > 0 ? (
            tabItems.map((item) => (
              <Box
                isSelected={selected?.name === item.name}
                key={item.name}
                onClick={() => setSelected(item)}
                image={item.image}
                count={new Decimal(item.amount)}
              />
            ))
          ) : (
            <span className="mt-2 ml-2 text-shadow">{t("No item")}</span>
          )}
        </div>
        <OuterPanel className="flex-1 w-1/3">
          <div className="flex flex-col justify-center items-center p-2 relative">
            {selected && (
              <span className="w-12 text-center -mt-4 sm:mr-auto bg-blue-600 text-shadow border text-xxs p-1 rounded-md">
                {selected?.amount}
              </span>
            )}
            {/*<span className="text-shadow text-center">{selected?.name}</span>*/}
            <img
              src={selected?.image}
              className="h-48 img-highlight mt-1"
              alt={selected?.name}
            />
            <span className="text-shadow text-center mt-2 sm:text-sm">
              {selected?.name}
            </span>
            <span className="text-shadow text-center mt-2 sm:text-sm">
              {"------------"}
            </span>
            <span className="text-shadow text-center mt-2 sm:text-sm">
              {"Selling price"}
            </span>
            <span className="flex items-center mt-2">
              <input
                onChange={onInputChange}
                value={
                  typeof price === "string"
                    ? ""
                    : price.toDecimalPlaces(2, Decimal.ROUND_DOWN).toNumber()
                }
                className="ml-20 shadow-inner shadow-black bg-brown-200 p-2 w-50"
              />
            </span>
            <span className="text-shadow text-center mt-2 sm:text-sm">
              {"------------"}
            </span>
            <span className="text-shadow text-center mt-2 sm:text-sm">
              {"Coin Type of sale"}
            </span>
            <span className="text-shadow text-center mt-2 sm:text-sm">
              <select
                className="text-shadow text-center mt-2 sm:text-sm bg-brown-200"
                defaultValue={coinType}
                onChange={onSelecttChange}
              >
                <option value={"WTWOOL"}>WTWOOL</option>
                <option value={"BUSD"}>BUSD</option>
                <option value={"WTMILK"}>WTMILK</option>
              </select>
            </span>

            <span className="text-shadow text-center mt-2 sm:text-sm">
              <select
                className="text-shadow text-center mt-2 sm:text-sm bg-brown-200"
                defaultValue={type}
                onChange={onSelecttTypeChange}
              >
                <option value={"Price"}>Price</option>
                <option value={"Bidding"}>Bidding</option>
              </select>
            </span>
            {type == "Bidding" && (
              <>
                {" "}
                <span className="text-shadow text-center mt-2 sm:text-sm">
                  {"------------"}
                </span>
                <span className="text-shadow text-center mt-2 sm:text-sm">
                  {"Auction deadline"}
                </span>{" "}
                <span className="text-shadow text-center mt-2 sm:text-sm">
                  {" "}
                  <Datetime
                    locale="zh-ch"
                    dateFormat="YYYY-MM-DD"
                    timeFormat="HH:mm:ss"
                    onChange={(e) => {
                      setDateValue(e);
                    }}
                    isValidDate={valid}
                  />
                </span>
              </>
            )}

            {Action()}
          </div>
        </OuterPanel>
      </div>
    </>
  );
};
