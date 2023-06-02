import React, { useState, useEffect } from "react";
import close from "assets/icons/close.png";
import { Panel } from "components/ui/Panel";
import { Section } from "lib/utils/hooks/useScrollIntoView";
import { Modal } from "react-bootstrap";
import chick from "assets/animals/chick.gif";
import dragonfly from "assets/decorations/dragonfly.gif";
import gifbg from "assets/other/tv.gif";
import uuu from "assets/lottery/uuu.gif";
import ReactPlayer from "react-player";
import { LandTime } from "./components/LandTime";
import land1 from "assets/landbuild/land1.png";

import { EXContributors } from "./components/EXContributors";
import { Contributors } from "./components/Contributors";
import {
  getLandGameList,
  APP_WOLF_API,
  getExpandNumber,
} from "hooks/WolfConfig";
import { unlockLand } from "hooks/WHashConfig";
import { useTranslation } from "react-i18next";

import { size } from "lodash";

export class LandInfo {
  public landId?: string;
  public url?: string;
  public animals?: any[];
  public cdate?: Date;
  public id?: string;
  public shit?: string;
  public isUnlocked?: boolean;
}

export const LandMaxbuild: React.FC = () => {
  const [bgcolor, setBgcolor] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);
  const [landId, setLandId] = React.useState("");
  const [clickNumber, setClickNumber] = React.useState(0);
  const { t } = useTranslation();

  // const [isLocked, setIsLocked] = useState(true);
  const [land, setLand] = useState(() => [
    new LandInfo(),
    new LandInfo(),
    new LandInfo(),
    new LandInfo(),
    new LandInfo(),
    new LandInfo(),
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const loadLandGameList = async () => {
    setIsLoading(true);
    const expandNumber = await getExpandNumber();

    try {
      console.log("loadLandGameList Animal???");
      const result = await getLandGameList(6, 12);
      const EXSixLands = result.slice(6, 12);
      const lands = [
        new LandInfo(),
        new LandInfo(),
        new LandInfo(),
        new LandInfo(),
        new LandInfo(),
        new LandInfo(),
      ]; // 只获取后六个土地数据

      for (var i = 0; i < expandNumber && i < 6; i++) {
        console.log("loadLandGameList Animal???");
        lands[i].isUnlocked = true;
        console.log("loadLandGame isUnlocked", lands[i].isUnlocked);
      }

      if (EXSixLands && EXSixLands.length > 0) {
        let count = 0;

        for (var i = 0; i < EXSixLands.length; i++) {
          const animals = EXSixLands[i].animalIds;
          let animalsData = [];
          if (animals) {
            //获取狼的信息
            const animalsInit = animals.split("@");
            for (var j = 0; j < animalsInit.length; j++) {
              console.log("animalsInit", animalsInit[j].replace("Sheep-"));
              if (animalsInit[j]) {
                animalsData[j] = {
                  animalId: animalsInit[j],
                  url:
                    APP_WOLF_API +
                    animalsInit[j].replace("Sheep-", "").replace("Wolf-", "") +
                    ".png",
                };
              }
            }
          }

          lands[i] = {
            landId: EXSixLands[i].landId,
            url: EXSixLands[i].landUrl,
            animals: animalsData,
            id: EXSixLands[i].id,
            cdate: EXSixLands[i].createTime,
            shit: EXSixLands[i].shit,
            isUnlocked: true,
          };
          count++;
        }
      }
      setLand(lands);
      console.log("bagAnimal", result);

      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLandGameList();
  }, []);
  // const handleUnlock = () => {
  //   setIsLocked(false);
  // };
  console.log("执行了一次", land);
  return (
    // Container
    <div
      style={{
        height: "450px",
        width: "300px",
        top: "calc(40% - 720px)",
        right: "50px",
        overflow: "hidden",
      }}
      className="absolute"
    >
      <div className="h-full w-full relative">
        {/* Navigation Center Point */}
        <span
          id={Section.LandMaxbuild}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        {/*<img src={chick} className="absolute right-0 w-5 top-8" />*/}
        {/*    <img
          src={gifbg}
          className="absolute right-16 w-10 bottom-36 animate-float"
        /> */}
        <div className="h-full w-full relative">
          {/* {isLocked && (
          <button onClick={handleUnlock} className="absolute top-2 right-2">
            Unlock
          </button>
        )} */}
          {land.map((obj, ind) => (
            <div
              style={{ overflow: "hidden", height: "120px" }}
              key={"img_i_max" + ind}
              className="relative w-1/3 float-left  ml-4 mt-2 mb-1 hover:img-highlight"
            >
              {/* 已经解锁，且有放置土地 */}

              {/* 已经解锁，没有放置土地 */}
              {obj.isUnlocked && (
                <>
                  <img
                    onClick={() => {
                      setIsOpen(true);
                      setClickNumber(ind);
                    }}
                    src={obj.url ? obj.url : land1}
                    alt={"img-land" + ind}
                    key={"img-land" + ind}
                    className="relative w-100 cursor-pointer "
                  />
                  <div
                    key={"img_i" + ind}
                    style={{ top: "-88px" }}
                    className="relative w-100 cursor-pointer"
                  >
                    {obj.animals?.map((obj2, ind2) => (
                      <img
                        src={obj2.url}
                        key={"img-land_wolf" + ind + ind2}
                        className="relative w-1/5 float-left  ml-4  hover:img-highlight cursor-pointer animate-float"
                      />
                    ))}
                  </div>
                  <div
                    style={{ bottom: "20px", fontSize: "8px", color: "#fff" }}
                    className="relative w-full"
                  >
                    <LandTime cdate={obj.cdate} />
                  </div>
                </>
              )}
              {/* 未解锁 */}
              {!obj.isUnlocked && (
                <>
                  <img
                    src={"/images/lands/farm_lock.png"}
                    alt={"img-land" + ind}
                    key={"img-land" + ind}
                    className="relative w-100 cursor-pointer"
                    onClick={() => {
                      setIsOpen2(true);
                    }}
                    title={t("Unlock requires 10000WTWOOL")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <button
                      onClick={() => {
                        setIsOpen2(true);
                      }}
                      title={t("Unlock requires 10000WTWOOL")}
                    >
                      {t("UNLOCK")}
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          {/* {land.map((obj, ind) => (
            <div
              style={{ overflow: "hidden", height: "120px" }}
              key={"img_i_max" + ind}
              className="relative w-1/3 float-left  ml-4 mt-2 mb-1 hover:img-highlight cursor-pointer"
            >
              <img
                onClick={() => {
                  setIsOpen(true);
                  setClickNumber(ind);
                }}
                src={obj.url ? obj.url : land1}
                alt={"img-land" + ind}
                key={"img-land" + ind}
                className="relative w-100 "
              />
              
              <div
                key={"img_i" + ind}
                style={{ top: "-88px" }}
                className="relative w-100"
              >
                {obj.animals?.map((obj2, ind2) => (
                  <>
                    <img
                      src={obj2.url}
                      key={"img-land_wolf" + ind + ind2}
                      className="relative w-1/5 float-left  ml-4  hover:img-highlight cursor-pointer animate-float"
                    />
                  </>
                ))}
              </div>
              <div
                style={{ bottom: "20px", fontSize: "8px", color: "#fff" }}
                className="relative w-full"
              >
                <LandTime cdate={obj.cdate} />
              </div>
            </div>
          ))}
          
           */}
        </div>

        <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
          <img
            src={close}
            className="h-6 top-4 right-4 absolute cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          <Contributors
            onClose={() => {
              setIsOpen(false);
              loadLandGameList();
            }}
            landData={land[clickNumber]}
            animalIds={land[clickNumber].animals}
            shitData={land[clickNumber].shit}
            // showOnlyThirdLevel={true}
          />
        </Modal>
        <Modal centered show={isOpen2} onHide={() => setIsOpen2(false)}>
          <img
            src={close}
            className="h-6 top-4 right-4 absolute cursor-pointer"
            onClick={() => setIsOpen2(false)}
          />
          <EXContributors
            onClose={() => {
              setIsOpen2(false);
              loadLandGameList();
            }}
            landData={land[clickNumber]}
            animalIds={land[clickNumber].animals}
            shitData={land[clickNumber].shit}
          />
        </Modal>
      </div>
    </div>
  );
};
