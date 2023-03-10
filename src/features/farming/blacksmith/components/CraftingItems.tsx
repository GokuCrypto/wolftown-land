import React, { useContext, useState } from "react";
import { useActor } from "@xstate/react";
import classNames from "classnames";
import Decimal from "decimal.js-light";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import token from "assets/wt/balance.png";

import { Box } from "components/ui/Box";
import { OuterPanel } from "components/ui/Panel";
import { Button } from "components/ui/Button";
import { ToastContext } from "features/game/toast/ToastQueueProvider";
import { Context } from "features/game/GameProvider";
import { ITEM_DETAILS } from "features/game/types/images";
import { CraftableItem, Ingredient } from "features/game/types/craftables";
import { InventoryItemName } from "features/game/types/game";
import { Goods } from "components/ui/Goods";
import {
  reward,
  synthesis,
  getWolfUserGoodsToChainList,
} from "hooks/WolfConfig";
interface Props {
  items: Partial<Record<InventoryItemName, CraftableItem>>;
  isBulk?: boolean;
  onClose: () => void;
}
/*合成 铁匠铺 */
export const CraftingItems: React.FC<Props> = ({
  items,
  onClose,
  isBulk = false,
}) => {
  const [selected, setSelected] = useState<CraftableItem>(
    Object.values(items)[0]
  );

  /*   const [selectedIngredientName, setSelectedIngredientName] = useState<string>(
    Object.values(items)[0].name
  ); */
  const { t } = useTranslation();
  const { setToast } = useContext(ToastContext);
  const { gameService, shortcutItem } = useContext(Context);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [message, setMessage] = useState("");
  const [
    {
      context: { state },
    },
  ] = useActor(gameService);
  const inventory = state.inventory;

  const lessIngredients = (amount = 1) =>
    selected.ingredients?.some((ingredient) =>
      ingredient.amount.mul(amount).greaterThan(inventory[ingredient.item] || 0)
    );

  const lessFunds = (amount = 1) => {
    if (!selected.tokenAmount) return;

    return state.balance.lessThan(selected.tokenAmount.mul(amount));
  };

  const craft = (amount = 1) => {
    gameService.send("item.crafted", {
      item: selected.name,
      amount,
    });

    setToast({ content: "SFL -$" + selected.tokenAmount?.mul(amount) });

    selected.ingredients?.map((ingredient) => {
      setToast({
        content: ingredient.item + " -" + ingredient.amount.mul(amount),
      });
    });

    shortcutItem(selected.name);
  };

  const onCaptchaSolved = async (captcha: string | null) => {
    await new Promise((res) => setTimeout(res, 1000));

    gameService.send("SYNC", { captcha });

    onClose();
  };

  const handleNextSong = async (goodsName: string) => {
    const result = await synthesis(goodsName);

    if (!result.success) {
      setMessage(result.message);
    } else {
      setMessage("Synthesis succeeded!");
    }
  };

  const Action = () => {
    if (selected.disabled) {
      return <span className="text-xs mt-1 text-shadow">Locked</span>;
    }

    return (
      <div>
        {/* <p className="text-xxs no-wrap text-center my-1 underline">
            Sold out
          </p>
          <p className="text-xxs text-center">
            Sync your farm to the Blockchain to restock
          </p> */}
        <Button
          className="text-xs mt-1"
          onClick={() => {
            if (selected && selected.ingredients) {
              handleNextSong(
                selected?.ingredients[0].synthesis
                  ? selected?.ingredients[0].synthesis
                  : selected?.ingredients[0].item
              );
            }
          }}
        >
          Sync
        </Button>
        <span className="text-xs text-base"> {message} </span>
      </div>
    );
  };

  const stock = state.stock[selected.name] || new Decimal(0);

  return (
    <div className="flex">
      <div className="w-3/5 flex flex-wrap h-fit">
        {Object.values(items).map((item) => (
          <Box
            isSelected={selected.name === item.name}
            key={item.name}
            onClick={() => setSelected(item)}
            image={ITEM_DETAILS[item.name].image}
            count={inventory[item.name]}
          />
        ))}
      </div>
      <OuterPanel className="flex-1 w-2/3">

        <div className="flex flex-col justify-center items-center p-2 relative">
          <span className="text-shadow text-center">{selected.name}</span>
          <img
            src={ITEM_DETAILS[selected.name].image}
            className="h-16 img-highlight mt-1"
            alt={selected.name}
          />
          <span className="text-shadow text-center mt-2 sm:text-sm">
            {selected.description}
          </span>

          <div className="border-t border-white w-full mt-2 pt-1">
            {selected.ingredients?.map((ingredient, index) => {
              const item = ITEM_DETAILS[ingredient.item];
              const lessIngredient = new Decimal(
                inventory[ingredient.item] || 0
              ).lessThan(ingredient.amount);
              return (
                
                <div className="flex justify-center items-end" key={index}>
                  <img
                    src={item.image}
                    alt={item.description}
                    title={t(item.description)}
                    className="h-5 me-2"
                  />
                  <span
                    className={classNames(
                      "text-xs text-shadow text-center mt-2 ",
                      {
                        "text-red-500": lessIngredient,
                      }
                    )}
                  >
                    {ingredient.amount.toNumber()}
                  </span>
                  <Goods item={ingredient}  />
                </div>
              );
            })}

            <div className="flex justify-center items-end">
              <img src={token} className="h-5 mr-1" />
              <span
                className={classNames("text-xs text-shadow text-center mt-2 ", {
                  "text-red-500": lessFunds(),
                })}
              >
                {`${selected.tokenAmount?.toNumber()}`}
              </span>
            </div>
          </div>
          {Action()}
        </div>
      </OuterPanel>
    </div>
  );
};
