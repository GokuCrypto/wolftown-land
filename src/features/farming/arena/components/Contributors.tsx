import close from "assets/icons/close.png";
import React, { useState, useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import boo from "assets/other/boo5.gif";
import init from "assets/other/init.gif";
import goblin from "assets/npcs/goblin.gif";
import arenabg from "assets/other/arena/arenabg.png";
import { Panel } from "components/ui/Panel";
import { Modal } from "react-bootstrap";

import { Tab } from "components/ui/Tab";
import { ITEM_DETAILS } from "features/game/types/images";
import { useTranslation } from "react-i18next";
import { Fight } from "./Fight";
import { getWolfArenaGameList, APP_WOLF_API } from "hooks/WolfConfig";

const TAB_CONTENT_HEIGHT = 340;
interface Props {
  onClose: () => void;
  landData?: any;
  animalIds?: any[];
}

export class ArenaInfo {
  public landId?: string;
  public url?: string;
  public weapons?: any[];
  public cdate?: Date;
  public id?: string;
  public position?: string;
}

export const UseArenaScrollIntoView = () => {
  const el = document.getElementById("arenacenter");

  el?.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
};

export const Contributors: React.FC<Props> = ({ onClose }) => {
  const [tab, setTab] = useState<string>("craft");
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = React.useState(false);
  const [animalName, setAnimalName] = React.useState("");

  const [arena, setArena] = useState([
    new ArenaInfo(),
    new ArenaInfo(),
    new ArenaInfo(),
    new ArenaInfo(),
  ]);
  const [arenaChose, setArenaChose] = useState([new ArenaInfo()]);

  const [isLoading, setIsLoading] = useState(false);

  const loadLandGameList = async () => {
    setIsLoading(true);
    try {
      console.log("loadLandGameList Animal???");
      const result = await getWolfArenaGameList();
      if (result && result.length > 0) {
        const arenas = [
          new ArenaInfo(),
          new ArenaInfo(),
          new ArenaInfo(),
          new ArenaInfo(),
        ];

        for (var i = 0; i < result.length; i++) {
          const weapons = result[i].weapons;
          let animalsData = [];
          if (weapons) {
            //获取狼的信息
            const animalsInit = weapons.split("@");
            for (var j = 0; j < animalsInit.length; j++) {
              console.log("animalsInit", animalsInit[j].replace("Sheep-"));
              if (animalsInit[j]) {
                animalsData[j] = {
                  weapon: animalsInit[j],
                  url: ITEM_DETAILS[animalsInit[j]].image,
                };
              }
            }
          }

          arenas[i] = {
            landId: result[i].landId,
            url: result[i].landUrl,
            weapons: animalsData,
            id: result[i].id,
            cdate: result[i].createTime,
            position: result[i].position,
          };
        }
        setArena(arenas);
      }
      console.log("bagAnimal", result);

      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLandGameList();
  }, []);

  return (
    <Panel className="pt-5 relative ">
      <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
        <div className="flex"></div>
        <img
          src={close}
          className="h-6 cursor-pointer mr-2 mb-1"
          onClick={onClose}
        />
      </div>
      <ScrollContainer className="bg-green-background overflow-scroll relative w-full h-full">
        <div
          style={{
            minHeight: "200px",
            maxHeight: "600px",
          }}
          className="relative h-gameboard w-gameboard"
        >
          <img src={arenabg} className="absolute inset-3 w-1/3   " />
          <img
            src={boo}
            style={{
              height: "100px",
              width: "100px",
              left: "calc(9% )",
              top: "calc(80%)",
            }}
            className="absolute"
          />

          <img
            src={boo}
            style={{
              height: "100px",
              width: "100px",
              left: "calc(23% )",
              top: "calc(80%)",
            }}
            className="absolute"
          />
          {/* 上 */}
          <img
            onClick={() => {
              setIsOpen(true);
            }}
            id="arenacenter"
            src={init}
            style={{
              height: "80px",
              width: "80px",
              left: "calc(16% )",
              top: "calc(69%)",
            }}
            className="absolute hover:img-highlight cursor-pointer"
          />
          {/* 下 */}
          <img
            src={init}
            onClick={() => {
              setIsOpen(true);
            }}
            style={{
              height: "80px",
              width: "80px",
              left: "calc(16% )",
              top: "calc(158%)",
            }}
            className="absolute hover:img-highlight cursor-pointer"
          />
          {/* 左 */}
          <img
            src={init}
            onClick={() => {
              setIsOpen(true);
            }}
            style={{
              height: "80px",
              width: "80px",
              left: "calc(9.5% )",
              top: "calc(112%)",
            }}
            className="absolute hover:img-highlight cursor-pointer"
          />
          {/* 右 */}
          <img
            src={init}
            onClick={() => {
              setIsOpen(true);
            }}
            style={{
              height: "80px",
              width: "80px",
              left: "calc(22.8% )",
              top: "calc(116%)",
            }}
            className="absolute hover:img-highlight cursor-pointer"
          />
        </div>

        <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
          <img
            src={close}
            className="h-6 top-4 right-4 absolute  cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          <Fight
            onClose={() => {
              setIsOpen(false);
            }}
          />
        </Modal>
      </ScrollContainer>
    </Panel>
  );
};
