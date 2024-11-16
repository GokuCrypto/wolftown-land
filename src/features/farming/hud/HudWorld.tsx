import React from "react";

import { Bag } from "./components/Bag";

/**
 * Heads up display - a concept used in games for the small overlayed display of information.
 * Balances, Inventory, actions etc.
 */
export const HudWorld: React.FC = () => {
  return (
    <div data-html2canvas-ignore="true" aria-label="Hud">
      <Bag />
    </div>
  );
};
