import React, { useContext, useEffect, useState } from "react";
import { useActor } from "@xstate/react";
import { Routes, Route, HashRouter } from "react-router-dom";
import bag from "assets/wt/backpack.png";
import * as AuthProvider from "features/auth/lib/Provider";
import { useTranslation } from "react-i18next";
import { Splash } from "features/auth/components/Splash";
import { Auth } from "features/auth/Auth";
import { Humans } from "features/game/Humans";
import { Goblins } from "features/game/Goblins";
import { WolfTown } from "features/game/WolfTown";
import { WolfTownWorld } from "features/game/WolfTownWorld";
import { Label } from "components/ui/Label";
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
  const { t } = useTranslation();

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
    // This is to prevent a modal clash when the authmachine switches   // to the game machine.
    setTimeout(() => setShowGame(_showGame), 20);
  }, [authState, authState.value]);

  return (
    <>
      <div
        // className="w-12 h-12 sm:mx-8 mt-2 relative flex justify-center items-center shadow rounded-full cursor-pointer"
        onClick={() => setShowWorld(true)}
      >
        <img src={bag} className="absolute w-full h-full -z-20" alt="Bag" />
        {/* <img src={bag} className="w-8 mb-1" alt="inventory" /> */}
        <Label className="hidden sm:block absolute -bottom-7">{t("Bag")}</Label>
      </div>
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
