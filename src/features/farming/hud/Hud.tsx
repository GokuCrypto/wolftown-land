import React from "react";

import { Balance } from "./components/Balance";
import { LangButton } from "./components/LangButton";
import { Inventory } from "./components/Inventory";
import { Bag } from "./components/Bag";
import { Invite } from "./components/Invite";

import { Menu } from "./components/Menu";
import { AudioPlayer } from "components/ui/AudioPlayer";
import { VisitBanner } from "./components/VisitBanner";
import { NftWallet } from "./components/NftWallet";

/**
 * Heads up display - a concept used in games for the small overlayed display of information.
 * Balances, Inventory, actions etc.
 */
export const Hud: React.FC = () => {
  return (
    <div data-html2canvas-ignore="true" aria-label="Hud">
      <Menu />
      {/* <LangButton /> */}
      <Balance />
      <NftWallet />
      <Bag />
      {/* <Invite /> */}
      {/*<AudioPlayer isFarming />*/}
      <VisitBanner />
    </div>
  );
};
