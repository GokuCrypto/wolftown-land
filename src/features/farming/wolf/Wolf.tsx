import React from "react";

import { GRID_WIDTH_PX, GRID_HIGHT_PX } from "features/game/lib/constants";

import { Section } from "lib/utils/hooks/useScrollIntoView";

import chick from "assets/animals/chick.gif";
import dragonfly from "assets/decorations/dragonfly.gif";
import RunWolf from "./components/RunWolf";

import goblinSwimming from "assets/animals/wolf_matting.gif";
import goblinSnorkling from "assets/animals/wolf2_matting.gif";
import swimmer from "assets/npcs/swimmer.gif";
import waterBoat from "assets/npcs/water_boat.png";
import { Frog } from "./components/Frog";

export const Wolf: React.FC = () => {
  return (
    // Container
    <div
      style={{
        height: "650px",
        width: "1650px",
        left: "calc(50% - 1400px)",
        top: "calc(50% - 1100px)",
      }}
      className="absolute"
    >
      <div className="h-full w-full relative">
        {/* Navigation Center Point */}
        <span
          id={Section.Wolf}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        <img src={chick} className="absolute right-0 w-5 top-8" />
        <img
          src={dragonfly}
          className="absolute right-16 w-10 bottom-36 animate-float"
        />

        <Frog />
        {/*   <RunWolf /> */}
        <img
          src={goblinSwimming}
          className="absolute "
          style={{
            width: `${GRID_WIDTH_PX * 3}px`,
            left: `${GRID_WIDTH_PX * 6}px`,
            top: `${GRID_HIGHT_PX * 5}px`,
          }}
        />
        <img
          src={goblinSwimming}
          className="absolute "
          style={{
            width: `${GRID_WIDTH_PX * 3}px`,
            left: `${GRID_WIDTH_PX * 7}px`,
            top: `${GRID_HIGHT_PX * 6}px`,
          }}
        />

        <img
          src={goblinSwimming}
          className="absolute "
          style={{
            width: `${GRID_WIDTH_PX * 3}px`,
            left: `${GRID_WIDTH_PX * 6}px`,
            top: `${GRID_HIGHT_PX * 7}px`,
          }}
        />
        <img
          src={goblinSnorkling}
          className="absolute "
          style={{
            width: `${GRID_WIDTH_PX * 3.5}px`,
            left: `${GRID_WIDTH_PX * 12}px`,
            top: `${GRID_HIGHT_PX * 5}px`,
          }}
        />
        <img
          src={goblinSnorkling}
          className="absolute "
          style={{
            width: `${GRID_WIDTH_PX * 3.5}px`,
            left: `${GRID_WIDTH_PX * 11}px`,
            top: `${GRID_HIGHT_PX * 6}px`,
          }}
        />

        <img
          src={goblinSnorkling}
          className="absolute "
          style={{
            width: `${GRID_WIDTH_PX * 3.5}px`,
            left: `${GRID_WIDTH_PX * 12}px`,
            top: `${GRID_HIGHT_PX * 7}px`,
          }}
        />

        <img
          src={swimmer}
          className="absolute "
          style={{
            width: `${GRID_WIDTH_PX * 0.85}px`,
            left: `${GRID_WIDTH_PX * 60}px`,
            top: `${GRID_HIGHT_PX * 2.5}px`,
            transform: "scaleX(-1)",
          }}
        />

        <img
          src={waterBoat}
          className="absolute"
          style={{
            width: `${GRID_WIDTH_PX * 4.3}px`,
            right: `${GRID_WIDTH_PX * 6.4}px`,
            top: `${GRID_HIGHT_PX * 4.3}px`,
          }}
        />
      </div>
    </div>
  );
};
