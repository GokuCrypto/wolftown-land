import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import { OuterPanel, Panel } from "components/ui/Panel";
import Decimal from "decimal.js-light";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { WolfMarket } from "hooks/modules/WolfMarket";
import Datetime from "react-datetime";
import close from "assets/icons/close.png";

import { BagItem } from "../lib/types";
import { Modal } from "react-bootstrap";
import { saveGroundhog } from "hooks/WHashConfig";
import { queryGroundhog, queryGroundhogLog } from "hooks/WolfConfig";
import { WolfUserGoods } from "hooks/modules/WolfUserGoods";
import { WolfGroundhog } from "hooks/modules/WolfGroundhog";

import { WolfGroundhogLog } from "hooks/modules/WolfGroundhogLog";

import { Tab } from "components/ui/Tab";

const ITEM_CARD_MIN_HEIGHT = "148px";

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
  isOpen: boolean;
  onClose: () => void;
}

// const isSeed = (selectedItem: InventoryItemName) => selectedItem in SEEDS();
const syn = [
  "Animal feces ball",
  "bartizan",
  "Catapult",
  "artillery",
  "Rush Car",
  "Cyclone wheel car",
];

const arena = [
  "bartizan",
  "Catapult",
  "artillery",
  "Rush Car",
  "Cyclone wheel car",
];

const build = ["Blacksmith shop", "1v1"];

