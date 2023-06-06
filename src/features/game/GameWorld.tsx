import { useActor } from "@xstate/react";
import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import { Loading } from "features/auth/components";

import * as AuthProvider from "features/auth/lib/Provider";
import { useInterval } from "lib/utils/hooks/useInterval";

import { Panel } from "components/ui/Panel";
import { Success } from "./components/Success";
import { Syncing } from "./components/Syncing";
import { Context } from "./GameProvider";
import { ToastManager } from "./toast/ToastManager";
import { HudWorld } from "features/farming/hud/HudWorld";
import { Resetting } from "features/auth/components/Resetting";
import { ErrorMessage } from "features/auth/ErrorMessage";
import { Player } from "features/farming/crops/components/Player";
import { MyTown } from "features/farming/crops/components/MyTown";
import { Wood } from "features/farming/crops/components/Wood";

import { SocketTest } from "features/farming/crops/components/SocketTest";

import { ErrorCode } from "lib/errors";
import { screenTracker } from "lib/utils/screen";
import { useTranslation } from "react-i18next";
import { StateValues } from "./lib/gameMachine";

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

export const GameWorld: React.FC = () => {
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

      <HudWorld />

      <Player />

      <SocketTest />
      <Wood />
      <MyTown />
    </>
  );
};
