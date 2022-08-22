import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "lib/config";

import logo from "assets/brand/logo.png";
import bumpkin from "assets/npcs/bumpkin.png";
import goblin from "assets/npcs/goblin.gif";
import man from "assets/npcs/idle.gif";

import {
  Contributor,
  ContributorRole,
  CONTRIBUTORS,
} from "./constants/contributors";
import { ITEM_DETAILS } from "features/game/types/images";

import { useShowScrollbar } from "lib/utils/hooks/useShowScrollbar";
import classNames from "classnames";
import { queryWolfLotteryGoodsList, doLottery } from "hooks/WolfConfig";
import { Button } from "react-bootstrap";

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
  const [isLoading, setIsLoading] = useState(true);
  const [lotteryName, setLotteryName] = useState([""]);
  const [lotteryUrl, setLotteryUrl] = useState([""]);
  const [lotteryAmount, setLotteryAmount] = useState([""]);
  const [message, setMessage] = useState("");

  const todoLottery = () => {
    doLottery().then((obj) => {
      setMessage(obj ? "" : "error connect");
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const load = async () => {
      queryWolfLotteryGoodsList().then((obj) => {
        console.log("objobj", obj);
        if (obj != null && obj.length > 0) {
          let lotteryNameInit: string[] = [];
          let lotteryAmountInit = [];
          let lotteryUrlInit = [];
          for (var i = 0; i < obj.length; i++) {
            lotteryNameInit[i] = obj[i].lotteryName;
            lotteryAmountInit[i] = obj[i].amount;
            lotteryUrlInit[i] = obj[i].lotteryUrl;
          }

          setLotteryName(lotteryNameInit);
          setLotteryUrl(lotteryUrlInit);
          setLotteryAmount(lotteryAmountInit);
        }
      });
    };
    load();
  }, []);

  const { ref: itemContainerRef, showScrollbar } =
    useShowScrollbar(TAB_CONTENT_HEIGHT);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-wrap justify-center items-center">
        <h1 className="text-xl  text-center pt-1"> Lottery</h1>
        <p className="text-xs text-center pt-2">
          Welcome to the lottery center .
        </p>
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
        <div className="flex flex-wrap items-center h-fit">
          {lotteryName.length > 1 ? (
            lotteryName.map((obj, idx) => (
              <div style={{ width: "30%" }}>
                <img
                  style={{ width: "100%" }}
                  src={lotteryUrl[idx]}
                  key={idx}
                />
                <h1 key={idx + "h1"} className="text-xs text-center pt-2">
                  {obj}*{lotteryAmount[idx]}
                </h1>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      <div
        style={{ marginTop: "20px" }}
        className="flex flex-wrap justify-center items-center"
      >
        <Button onClick={todoLottery} className="overflow-hidden mb-2">
          Lottery
        </Button>
        <p className="text-xs">
          <span className="text-xs text-base"> {message} </span>
        </p>
      </div>
    </>
  );
};
