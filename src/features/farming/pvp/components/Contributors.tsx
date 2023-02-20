import close from "assets/icons/close.png";
import React, { useEffect, useState } from "react";

import bg from "assets/land/1v1.png";
import { Panel } from "components/ui/Panel";

import { PvpData } from "hooks/modules/PvpData";
import { pvpList } from "hooks/WolfConfig";

import battle from "assets/land/battle.gif";
import { Box } from "components/ui/Box";
import { Tab } from "components/ui/Tab";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Animal } from "./Animal";

const TAB_CONTENT_HEIGHT = 340;

interface Props {
  onClose: () => void;
}

export const Contributors: React.FC<Props> = ({ onClose }) => {
  const [tab, setTab] = useState<string>("craft");
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadWolfPvpList = async () => {
    setIsLoading(true);
    try {
      const pvpData = new PvpData();
      pvpData.status = "0";

      console.log("wolfMarket.status ", pvpData.status);
      const result = await pvpList(pvpData, "0", "1000");

      if (result?.result?.records) {
        console.log("result?.result?.records", result?.result?.records);
        setItems(result?.result?.records);
      }

      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  const loadWolfPvpHistoryList = async () => {
    setIsLoading(true);
    try {
      const pvpData = new PvpData();
      console.log("wolfMarket.status ", pvpData.status);
      const result = await pvpList(pvpData, "0", "1000");
      if (result?.result?.records) {
        console.log("result?.result?.records", result?.result?.records);
        setHistory(result?.result?.records);
      }

      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWolfPvpList();
    loadWolfPvpHistoryList();
  }, []);

  return (
    <Panel className="pt-5 relative w-100">
      <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
        <div className="flex">
          <Tab isActive={tab === "craft"} onClick={() => setTab("craft")}>
            <span className="text-sm text-shadow">{t("PVP")}</span>
          </Tab>
        </div>
        <img
          src={close}
          className="h-6 cursor-pointer mr-2 mb-1"
          onClick={onClose}
        />
      </div>

      <div
        style={{
          minHeight: "200px",
        }}
      >
        <img src={bg} className="w-full" />
        <img
          style={{ marginTop: "-600px", marginLeft: "25%" }}
          src={battle}
          className="absolute  items-center"
        />
        <div
          style={{ marginTop: "-120px" }}
          className="bg-brown-600 p-0.5 text-white shadow-lg flex-1 w-full  flex"
        >
          <div className="  p-0.5 text-white shadow-lg  w-2/5 ">
            <div style={{ writingMode: "vertical-rl" }}>{t("  battles")}</div>
            <div
              style={{ marginTop: "-130px", marginLeft: "20px" }}
              className="  p-0.5 text-white shadow-lg flex-1 w-full flex"
            >
              <Box
                onClick={() => {
                  if (!items[0]?.goodsUrl) {
                    setIsOpen(true);
                  }
                }}
                image={items[0]?.goodsUrl}
              ></Box>
              <Box
                onClick={() => {
                  if (!items[1]?.goodsUrl) {
                    setIsOpen(true);
                  }
                }}
                image={items[1]?.goodsUrl}
              ></Box>
              <Box
                onClick={() => {
                  if (!items[2]?.goodsUrl) {
                    setIsOpen(true);
                  }
                }}
                image={items[2]?.goodsUrl}
              ></Box>
              <Box
                onClick={() => {
                  if (!items[3]?.goodsUrl) {
                    setIsOpen(true);
                  }
                }}
                image={items[3]?.goodsUrl}
              ></Box>
              <Box
                onClick={() => {
                  if (!items[4]?.goodsUrl) {
                    setIsOpen(true);
                  }
                }}
                image={items[4]?.goodsUrl}
              ></Box>
            </div>

            <div
              style={{ marginLeft: "20px" }}
              className="   p-0.5 text-white shadow-lg flex-1 w-full flex"
            >
              <Box
                onClick={() => {
                  if (!items[5]?.goodsUrl) {
                    setIsOpen(true);
                  }
                }}
                image={items[5]?.goodsUrl}
              ></Box>
              <Box
                onClick={() => {
                  if (!items[6]?.goodsUrl) {
                    setIsOpen(true);
                  }
                }}
                image={items[6]?.goodsUrl}
              ></Box>
              <Box
                onClick={() => {
                  if (!items[7]?.goodsUrl) {
                    setIsOpen(true);
                  }
                }}
                image={items[7]?.goodsUrl}
              ></Box>
              <Box
                onClick={() => {
                  if (!items[8]?.goodsUrl) {
                    setIsOpen(true);
                  }
                }}
                image={items[8]?.goodsUrl}
              ></Box>
              <Box
                onClick={() => {
                  if (!items[9]?.goodsUrl) {
                    setIsOpen(true);
                  }
                }}
                image={items[9]?.goodsUrl}
              ></Box>
            </div>
          </div>
          {/*    <div className="  p-0.5 text-white shadow-lg flex-1 w-1/3 flex h-2">
            <div style={{ writingMode: "vertical-rl" }}>
              {t("Number of battles")}
            </div>
            <div>{t("Start fighting")}</div>
            <div>{t("wool")}</div>
          </div> */}
          <div className="  p-0.5 text-white shadow-lg flex-1 w-3/5 flex h-2">
            <div style={{ writingMode: "vertical-rl" }}>
              {t("Combat record")}
            </div>
            <div
              className="  w-full  "
              style={{
                maxHeight: "100px",
                height: "100px",
                overflowY: "auto",
                fontSize: "10px",
              }}
            >
              <table className="  w-full  ">
                <thead>
                  <th className="w-1/5">{t("type")}</th>
                  <th className="w-1/5">{t("time")}</th>
                  <th className="w-1/5">{t("status")}</th>
                  <th className="w-1/5">{t("status")}</th>
                  <th className="w-1/5">{t("reward")}</th>
                </thead>
                <tbody>
                  {history.map((val, idx) => (
                    <tr>
                      <td>{val.pvpType + "Number"}</td>
                      <td>{val.pvpTime}</td>
                      <td>
                        {val.status == 0
                          ? "wait"
                          : val.status == 1
                          ? "Inbattle"
                          : "complete"}
                      </td>
                      <td>
                        {val.sucFail == 1
                          ? "Suc"
                          : val.result == 0
                          ? "Fail"
                          : ""}
                      </td>
                      <td>{val.reward ? val.reward : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        size="xl"
        fullscreen="xxl-down"
        centered
        show={isOpen}
        onHide={() => setIsOpen(false)}
      >
        <img
          src={close}
          className="h-6 top-4 right-4 absolute cursor-pointer"
          onClick={() => setIsOpen(false)}
        />

        <Animal
          onClose={() => {
            setIsOpen(false);
            loadWolfPvpList();
          }}
        />
      </Modal>
    </Panel>
  );
};
