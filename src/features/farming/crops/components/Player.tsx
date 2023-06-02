import React, { useContext } from "react";

import { Context } from "features/game/GameProvider";
import { GRID_HIGHT_PX, GRID_WIDTH_PX } from "features/game/lib/constants";

import sheep1 from "assets/land/1.png";
import sheep2 from "assets/land/2.png";
import sheep4 from "assets/land/4.png";
import sheep6 from "assets/land/6.png";
import classnames from "classnames";
export const Player: React.FC = () => {
  return (
    <div
      className="absolute flex justify-center flex-col "
      style={{
        width: `${GRID_WIDTH_PX * 3}px`,
        height: `${GRID_WIDTH_PX * 3}px`,
        left: `${GRID_WIDTH_PX * 13}px`,
        top: `${GRID_HIGHT_PX * 0.85}px`,
      }}
    >
      {/* Top row */}
      <div className="flex justify-between">
        <img
          src={sheep1}
          className={classnames("w-full", "flex justify-between")}
        />
        <img
          src={sheep2}
          className={classnames("w-full", "flex justify-between")}
        />
      </div>
      {/* Middle row */}
      {/*  <div className="flex justify-center">
          <img src={sheep3} className={classnames("w-full","flex justify-center")} />
      </div> */}
      {/* Bottom row */}
      <div className="flex justify-between">
        <img
          src={sheep4}
          className={classnames("w-full", "flex justify-between")}
        />
        <img
          src={sheep6}
          className={classnames("w-full", "flex justify-between")}
        />
      </div>
    </div>
  );
};
