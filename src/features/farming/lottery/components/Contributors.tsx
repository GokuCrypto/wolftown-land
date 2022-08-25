import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "lib/config";
import close from "assets/icons/close.png";

import logo from "assets/brand/logo.png";
import bumpkin from "assets/npcs/bumpkin.png";
import goblin from "assets/npcs/goblin.gif";
import man from "assets/npcs/idle.gif";
import { Modal } from "react-bootstrap";
import { Panel } from "components/ui/Panel";

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

interface PropsInit {
  onClose: () => void;
  times: number;
}

interface Props {
  onClose: () => void;
}

export const ContributorsInit: React.FC<PropsInit> = ({ onClose, times }) => {
  const [lotteryName, setLotteryName] = useState([""]);
  const [lotteryUrl, setLotteryUrl] = useState([""]);
  const [lotteryAmount, setLotteryAmount] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("Lottery, please wait.");

  console.log("timestimestimes", times);

  useEffect(() => {
    setIsLoading(true);
    const load = async () => {
      doLottery(times).then((obj) => {
        if (!obj.success) {
          console.log("obj.message", obj.message);
          setMessage(obj.message);
        } else {
          const wolfLotteryGoodsResultList =
            obj.result.wolfLotteryGoodsResultList;
          if (
            wolfLotteryGoodsResultList != null &&
            wolfLotteryGoodsResultList.length > 0
          ) {
            let lotteryNameInit: string[] = [];
            let lotteryAmountInit = [];
            let lotteryUrlInit = [];
            for (var i = 0; i < wolfLotteryGoodsResultList.length; i++) {
              lotteryNameInit[i] = wolfLotteryGoodsResultList[i].lotteryName;
              lotteryAmountInit[i] = wolfLotteryGoodsResultList[i].amount;
              lotteryUrlInit[i] = wolfLotteryGoodsResultList[i].lotteryUrl;
            }
            console.log("lotteryNameInit", lotteryNameInit);
            setLotteryName(lotteryNameInit);
            setLotteryUrl(lotteryUrlInit);
            setLotteryAmount(lotteryAmountInit);
          }
        }
      });
    };
    load();
  }, [isLoading]);

  return (
    <>
      {" "}
      <div className="flex flex-wrap items-center h-fit">
        <h1 className="text-xs text-center pt-2">
          Congratulations on winning the lottery
        </h1>
        {lotteryName[0] !== "" ? (
          lotteryName.map((obj, idx) => (
            <div style={{ width: "25%", margin: "10px" }}>
              <img
                style={{ width: "100%" }}
                src={lotteryUrl[idx]}
                key={idx + "inot"}
              />
              <h1 key={idx + "h1Init"} className="text-xs text-center pt-2">
                {obj}*{lotteryAmount[idx]}
              </h1>
            </div>
          ))
        ) : (
          <>
            {" "}
            <p className="text-xs">
              <span className="text-xs text-base"> {message} </span>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export const Contributors: React.FC<Props> = ({ onClose }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [timess, setTimess] = useState(0);

  const [lotteryName, setLotteryName] = useState([""]);
  const [lotteryUrl, setLotteryUrl] = useState([""]);
  const [lotteryAmount, setLotteryAmount] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const load = async () => {
      queryWolfLotteryGoodsList().then((obj) => {
        const wolfLotteryGoodsResultList = obj;
        if (
          wolfLotteryGoodsResultList != null &&
          wolfLotteryGoodsResultList.length > 0
        ) {
          let lotteryNameInit: string[] = [];
          let lotteryAmountInit = [];
          let lotteryUrlInit = [];
          for (var i = 0; i < wolfLotteryGoodsResultList.length; i++) {
            lotteryNameInit[i] = wolfLotteryGoodsResultList[i].lotteryName;
            lotteryAmountInit[i] = wolfLotteryGoodsResultList[i].amount;
            lotteryUrlInit[i] = wolfLotteryGoodsResultList[i].lotteryUrl;
          }
          setLotteryName(lotteryNameInit);
          setLotteryUrl(lotteryUrlInit);
          setLotteryAmount(lotteryAmountInit);
        }
      });
    };
    load();
  }, [isLoading]);

  const { ref: itemContainerRef, showScrollbar } =
    useShowScrollbar(TAB_CONTENT_HEIGHT);
  const navigate = useNavigate();
  console.log("timesstimess", timess);

  return (
    <>
      <div className="flex flex-wrap justify-center items-center">
        <h1 className="text-xl  text-center pt-1"> Lottery</h1>
        <p className="text-xs text-center pt-2">
          Welcome to the lottery center .
        </p>
      </div>

      <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
        <Panel>
          <img
            src={close}
            className="h-6 top-4 right-4 absolute cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          <ContributorsInit times={timess} onClose={() => setIsOpen(false)} />
        </Panel>
      </Modal>

      <div
        style={{ marginTop: "20px" }}
        className="flex flex-wrap justify-center items-center"
      >
        <Button
          style={{ width: "100%" }}
          onClick={() => {
            setTimess(1);
            setIsOpen(true);
          }}
          className="overflow-hidden mb-2"
        >
          A lottery ticket
        </Button>
        <Button
          style={{ width: "100%" }}
          onClick={() => {
            setTimess(5);
            setIsOpen(true);
          }}
          className="overflow-hidden mb-2"
        >
          Five lottery tickets
        </Button>
        <Button
          style={{ width: "100%" }}
          onClick={() => {
            setTimess(10);
            setIsOpen(true);
          }}
          className="overflow-hidden mb-2"
        >
          Ten lottery tickets
        </Button>
        <h1 style={{ width: "100%" }} className="text-xs text-center pt-2">
          Prize list
        </h1>
        <div className="flex flex-wrap items-center h-fit">
          {lotteryName.length > 1 ? (
            lotteryName.map((obj, idx) => (
              <div style={{ width: "10%", margin: "10px" }}>
                <img
                  style={{ width: "100%" }}
                  src={lotteryUrl[idx]}
                  key={idx}
                  title={obj + "*" + lotteryAmount[idx]}
                />
              </div>
            ))
          ) : (
            <> </>
          )}
        </div>
      </div>
    </>
  );
};
