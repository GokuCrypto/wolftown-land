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

import land1 from "assets/landbuild/land1.png";
import { Contributors } from "./components/Contributors";
import { getLandGameList, APP_WOLF_API } from "hooks/WolfConfig";

export class LandInfo {
  public landId?: string;
  public url?: string;
  public animals?: any[];
  public cdate?: Date;
  public id?: string;
  public shit?: string;
}

export const Landbuild: React.FC = () => {
  const [bgcolor, setBgcolor] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [landId, setLandId] = React.useState("");
  const [clickNumber, setClickNumber] = React.useState(0);
  const [land, setLand] = useState([
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
    try {
      console.log("loadLandGameList Animal???");
      const result = await getLandGameList();
      if (result && result.length > 0) {
        const lands = [
          new LandInfo(),
          new LandInfo(),
          new LandInfo(),
          new LandInfo(),
          new LandInfo(),
          new LandInfo(),
        ];

        for (var i = 0; i < result.length; i++) {
          const animals = result[i].animalIds;
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
            landId: result[i].landId,
            url: result[i].landUrl,
            animals: animalsData,
            id: result[i].id,
            cdate: result[i].createTime,
            shit: result[i].shit,
          };
        }
        setLand(lands);
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
          id={Section.Landbuild}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        {/*<img src={chick} className="absolute right-0 w-5 top-8" />*/}
        {/*    <img
          src={gifbg}
          className="absolute right-16 w-10 bottom-36 animate-float"
        /> */}
        <div className="h-full w-full relative">
          {land.map((obj, ind) => (
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
            </div>
          ))}
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
          />
        </Modal>
      </div>
    </div>
  );
};