export const BagItemsGroundhog = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation();

  const [confirmation, setConfirmation] = useState("Send to Chain");
  const [message, setMessage] = useState("");
  const [confirmationSynthesis, setConfirmationSynthesis] =
    useState("Synthesis");

  const [price, setPrice] = useState("0");
  const [amount, setAmount] = useState("1");
  const [type, setType] = useState("Land");
  const [tab, setTab] = useState("Groundhog");
  const [historyList, setHistoryList] = useState<any[]>([]);

  const [wolfGroundhog, setWolfGroundhog] = useState<WolfGroundhog>(
    new WolfGroundhog()
  );

  const [dateValue, setDateValue] = useState<any>(new Date());
  //根据技能得到算力等级

  //背包显示等级

  useEffect(() => {
    queryGroundhog().then((result) => {
      if (result?.result?.wolfGroundhog) {
        setWolfGroundhog(result?.result?.wolfGroundhog);
      }
    });
  }, [isOpen]);

  const queryHistory = async (type: string) => {
    const queryJson = new WolfGroundhogLog();
    queryJson.type = type;
    const result = await queryGroundhogLog(queryJson, "1", "200");

    setHistoryList(result?.result?.records);
  };

  const Action = () => {
    const handleNextSong = async () => {
      if (!wolfGroundhog) return;
      console.log("wolfGroundhogwolfGroundhog", wolfGroundhog);
      const result = await saveGroundhog(wolfGroundhog);
      if (result?.message) {
        setMessage(result.message);
      } else {
        setMessage("Successful save!");
      }
    };

    return (
      <div className="flex flex-col justify-center w-full">
        <Button
          className="span-xs mt-3"
          onClick={() => {
            handleNextSong();
          }}
        >
          {t("Save")}
        </Button>
        <span className="span-xs span-base"> {message} </span>
      </div>
    );
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Panel className="pt-5 relative">
        <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
          <div className="flex">
            <Tab
              className="flex items-center"
              isActive={"Groundhog" === tab}
              onClick={() => {
                setTab("Groundhog");
              }}
            >
              {/*<img src={seeds} className="h-4 sm:h-5 mr-2" />*/}
              <span className="span-xs sm:span-sm overflow-hidden span-ellipsis">
                {t("Groundhog")}
              </span>
            </Tab>
            <Tab
              className="flex items-center"
              isActive={"History" === tab}
              onClick={() => {
                setTab("History");
                queryHistory("Land");
              }}
            >
              {/*<img src={seeds} className="h-4 sm:h-5 mr-2" />*/}
              <span className="span-xs sm:span-sm overflow-hidden span-ellipsis">
                {t("History")}
              </span>
            </Tab>
          </div>
          <img
            src={close}
            className="h-6 cursor-pointer mr-2 mb-1"
            onClick={onClose}
          />
        </div>
        {tab === "History" && (
          <div
            style={{
              minHeight: TAB_CONTENT_HEIGHT,
              maxHeight: TAB_CONTENT_HEIGHT * 1.5,
              overflowY: "auto",
            }}
          >
            <div>
              <select
                className="text-shadow text-center mt-2 sm:text-sm bg-brown-200"
                defaultValue={"Land"}
                onChange={(e) => {
                  queryHistory(e.target.value);
                }}
              >
                <option value={"Land"}>{t("Land")}</option>
                <option value={"Arena"}>{t("Arena")}</option>
                <option value={"Build"}>{t("Build")}</option>
                <option value={"Synthesis"}>{t("Synthesis")}</option>
              </select>
            </div>
            <table>
              <tr className="border" style={{ color: "#4100e4" }}>
                <td className="w-20 items-center"> {t("Status")}</td>
                <td className="w-30 items-center"> {t("Type")}</td>
                <td className="w-30 items-center"> {t("Remark")}</td>
                <td className="w-30 items-center"> {t("Date")}</td>
              </tr>

              <tbody
                style={{
                  fontSize: "10px",
                }}
              >
                {historyList?.map((record) => (
                  <tr className="border">
                    <td className="w-20 ">
                      {t(
                        record.status == 0
                          ? "Fail"
                          : record.status == 1
                          ? "Success"
                          : "Partial Success"
                      )}
                    </td>
                    <td className="w-30 ">{record.type}</td>
                    <td className="w-30 ">{record.remark}</td>
                    <td className="w-30 ">{record.createTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === "Groundhog" && (
          <div style={{ minHeight: TAB_CONTENT_HEIGHT }}>
            <div className="w-full flex flex-wrap h-fit">
              <table className="w-full">
                <tr className="w-full">
                  <td className="flex w-full">
                    <span className="w-1/2"> {t("Groundhog end time")}:</span>
                    <span className="w-1/2" style={{ color: "#ed5b06" }}>
                      {wolfGroundhog?.endTime
                        ? wolfGroundhog?.endTime
                        : t("not enabled")}
                    </span>
                  </td>
                </tr>
                <tr className="w-full">
                  <td className="flex w-full">
                    <span className="w-4/5"> {t("Enable flag")}:</span>
                    <input
                      className="w-5 h-5"
                      type={"checkbox"}
                      defaultChecked={wolfGroundhog?.isOn == 1 ? true : false}
                      onChange={(e) => {
                        if (wolfGroundhog) {
                          wolfGroundhog.isOn = e.target.checked ? 1 : 0;
                          setWolfGroundhog(wolfGroundhog);
                        }
                      }}
                    />
                  </td>
                </tr>

                <tr className="w-full">
                  <td className="flex flex-col  w-full justify-center">
                    ----------------------
                  </td>
                </tr>

                <tr className="w-full">
                  <td className="flex w-full">
                    <span className="w-4/5 black">
                      {"  " + t("Auto land")}:
                    </span>
                    <input
                      className="w-5 h-5"
                      type={"checkbox"}
                      defaultChecked={
                        wolfGroundhog?.landStatus == 1 ? true : false
                      }
                      onChange={(e) => {
                        if (wolfGroundhog) {
                          wolfGroundhog.landStatus = e.target.checked ? 1 : 0;
                          setWolfGroundhog(wolfGroundhog);
                        }
                      }}
                    />
                  </td>
                </tr>

                <tr className="w-full">
                  <td className="flex w-full">
                    <span className="w-4/5">
                      {t("Auto use of fecal balls")}:
                    </span>
                    <input
                      className="w-5 h-5"
                      type={"checkbox"}
                      defaultChecked={
                        wolfGroundhog?.shitStatus == 1 ? true : false
                      }
                      onChange={(e) => {
                        if (wolfGroundhog) {
                          wolfGroundhog.shitStatus = e.target.checked ? 1 : 0;
                          setWolfGroundhog(wolfGroundhog);
                        }
                      }}
                    />
                  </td>
                </tr>

                <tr className="w-full">
                  <td className="flex flex-col  w-full justify-center">
                    ----------------------
                  </td>
                </tr>

                <tr className="w-full">
                  <td className="flex w-full">
                    <span className="w-4/5">{t("Auto Arena")}:</span>
                    <input
                      className="w-5 h-5"
                      type={"checkbox"}
                      defaultChecked={
                        wolfGroundhog?.arenaStatus == 1 ? true : false
                      }
                      onChange={(e) => {
                        if (wolfGroundhog) {
                          wolfGroundhog.arenaStatus = e.target.checked ? 1 : 0;
                          setWolfGroundhog(wolfGroundhog);
                        }
                      }}
                    />
                  </td>
                </tr>

                <tr className="w-full">
                  <td className="  w-full">
                    <span className=" w-full">{t("Auto Arena Config")}:</span>
                    <div
                      className=" w-full border  border-white flex flex-wrap"
                      style={{ color: "#008c07" }}
                    >
                      {arena.map((val) => (
                        <div className={"mr-1"} style={{ minWidth: "45%" }}>
                          <span>{t(val)}:</span>
                          <input
                            className="w-3 h-3"
                            type={"checkbox"}
                            defaultChecked={
                              wolfGroundhog &&
                              wolfGroundhog?.arenaDetails?.indexOf(val) > -1
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              if (wolfGroundhog) {
                                if (e.target.checked) {
                                  if (wolfGroundhog.arenaDetails) {
                                    wolfGroundhog.arenaDetails =
                                      wolfGroundhog.arenaDetails + val + "@";
                                  } else {
                                    wolfGroundhog.arenaDetails = val + "@";
                                  }
                                } else {
                                  wolfGroundhog.arenaDetails =
                                    wolfGroundhog.arenaDetails.replace(
                                      val + "@",
                                      ""
                                    );
                                }

                                setWolfGroundhog(wolfGroundhog);
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>

                <tr className="w-full">
                  <td className="flex flex-col  w-full justify-center">
                    ----------------------
                  </td>
                </tr>

                <tr className="w-full">
                  <td className="flex w-full">
                    <span className="w-4/5">{t("Auto building")}:</span>
                    <input
                      className="w-5 h-5"
                      type={"checkbox"}
                      defaultChecked={
                        wolfGroundhog?.goodsInvite == 1 ? true : false
                      }
                      onChange={(e) => {
                        if (wolfGroundhog) {
                          wolfGroundhog.goodsInvite = e.target.checked ? 1 : 0;
                          setWolfGroundhog(wolfGroundhog);
                        }
                      }}
                    />
                  </td>
                </tr>

                <tr className="w-full">
                  <td className="  w-full">
                    <span className=" w-full">
                      {t("Auto building Config")}:
                    </span>
                    <div
                      className=" w-full border  border-white flex flex-wrap"
                      style={{ color: "#aa25ff" }}
                    >
                      {build.map((val) => (
                        <div className={"mr-1"} style={{ minWidth: "45%" }}>
                          <span>{t(val)}:</span>
                          <input
                            className="w-3 h-3"
                            type={"checkbox"}
                            defaultChecked={
                              wolfGroundhog &&
                              wolfGroundhog?.inviteDetail?.indexOf(val) > -1
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              if (wolfGroundhog) {
                                if (e.target.checked) {
                                  if (wolfGroundhog.inviteDetail) {
                                    wolfGroundhog.inviteDetail =
                                      wolfGroundhog?.inviteDetail + val + "@";
                                  } else {
                                    wolfGroundhog.inviteDetail = val + "@";
                                  }
                                } else {
                                  wolfGroundhog.inviteDetail =
                                    wolfGroundhog.inviteDetail.replace(
                                      val + "@",
                                      ""
                                    );
                                }

                                setWolfGroundhog(wolfGroundhog);
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>

                <tr className="w-full">
                  <td className="flex flex-col  w-full justify-center">
                    ----------------------
                  </td>
                </tr>

                <tr className="w-full">
                  <td className="flex w-full">
                    <span className="w-4/5">{t("Auto Synthesis")}:</span>
                    <input
                      className="w-5 h-5"
                      type={"checkbox"}
                      defaultChecked={
                        wolfGroundhog?.goodsAutoSynthesis == 1 ? true : false
                      }
                      onChange={(e) => {
                        if (wolfGroundhog) {
                          wolfGroundhog.goodsAutoSynthesis = e.target.checked
                            ? 1
                            : 0;
                          setWolfGroundhog(wolfGroundhog);
                        }
                      }}
                    />
                  </td>
                </tr>

                <tr className="w-full">
                  <td className="  w-full">
                    <span className=" w-full">
                      {t("Auto Synthesis config")}:
                    </span>
                    <div
                      className=" w-full border  border-white flex flex-wrap"
                      style={{ color: "#03c9b2" }}
                    >
                      {syn.map((val) => (
                        <div className={"mr-1"} style={{ minWidth: "45%" }}>
                          <span>{t(val)}:</span>
                          <input
                            className="w-3 h-3"
                            type={"checkbox"}
                            defaultChecked={
                              wolfGroundhog &&
                              wolfGroundhog?.synthesisDetail?.indexOf(val) > -1
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              if (wolfGroundhog) {
                                if (e.target.checked) {
                                  if (wolfGroundhog?.synthesisDetail) {
                                    wolfGroundhog.synthesisDetail =
                                      wolfGroundhog?.synthesisDetail +
                                      val +
                                      "@";
                                  } else {
                                    wolfGroundhog.synthesisDetail = val + "@";
                                  }
                                } else {
                                  wolfGroundhog.synthesisDetail =
                                    wolfGroundhog.synthesisDetail.replace(
                                      val + "@",
                                      ""
                                    );
                                }

                                setWolfGroundhog(wolfGroundhog);
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div className="w-full flex flex-wrap h-fit">{Action()}</div>
          </div>
        )}
      </Panel>
    </Modal>
  );
};
