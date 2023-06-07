import React, { useContext, useEffect, useState } from "react";
import { useActor } from "@xstate/react";
import { Routes, Route, HashRouter } from "react-router-dom";

import * as AuthProvider from "features/auth/lib/Provider";

import { Splash } from "features/auth/components/Splash";
import { Auth } from "features/auth/Auth";
import { Humans } from "features/game/Humans";
import { Goblins } from "features/game/Goblins";
import { WolfTown } from "features/game/WolfTown";
import { WolfTownWorld } from "features/game/WolfTownWorld";

import { Forbidden } from "features/auth/components/Forbidden";

/**
 * Entry point for game which reflects the user session state
 * Controls flow of authorised and unauthorised games
 */
export const Navigation: React.FC = () => {
  const { authService } = useContext(AuthProvider.Context);
  const [authState, send] = useActor(authService);
  const [showGame, setShowGame] = useState(false);
  //世界地图开关
  const [showWorld, setShowWorld] = useState(true);

  /**
   * Listen to web3 account/chain changes
   * TODO: move into a hook
   */
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        send("CHAIN_CHANGED");
      });

      window.ethereum.on("accountsChanged", function () {
        send("ACCOUNT_CHANGED");
      });
    }
  }, [send]);

  useEffect(() => {
    const _showGame =
      authState.matches({ connected: "authorised" }) ||
      authState.matches("visiting");

    // TODO: look into this further
    // This is to prevent a modal clash when the authmachine switches
    // to the game machine.
    setTimeout(() => setShowGame(_showGame), 20);
  }, [authState, authState.value]);

  return (
    <>
      <Auth />
      {showGame ? (
        <>
          {!showWorld && (
            <HashRouter>
              <Routes>
                <Route path="/" element={<Humans />} />
                {/* Forbid entry to Goblin Village when in Visiting State, show Forbidden screen */}
                {!authState.matches("visiting") ? (
                  <Route path="/goblins" element={<Goblins />} />
                ) : (
                  <Route
                    path="/goblins"
                    element={
                      <Splash>
                        <Forbidden />
                      </Splash>
                    }
                  />
                )}
                <Route path="/farm/:id" element={<Humans key="farm" />} />
                <Route path="/visit/:id" element={<Humans key="visit" />} />
                <Route path="/game" element={<WolfTown />} />
                {/* Fallback */}
                <Route element={<Humans />} />
              </Routes>
            </HashRouter>
          )}

          {showWorld && (
            <HashRouter>
              <Routes>
                <Route path="/game" element={<WolfTownWorld />} />
                {/* Fallback */}
              </Routes>
            </HashRouter>
          )}
        </>
      ) : (
        <Splash />
      )}
    </>
  );
};
