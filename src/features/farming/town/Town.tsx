import React, { useContext } from "react";
import { useActor } from "@xstate/react";

import { Context } from "features/game/GameProvider";

import { GRID_WIDTH_PX, GRID_HIGHT_PX } from "features/game/lib/constants";
import { Craft } from "features/farming/bakery/Craft";
import { Blacksmith } from "features/farming/blacksmith/Blacksmith";
import { Shop } from "features/farming/shop/Shop";
import { Mail } from "features/farming/mail/Mail";
import { Section } from "lib/utils/hooks/useScrollIntoView";

import { GoblinVillageEntry } from "./components/GoblinVillageEntry";
import { TownHall } from "../townHall/TownHall";

export const Town: React.FC = () => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);

  return (
    <>
      <div
        id={Section.Craft}
        className="z-10 absolute"
        // TODO some sort of coordinate system
        style={{
          width: `${GRID_WIDTH_PX * 34.3}px`,
          height: `${GRID_WIDTH_PX * 9}px`,
          right: `calc(10% )`,
          top: `calc(38% - ${GRID_HIGHT_PX * 18}px)`,
        }}
      >
        <Blacksmith />

        {!gameState.matches("readonly") && <GoblinVillageEntry />}
      </div>

      <div
        id={Section.Build}
        className="z-10 absolute"
        // TODO some sort of coordinate system
        style={{
          width: `${GRID_WIDTH_PX * 2}px`,
          height: `${GRID_WIDTH_PX * 9}px`,
          right: 0,
          top: `calc(50% - ${GRID_HIGHT_PX * 28}px)`,
        }}
      >
        <TownHall />
        {!gameState.matches("readonly") && <GoblinVillageEntry />}
      </div>
    </>
  );
};
