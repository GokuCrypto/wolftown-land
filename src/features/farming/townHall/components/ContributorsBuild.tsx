import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "lib/config";

import logo from "assets/brand/wolflogo.png";
import bumpkin from "assets/npcs/bumpkin.png";
import goblin from "assets/npcs/goblin.gif";
import man from "assets/npcs/idle.gif";
import { buildList, build } from "hooks/WolfConfig";
import { Build } from "hooks/modules/Build";
import { BuildItem } from "hooks/modules/BuildItem";

import level1 from "assets/brand/1.png";
import level2 from "assets/brand/2.png";
import level3 from "assets/brand/3.png";
import level4 from "assets/brand/4.png";
import { useTranslation } from "react-i18next";
import { Button } from "components/ui/Button";
import {
  Contributor,
  ContributorRole,
  CONTRIBUTORS,
} from "../constants/contributors";
import { ITEM_DETAILS } from "features/game/types/images";

import { useShowScrollbar } from "lib/utils/hooks/useShowScrollbar";
import classNames from "classnames";

const TAB_CONTENT_HEIGHT = 340;

const AVATARS: Record<Contributor["avatar"], string> = {
  bumpkin,
  goblin,
  man,
  // TODO!
  woman: man,
};

const ROLE_BADGES: Record<ContributorRole, string> = {
  artist: ITEM_DETAILS["Artist"].image,
  coder: ITEM_DETAILS["Coder"].image,
  moderator: ITEM_DETAILS["Discord Mod"].image,
};

interface Props {
  onClose: () => void;
  goodsType: string;
}

export const ContributorsBuild: React.FC<Props> = ({ onClose, goodsType }) => {
  const { ref: itemContainerRef, showScrollbar } =
    useShowScrollbar(TAB_CONTENT_HEIGHT);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [buildItem, setBuildItem] = useState<Build[]>([]);
  const { t } = useTranslation();

  const loadBagByType = async () => {
    setIsLoading(true);
    try {
      const buildIt = new Build();

      const result = await buildList(buildIt, "1", "1000");

      if (result?.result?.records) {
        console.log("result?.result?.records", result?.result?.records);
        setBuildItem(result?.result?.records);
      }

      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  const buildInit = async (ids: string) => {
    setIsLoading(true);
    try {
      const buildIt = new Build();
      buildIt.id = ids;
      buildIt.goodsType = goodsType;
      const result = await build(buildIt);

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

  useEffect(() => {
    loadBagByType();
  }, []);

  return (
    <>
      {/* 建筑股权 */}
      <div className="flex flex-wrap justify-center items-center">
        <p
          style={{ color: "#af1d18", fontSize: "30px" }}
          className="text-xs text-center pt-2"
        >
          {goodsType}
        </p>
        <br />
        <p style={{ color: "red" }}>{msg}</p>
        <br />
        <br />
      </div>
      <div
        ref={itemContainerRef}
        style={{
          maxHeight: TAB_CONTENT_HEIGHT,
          minHeight: (TAB_CONTENT_HEIGHT * 2) / 3,
        }}
        className={classNames("overflow-y-auto pt-1 mr-2", {
          scrollable: showScrollbar,
        })}
      >
        <div
          style={{ fontSize: "10px" }}
          className="flex flex-wrap items-center h-fit"
        >
          {buildItem.map((item) => (
            <div
              key={item.goodsName}
              className="flex w-full mb-6 ml-3"
              id={item.goodsName}
            >
              <div className="w-20 ml-4 flex justify-center">
                {item.goodsName}
              </div>

              <div className="w-10 ml-4 flex justify-center">
                LV.{item.level}
              </div>

              {/* <div className="w-20 ml-4 flex justify-center">
                <img
                  src={
                    item.level == 1
                      ? level1
                      : item.level == 2
                      ? level2
                      : item.level == 3
                      ? level3
                      : item.level == 4
                      ? level4
                      : ""
                  }
                  className="h-8"
                />
              </div> */}
              <div className="w-20 ml-4 flex justify-center">
                <img src={item.goodsUrl} className="h-8" />
              </div>

              <div className="w-10 ml-4 flex justify-center">
                x{item.amount}
              </div>

              <div className="w-30 ml-8 flex justify-center">
                <Button
                  className="w-30 bg-brown-200 active:bg-brown-200 "
                  onClick={() => {
                    buildInit(item.id);
                  }}
                >
                  {t("Build")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
