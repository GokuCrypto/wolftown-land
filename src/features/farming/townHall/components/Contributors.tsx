import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "lib/config";
import { Modal } from "react-bootstrap";
import close from "assets/icons/close.png";
import logo from "assets/brand/wolflogo.png";
import bumpkin from "assets/npcs/bumpkin.png";
import goblin from "assets/npcs/goblin.gif";
import man from "assets/npcs/idle.gif";
import {
  buildList,
  build,
  totalContribute,
  transactionFlowList,
} from "hooks/WolfConfig";
import { Build } from "hooks/modules/Build";
import { Panel } from "components/ui/Panel";
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
import { ContributorsBuild } from "./ContributorsBuild";
import { dividends } from "hooks/WolfConfig";
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
}
export const Contributors: React.FC<Props> = ({ onClose }) => {
  const { ref: itemContainerRef, showScrollbar } =
    useShowScrollbar(TAB_CONTENT_HEIGHT);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [buildItem, setBuildItem] = useState<Build[]>([]);
  const [message, setMessage] = useState("");
  const [goodsType, setGoodsType] = useState("");
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

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

  useEffect(() => {
    loadBagByType();
  }, []);
  const buildDividends = async () => {
    const result = await dividends();
    if (result.success) {
      setMsg("Dividends Success");
    } else {
      setMsg(result?.message);
    }
  };
  return (
    <>
      {/* 建筑股权 */}
      <div className="flex flex-wrap justify-center items-center">
        <img src={logo} className="w-2/3" />
        <p className="text-xs text-center pt-2">
          {t(
            "The construction of Wolf Town is in full swing. Now you need to donate corresponding materials, and you will get corresponding rewards"
          )}
        </p>
        <p style={{ color: "red" }}>{msg}</p>
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
        <div>
          <Button
            className="w-15 bg-brown-200 active:bg-brown-200 "
            onClick={buildDividends}
          >
            {t("Dividends")}
          </Button>
        </div>
        <div
          style={{ fontSize: "10px", marginTop: "20px" }}
          className="flex flex-wrap items-center h-fit"
        >
          {buildItem.map((item) => (
            <div
              key={item.goodsName}
              className="flex w-full mb-6 ml-3"
              id={item.goodsName}
            >
              <div className="w-60 ml-4 flex justify-center">
                {t(item.goodsType)}
              </div>

              <div className="w-30 ml-4 flex justify-center">
                {"Amount(" + `${item.totalGu ? item.totalGu : 0}` + ")"}
              </div>

              <div className="w-30 ml-4 flex justify-center">
                {item.totalAmount + "(" + `${item.totalGuAmount}` + ")"}
              </div>
              <div className="w-10 ml-4 flex justify-center">
                {item.personAmount}
              </div>

              <div className="w-30 ml-8 flex justify-center">
                <Button
                  className="w-40 bg-brown-200 active:bg-brown-200 "
                  onClick={() => {
                    if (item.status == 1) {
                      setGoodsType(item.goodsType);
                      setIsOpen(true);
                    }
                  }}
                >
                  {item.status == 1 ? t("Details") : t("Coming soon")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
        <Panel>
          <img
            src={close}
            className="h-6 top-4 right-4 absolute cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          <ContributorsBuild
            goodsType={goodsType}
            onClose={() => setIsOpen(false)}
          />
        </Panel>
      </Modal>
    </>
  );
};
