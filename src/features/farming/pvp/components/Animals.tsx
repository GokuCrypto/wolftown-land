import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import { OuterPanel } from "components/ui/Panel";
import Decimal from "decimal.js-light";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PvpData } from "hooks/modules/PvpData";
import Datetime from "react-datetime";

import { reward } from "hooks/WolfConfig";
import { WolfUserGoods } from "hooks/modules/WolfUserGoods";

import { pvp ,handleClearCoolingTime} from "hooks/WHashConfig";
import { parse } from "path";


const ITEM_CARD_MIN_HEIGHT = "148px";

interface Props {
  tabName: string;
  tabItems: WolfUserGoods[];
  // onClick: (item: BagItem) => void;
}

const TAB_CONTENT_HEIGHT = 384;

interface Props {
  onClose: () => void;
}

export const Animals = ({ tabName, tabItems }: Props) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [confirmation, setConfirmation] = useState("Send to Chain");
  const [message, setMessage] = useState("");

  /**
   * JS 计算两个时间间隔多久（时分秒）
   * @param startTime "2019-10-23 15:27:23"
   * @param endTime "2019-10-23 15:27:55"
   * @return 1天2时3分5秒
   */
  const twoTimeInterval = (endTime: any, startTime: any) => {
    // 开始时间

    // 时间相差秒数
    let dateDiff = endTime.getTime() - startTime.getTime();

    // 计算出小时数
    let hours = Math.floor(dateDiff / (3600 * 1000));

    console.log(
      "hourshourshourshourshours",
      dateDiff,
      startTime,
      endTime,
      hours
    );

    return hours;
  };

  var d1 = new Date();

  const tabItemss = tabItems?.filter(
    (val) =>
      twoTimeInterval(d1, val?.pvpTime ? new Date(val?.pvpTime) : new Date()) >=
        8 || !val?.pvpTime
  );

  const tabItemsItems = tabItems?.filter(
    (val) =>
      twoTimeInterval(d1, val?.pvpTime ? new Date(val?.pvpTime) : new Date()) <
        8 && val?.pvpTime
  );

  const [confirmationSynthesis, setConfirmationSynthesis] =
    useState("Synthesis");

  // const { ref: itemContainerRef, showScrollbar } =
  //   useShowScrollbar(TAB_CONTENT_HEIGHT);
  // const [scrollIntoView] = useScrollIntoView();
  const [selecteds, setSelecteds] = useState<WolfUserGoods[]>([]);

  const [price, setPrice] = useState(new Decimal(0));
  const [showClearButton, setShowClearButton] = useState(false);
  const [type, setType] = useState("1");
  const [dateValue, setDateValue] = useState<any>(new Date());
  const [isLodding, setIslodding] = useState(false);
const [selectedGoodsNames, setSelectedGoodsNames] = useState<string[]>([]);
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
        {showClearButton && (
        <Button
        className="text-xs mt-3"
        onClick={() => {
          // 清除冷却时间的代码...
        handleClearCoolingTime(selectedGoodsNames).then(result => {
          if (result?.message) {
            setMessage(result.message);
          } else {
            setMessage("Successful clearn");
          }
        console.log(result);
        }).catch(error => {
        console.error(error);
        });
 ;
          }}>

            {t("Clear Cooling Time") + "\n" + "500WTWOOL/animal"}
        </Button>
        )}
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
        <div className="w-3/5  ">
          <div
            style={{ height: "200px" }}
            className="w-3/5 flex flex-wrap h-fit "
          >
            {tabItemss?.length > 0 ? (
              tabItemss?.map((item) => (
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
          <div className="w-3/5 flex flex-wrap h-fit">{t("Cooling item")}</div>
          <div className="w-3/5 flex flex-wrap h-fit">
            {tabItemsItems?.length > 0 ? (
              tabItemsItems?.map((item) => (
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
                      // selecteds.push({...item});
                      setSelecteds((prev) => [...prev, {...item}]);
                      setIslodding(!isLodding);
                      setSelectedGoodsNames((prev) => [...prev, item.goodsName]); // 存储选中的 goodsName
                    }
                    setShowClearButton(true);
                   }}
                  image={item.goodsUrl}
                  count={new Decimal(item.amount)}
                />
              ))
            ) : (
              <span className="mt-2 ml-2 text-shadow">{t("No item")}</span>
            )
            }

          </div>
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
              {t("Select the combat mode")}
            </span>
            <span className="text-shadow text-center mt-2 sm:text-sm">
              <select
                className="text-shadow text-center mt-2 sm:text-sm bg-brown-200"
                defaultValue={type}
                onChange={onSelecttChange}
              >
                <option value={"1"}>1 {t("number")}</option>
                <option value={"5"}>5 {t("number")}</option>
                <option value={"10"}>10 {t("number")}</option>
              </select>
            </span>
            <span className="text-shadow text-center mt-2 sm:text-sm">
              {type == "1" && <>500WTWOOL+1000WTMILK</>}
              {type == "5" && <>2500WTWOOL+5000WTMILK</>}
              {type == "10" && <>5000WTWOOL+10000WTMILK</>}
            </span>
            {Action()}
          </div>
        </OuterPanel>
      </div>
    </>
  );
};
