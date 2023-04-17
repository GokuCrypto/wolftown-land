import React, { useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useActor } from "@xstate/react";
import { useState } from "react";
import { Hud } from "features/farming/hud/Hud";
import { Crops } from "features/farming/crops/Crops";
import { Water } from "features/farming/water/Water";
import { Wolf } from "features/farming/wolf/Wolf";
import { Lottery } from "features/farming/lottery/Lottery";
import { TV } from "features/farming/other/TV";
import { Landbuild } from "features/farming/land/Landbuild";
import { LandMaxbuild } from "features/farming/land/LandMaxbuild"
import { Pvp } from "features/farming/pvp/Pvp";

import { Arena } from "features/farming/arena/Arena";

import { Loading } from "features/auth/components";
import { Market } from "features/farming/animals/Market";

import { useInterval } from "lib/utils/hooks/useInterval";
import * as AuthProvider from "features/auth/lib/Provider";

import { Context } from "./GameProvider";
import { Panel } from "components/ui/Panel";
import { ToastManager } from "./toast/ToastManager";
import { Decorations } from "./components/Decorations";
import { Success } from "./components/Success";
import { Syncing } from "./components/Syncing";

import { Quarry } from "features/farming/quarry/Quarry";
import { TeamDonation } from "features/farming/teamDonation/TeamDonation";
import { Forest } from "features/farming/forest/Forest";

import { Blacksmith } from "features/farming/blacksmith/Blacksmith";

import { StateValues } from "./lib/gameMachine";
import { Town } from "features/farming/town/Town";
import { ErrorCode } from "lib/errors";
import { ErrorMessage } from "features/auth/ErrorMessage";
import { House } from "features/farming/house/House";
import { Lore } from "./components/Lore";
import { ClockIssue } from "./components/ClockIssue";
import { screenTracker } from "lib/utils/screen";
import { Resetting } from "features/auth/components/Resetting";
import { GoblinShovel } from "features/farming/crops/components/GoblinShovel";
import { useTranslation } from "react-i18next";

const AUTO_SAVE_INTERVAL = 1000 * 30; // autosave every 30 seconds
const SHOW_MODAL: Record<StateValues, boolean> = {
  loading: true,
  playing: false,
  readonly: false,
  autosaving: false,
  syncing: true,
  synced: true,
  error: true,
  levelling: false,
  resetting: true,
};

export const Game: React.FC = () => {
  const { authService } = useContext(AuthProvider.Context);
  const { gameService } = useContext(Context);
  const [gameState, send] = useActor(gameService);
  const { t } = useTranslation();
  const [showLandMaxBuild, setShowLandMaxBuild] = useState(false);
  const handleClickArrow = () => {
    setShowLandMaxBuild(!showLandMaxBuild);
  };
  useInterval(() => send("SAVE"), AUTO_SAVE_INTERVAL);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (gameState.context.actions.length === 0) return;

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // cleanup on every gameState update
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [gameState]);

  useEffect(() => {
    const save = () => {
      send("SAVE");
    };

    window.addEventListener("blur", save);

    screenTracker.start(authService);

    // cleanup on every gameState update
    return () => {
      window.removeEventListener("blur", save);
      screenTracker.pause();
    };
  }, []);

  return (
    <>
      <ToastManager />

      <Modal show={SHOW_MODAL[gameState.value as StateValues]} centered>
        <Panel className="text-shadow">
          {gameState.matches("loading") && <Loading />}
          {gameState.matches("resetting") && <Resetting />}
          {gameState.matches("error") && (
            <ErrorMessage
              errorCode={gameState.context.errorCode as ErrorCode}
            />
          )}
          {gameState.matches("synced") && <Success />}
          {gameState.matches("syncing") && <Syncing />}
        </Panel>
      </Modal>

      {/*<ClockIssue show={gameState.context.offset > 0} />*/}
      <Hud />
      {/*<TeamDonation />*/}
      <Lottery />
      <TV />
      {showLandMaxBuild ? (
  <>
  <div style={{ display: "flex", alignItems: "center" }}>
  <LandMaxbuild />
  <img
    src="/images/lands/left-arrow1.png"
    alt="arrow-left"
    onClick={handleClickArrow}
    style={{  position: "absolute",
    zIndex: 1000,
    right: "50px",
    float: "left",
    top: "27.5%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    marginLeft: "10px" }}
    title={t("Return to the land")}
  />
</div>
  </>
) : (
  <>
    <div style={{ display: "flex", alignItems: "center" }}>
      
  <Landbuild />
  <img
    src="/images/lands/right-arrow1.png"
    alt="arrow-right"
    onClick={handleClickArrow}
    style={{  position: "absolute",
    zIndex: 1000,
    right: "40px",
    float: "right",
    top: "27.5%",
    transform: "translateY(-50%)",
    cursor: "pointer" }}
    title={t("Click to expand the land")}
  />
  {/* <img
    src="/images/lands/arrow-right.png"
    alt="arrow-right"
    onClick={handleClickArrow}
    style={{ marginLeft: "10px", cursor: "pointer",    height: "500px", width: "500px"  ,zIndex: 1,
    position: "relative", marginTop: "600px" }}
  /> */}
</div>
  </>
)}
      <Pvp />
      <Arena />
      <Crops />

      {/* <Water /> */}
      <Wolf />
      <Market />
      {/*<Decorations />*/}
      {/*<Forest />*/}
      {/*<Quarry />*/}
      <Town />
      {/*<House />*/}
      {/*<Lore />*/}
      <GoblinShovel />
    </>
  );
};
