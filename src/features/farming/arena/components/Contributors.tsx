import close from "assets/icons/close.png";
import React, { useState, useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import boo from "assets/other/boo5.gif";
import init from "assets/other/init.gif";
import goblin from "assets/npcs/goblin.gif";
import arenabg from "assets/other/arena/arenabg.png";
import { Panel } from "components/ui/Panel";
import { Modal } from "react-bootstrap";
import { createGlobalStyle } from "styled-components";
import { Tab } from "components/ui/Tab";
import { ITEM_DETAILS } from "features/game/types/images";
import { useTranslation } from "react-i18next";
import { Fight } from "./Fight";
import { getWolfArenaGameList, APP_WOLF_API } from "hooks/WolfConfig";
import { map } from "lodash";
import { Monster } from "./Monster";

const MintStyle = createGlobalStyle`

@keyframes rightMove
{
    from {transform: translate(0,0);}
    to {transform: translate(350px,0);}
}

@keyframes leftMove
{
    from {transform: translate(0,0);}
    to {transform: translate(-350px,0);}
}

@keyframes downMove
{
    from {transform: translate(0,0);}
    to {transform: translate(0,350px);}
}

@keyframes upMove
{
    from {transform: translate(0,0);}
    to {transform: translate(0,-350px);}
}




`;
const TAB_CONTENT_HEIGHT = 340;
interface Props {
  onClose: () => void;
  landData?: any;
  animalIds?: any[];
}

export class ArenaInfo {
  public animalName?: string;
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
  const [position, setPostion] = React.useState("");

  const [animalName, setAnimalName] = React.useState("");

  const [leftarena, setLeftArena] = useState(new ArenaInfo());
  const [rightarena, setRightArena] = useState(new ArenaInfo());
  const [uparena, setUpArena] = useState(new ArenaInfo());
  const [downarena, setDownArena] = useState(new ArenaInfo());

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
          const weapons = result[i].weaponNames;
          let weaponsData = [];
          if (weapons) {
            //获取狼的信息
            const animalsInit = weapons.split("@");
            for (var j = 0; j < animalsInit.length; j++) {
              if (animalsInit[j]) {
                weaponsData[j] = {
                  weapon: animalsInit[j],
                  url: ITEM_DETAILS[animalsInit[j]].image,
                };
              }
            }
          }

          arenas[i] = {
            animalName: result[i].animalName,
            url:
              APP_WOLF_API +
              result[i].animalName.replace("Sheep-", "").replace("Wolf-", "") +
              ".png",
            weapons: weaponsData,
            id: result[i].id,
            cdate: result[i].createTime,
            position: result[i].position,
          };
          if (result[i].position == "left") {
            setLeftArena(arenas[i]);
          } else if (result[i].position == "right") {
            setRightArena(arenas[i]);
          } else if (result[i].position == "up") {
            setUpArena(arenas[i]);
            console.log("up-arenas[i]", arenas[i]);
          } else if (result[i].position == "down") {
            setDownArena(arenas[i]);
          }
        }
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
      <MintStyle />
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

          {uparena.url ? (
            <>
              <img
                id="arenacenter"
                src={uparena.url}
                style={{
                  height: "80px",
                  width: "80px",
                  left: "calc(16% )",
                  top: "calc(69%)",
                }}
                className="absolute hover:img-highlight cursor-pointer"
              />
              {uparena.weapons?.map((item, idx) => (
                <>
                  <img
                    id="arenacenter"
                    src={item.url}
                    key={"uparena" + idx}
                    style={{
                      height: "80px",
                      width: "80px",
                      left:
                        "calc(16% - " +
                        (idx % 2 == 0 ? -1 : 1) * (idx + 1) * 40 +
                        "px)",
                      top: "calc(58%)",
                    }}
                    className="absolute hover:img-highlight cursor-pointer"
                  />

                  <img
                    id="arenacenter"
                    src={"https://img.wolftown.games/other/up.png"}
                    key={"rightarena" + idx}
                    style={{
                      height: "40px",

                      animation: "upMove  " + (idx / 10 + 2) + "s infinite",
                      left:
                        "calc(16.5% - " +
                        (idx % 2 == 0 ? -1 : 1) * (idx + 1) * 40 +
                        "px)",
                      top: "calc(58%)",
                    }}
                    className="absolute hover:img-highlight cursor-pointer"
                  />
                </>
              ))}
            </>
          ) : (
            <>
              {" "}
              <img
                onClick={() => {
                  setIsOpen(true);
                  setPostion("up");
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
            </>
          )}
          {/* 下 */}

          {downarena.url ? (
            <>
              <img
                id="arenacenter"
                src={downarena.url}
                style={{
                  height: "80px",
                  width: "80px",
                  left: "calc(16% )",
                  top: "calc(158%)",
                }}
                className="absolute hover:img-highlight cursor-pointer"
              />
              {downarena.weapons?.map((item, idx) => (
                <>
                  <img
                    id="arenacenter"
                    src={item.url}
                    key={"downarena" + idx}
                    style={{
                      height: "80px",
                      width: "80px",
                      left:
                        "calc(16% - " +
                        (idx % 2 == 0 ? -1 : 1) * (idx + 1) * 40 +
                        "px)",
                      top: "calc(169%)",
                    }}
                    className="absolute hover:img-highlight cursor-pointer"
                  />

                  <img
                    id="arenacenter"
                    src={"https://img.wolftown.games/other/down.png"}
                    key={"rightarena" + idx}
                    style={{
                      height: "40px",

                      animation: "downMove  " + (idx / 10 + 2) + "s infinite",
                      left:
                        "calc(16.5% - " +
                        (idx % 2 == 0 ? -1 : 1) * (idx + 1) * 40 +
                        "px)",
                      top: "calc(169%)",
                    }}
                    className="absolute hover:img-highlight cursor-pointer"
                  />
                </>
              ))}
            </>
          ) : (
            <img
              src={init}
              onClick={() => {
                setIsOpen(true);
                setPostion("down");
              }}
              style={{
                height: "80px",
                width: "80px",
                left: "calc(16% )",
                top: "calc(158%)",
              }}
              className="absolute hover:img-highlight cursor-pointer"
            />
          )}
          {/* 左 */}

          {leftarena.url ? (
            <>
              <img
                id="arenacenter"
                src={leftarena.url}
                style={{
                  height: "80px",
                  width: "80px",
                  left: "calc(9.5% )",
                  top: "calc(112%)",
                }}
                className="absolute hover:img-highlight cursor-pointer"
              />
              {leftarena.weapons?.map((item, idx) => (
                <>
                  <img
                    id="arenacenter"
                    src={item.url}
                    key={"leftarena" + idx}
                    style={{
                      height: "80px",
                      width: "80px",
                      left: "calc(8% )",
                      top:
                        "calc(112% - " +
                        (idx % 2 == 0 ? -1 : 1) * (idx + 1) * 50 +
                        "px)",
                    }}
                    className="absolute hover:img-highlight cursor-pointer"
                  />

                  <img
                    id="arenacenter"
                    src={"https://img.wolftown.games/other/left.png"}
                    key={"rightarena" + idx}
                    style={{
                      height: "40px",
                      left: "calc(8% )",
                      animation: "leftMove  " + (idx / 10 + 2) + "s infinite",
                      top:
                        "calc(112% - " +
                        (idx % 2 == 0 ? -1 : 1) * (idx + 1) * 50 +
                        "px)",
                    }}
                    className="absolute hover:img-highlight cursor-pointer"
                  />
                </>
              ))}
            </>
          ) : (
            <img
              src={init}
              onClick={() => {
                setIsOpen(true);
                setPostion("left");
              }}
              style={{
                height: "80px",
                width: "80px",
                left: "calc(9.5% )",
                top: "calc(112%)",
              }}
              className="absolute hover:img-highlight cursor-pointer"
            />
          )}
          {/* 右 */}

          {rightarena.url ? (
            <>
              <img
                id="arenacenter"
                src={rightarena.url}
                style={{
                  height: "80px",
                  width: "80px",
                  left: "calc(22.8% )",
                  top: "calc(116%)",
                }}
                className="absolute hover:img-highlight cursor-pointer"
              />
              {rightarena.weapons?.map((item, idx) => (
                <>
                  <img
                    id="arenacenter"
                    src={item.url}
                    key={"rightarena" + idx}
                    style={{
                      height: "80px",
                      width: "80px",
                      left: "calc(24% )",
                      top:
                        "calc(116% - " +
                        (idx % 2 == 0 ? -1 : 1) * (idx + 1) * 50 +
                        "px)",
                    }}
                    className="absolute hover:img-highlight cursor-pointer"
                  />

                  <img
                    id="arenacenter"
                    src={"https://img.wolftown.games/other/right.png"}
                    key={"rightarena" + idx}
                    style={{
                      height: "40px",
                      left: "calc(24% )",
                      animation: "rightMove  " + (idx / 10 + 2) + "s infinite",
                      top:
                        "calc(116% - " +
                        (idx % 2 == 0 ? -1 : 1) * (idx + 1) * 50 +
                        "px)",
                    }}
                    className="absolute hover:img-highlight cursor-pointer"
                  />
                </>
              ))}
            </>
          ) : (
            <img
              src={init}
              onClick={() => {
                setIsOpen(true);
                setPostion("right");
              }}
              style={{
                height: "80px",
                width: "80px",
                left: "calc(22.8% )",
                top: "calc(116%)",
              }}
              className="absolute hover:img-highlight cursor-pointer"
            />
          )}
          {/* 怪物上 */}
          <Monster />
          {/* 怪物下 */}
          {/* 怪物左 */}
          {/* 怪物右 */}
        </div>

        <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
          <img
            src={close}
            className="h-6 top-4 right-4 absolute  cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          <Fight
            position={position}
            onClose={() => {
              setIsOpen(false);
            }}
          />
        </Modal>
      </ScrollContainer>
    </Panel>
  );
};
