import React, { useContext, useState, useEffect } from "react";
import { useActor } from "@xstate/react";
import classNames from "classnames";
import Decimal from "decimal.js-light";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import token from "assets/wt/balance.png";
import { WolfMarket } from "hooks/modules/WolfMarket";
import { Box } from "components/ui/Box";
import { OuterPanel } from "components/ui/Panel";
import { Button } from "components/ui/Button";
import { ToastContext } from "features/game/toast/ToastQueueProvider";
import { Context } from "features/game/GameProvider";
import { ITEM_DETAILS } from "features/game/types/images";
import { CraftableItem, Ingredient } from "features/game/types/craftables";
import { InventoryItemName } from "features/game/types/game";
import { Goods } from "components/ui/Goods";
import { marketList } from "hooks/WolfConfig";
interface Props {
  isBulk?: boolean;
  onClose: () => void;
}
/*合成 铁匠铺 */
export const CraftingItems: React.FC<Props> = ({ onClose, isBulk = false }) => {
  const [selected, setSelected] = useState<any>();
  const [items, setItems] = useState<any[]>();
  const { t } = useTranslation();
  const { setToast } = useContext(ToastContext);
  const { gameService, shortcutItem } = useContext(Context);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [message, setMessage] = useState("");
  const [pageNo, setPageNo] = useState("1");
  const [pageSize, setPageSize] = useState("20");
  const [
    {
      context: { state },
    },
  ] = useActor(gameService);
  const inventory = state.inventory;
  const [isLoading, setIsLoading] = useState(false);

  const loadWolfMarketList = async () => {
    setIsLoading(true);
    try {
      const wolfMarket = new WolfMarket();
      wolfMarket.status = "0";

      console.log("wolfMarket.status ", wolfMarket.status);
      const result = await marketList(wolfMarket, pageNo, pageSize);

      if (result?.result?.records) {
        setItems(result?.result?.records);
      }

      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWolfMarketList();
  }, []);

  const handleNextSong = async (goodsName: string) => {
    /*  if (!result.success) {
      setMessage(result.message);
    } else {
      setMessage("Synthesis succeeded!");
    } */
  };

  const Action = () => {
    return (
      <div>
        <Button
          className="text-xs mt-1"
          onClick={() => {
            if (selected) {
              handleNextSong(selected);
            }
          }}
        >
          Buy
        </Button>
        <span className="text-xs text-base"> {message} </span>
      </div>
    );
  };

  return (
    <div className="flex">
      <div className="w-3/5 flex flex-wrap h-fit">
        {items != null &&
          Object.values(items).map((item) => (
            <Box
              isSelected={selected?.id === item?.id}
              key={item?.id}
              onClick={() => setSelected(item)}
              image={item?.goodsUrl}
            />
          ))}
      </div>
      <OuterPanel className="flex-1 w-2/3">
        <div className="flex flex-col justify-center items-center p-2 relative">
          <span className="text-shadow text-center">{selected?.goodsName}</span>
          <img
            src={selected?.goodsUrl}
            className="h-16 img-highlight mt-1"
            alt={selected?.goodsName}
          />
          <span className="text-shadow text-center mt-2 sm:text-sm">
            <img src={token} className="h-5 mr-1" />
          </span>
          <span className="text-shadow text-center mt-2 sm:text-sm">
            {selected?.price}
          </span>
          <span className="text-shadow text-center mt-2 sm:text-sm">
            {selected?.biddingEndTime != null && "End time:"}
            {selected?.biddingEndTime}
          </span>
          <span className="text-shadow text-center mt-2 sm:text-sm">
            {selected?.numberOfBids != null && "Number of bids:"}
            {selected?.numberOfBids}
          </span>

          {Action()}
        </div>
      </OuterPanel>
    </div>
  );
};
