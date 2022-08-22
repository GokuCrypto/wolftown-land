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
  const [lotteryName, setLotteryName] = useState([]);
  const [lotteryUrl, setLotteryUrl] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const load = async () => {
      queryWolfLotteryGoodsList().then((obj) => {
        console.log("objobj", obj);
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
        <div className="flex flex-wrap items-center h-fit"></div>
      </div>
    </>
  );
};
