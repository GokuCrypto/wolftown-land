import React, { useEffect, useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import background from "assets/land/world.png";

import { Section, useScrollIntoView } from "lib/utils/hooks/useScrollIntoView";
import { GameProvider } from "./GameProvider";
import { GameWorld } from "./GameWorld";
import mapMovement from "./lib/mapMovement";
import { ToastProvider } from "./toast/ToastQueueProvider";
import { websock, heartCheckFun } from "hooks/Websocket";

export const WolfTownWorld: React.FC = () => {
  // catching and passing scroll container to keyboard listeners
  const container = useRef(null);
  // const { id } = useParams();
  const [scrollIntoView] = useScrollIntoView();

  useEffect(() => {
    //加载socket
    scrollIntoView(Section.Lottery, "auto");
    websock();
    heartCheckFun();
  }, [scrollIntoView]);

  useEffect(() => {
    mapMovement.addListeners(container.current);
    return () => {
      mapMovement.removeListeners();
    };
  }, [container]);

  // Load data
  return (
    <GameProvider key="WolfTownWorld">
      <ToastProvider>
        <ScrollContainer
          className="bg-green-background overflow-scroll relative w-full h-full"
          innerRef={container}
        >
          <div
            className="relative h-gameboard w-gameboard"
            // TODO dynamic game board size based on tile dimensions
          >
            <img src={background} className="absolute inset-0 w-full  " />
            {/*<ExpansionInfo />*/}
            <GameWorld />
          </div>
        </ScrollContainer>
      </ToastProvider>
    </GameProvider>
  );
};
