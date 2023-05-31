import React, { useEffect, useState } from "react";
import Decimal from "decimal.js-light";
import { Box } from "components/ui/Box";
import { useTranslation } from "react-i18next";
import { CopyField } from "components/ui/CopyField";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Button } from "components/ui/Button";

import {
  Balances,
  EMPTY_BALANCES,
  Allowances,
  EMPTY_ALLOWANCES,
} from "../lib/types";
import { metamask } from "lib/blockchain/metamask";

// import { ITEM_DETAILS } from "features/game/types/images";
// import { InventoryItemName } from "features/game/types/game";
// import { SEEDS, CropName } from "features/game/types/crops";
// import timer from "assets/icons/timer.png";
// import lightning from "assets/icons/lightning.png";

// import { secondsToMidString } from "lib/utils/time";
// import classNames from "classnames";
// import { useShowScrollbar } from "lib/utils/hooks/useShowScrollbar";
// import { useScrollIntoView } from "lib/utils/hooks/useScrollIntoView";
// import { Inventory, TabItems } from "./InventoryItems";
// import { getShortcuts } from "../lib/shortcuts";
// import { hasBoost } from "features/game/lib/boosts";
// import { getCropTime } from "features/game/events/plant";
// import { getKeys } from "features/game/types/craftables";

const ITEM_CARD_MIN_HEIGHT = "148px";

interface Props {
  address: string;
}

const TAB_CONTENT_HEIGHT = 380;

export const DepositTabContent = ({ address }: Props) => {
  const { t } = useTranslation();
  const [tokenType, setTokenType] = useState<keyof Balances>("BUSD");
  const [amount, setAmount] = useState<Decimal>(new Decimal(0));
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const displayTokenName = () => {
    if (tokenType === "WTWOOL") return "WOOL";
    if (tokenType === "WTMILK") return "MILK";
    return tokenType;
  };
  const [balances, setBalances] = useState<Balances>(EMPTY_BALANCES);
  const [allowances, setAllowances] = useState<Allowances>(EMPTY_ALLOWANCES);
  const [approved, setApproved] = useState(false);
  const [pendingTx, setPendingTx] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const load = async () => {
      await metamask.initialise();
      const balances = await metamask.getBalances();
      setBalances(balances);
      const allowances = await metamask.getAllowances();
      setAllowances(allowances);
      setIsLoading(false);
    };
    load();
  }, [approved]);

  const balance = new Decimal(balances[tokenType]);
  const allowance = new Decimal(allowances[tokenType]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setAmount(new Decimal(0));
    } else {
      setAmount(new Decimal(Number(e.target.value)));
    }
  };
  const setMax = () => {
    setAmount(balance.toDecimalPlaces(2, Decimal.ROUND_DOWN));
  };

  const deposit = async () => {
    setMessage("");
    await metamask.initialise();
    setPendingTx(true);
    if (new Decimal(amount).gt(allowance) || allowance.eq(0)) {
      const receipt: any = await metamask.approve(tokenType);
      if (receipt?.status) {
        setApproved(true);
        setMessage("Approved Successfully");
      } else {
        setPendingTx(false);
        return;
      }
    }

    try {
      const receipt: any = await metamask.deposit(tokenType, amount.toString());
      if (receipt?.status) {
        setMessage("Deposit Successfully");
        setPendingTx(false);
      }
    } catch (error: any) {
      // console.log("error===", error.message)
      if (error?.message) {
        setMessage(error?.message);
      } else {
        setMessage(error.toString());
      }
      setPendingTx(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col" style={{ minHeight: TAB_CONTENT_HEIGHT }}>
        <div className="mt-2">
          <span className="text-shadow loading mt-2">Loading</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ minHeight: TAB_CONTENT_HEIGHT }}>
      <div className="mt-2">
        <div className="flex flex-wrap">
          <ButtonGroup className="mb-2">
            <ToggleButton
              key="busd"
              id="busd"
              type="radio"
              variant="warning"
              name="radio"
              value="BUSD"
              checked={tokenType === "BUSD"}
              onClick={() => setTokenType("BUSD")}
              className={
                tokenType === "BUSD" ? "text-white" : "text-white bg-yellow-600"
              }
            >
              BUSD
            </ToggleButton>
            <ToggleButton
              key="wool"
              id="wool"
              type="radio"
              variant="warning"
              name="radio"
              value="WTWOOL"
              checked={tokenType === "WTWOOL"}
              onClick={(e) => setTokenType("WTWOOL")}
              className={
                tokenType === "WTWOOL"
                  ? "text-white"
                  : "text-white bg-yellow-600"
              }
            >
              WOOL
            </ToggleButton>
            <ToggleButton
              key="milk"
              id="milk"
              type="radio"
              variant="warning"
              name="radio"
              value="WTMILK"
              checked={tokenType === "WTMILK"}
              onClick={(e) => setTokenType("WTMILK")}
              className={
                tokenType === "WTMILK"
                  ? "text-white"
                  : "text-white bg-yellow-600"
              }
            >
              MILK
            </ToggleButton>
          </ButtonGroup>
        </div>
        <div>
          <span className="mb-3 text-base">{t("Input amount to deposit")}</span>
        </div>
        <span className="text-sm">
          {balance.toDecimalPlaces(2, Decimal.ROUND_DOWN).toString()}{" "}
          {displayTokenName()} {t("is available")}
        </span>

        {/*<div className="flex items-center mt-2">
          <div className="relative">
            <input
              type="text"
              placeholder={ t('Deposit Address') }
              className="shadow-inner shadow-black bg-brown-200 p-2"
              readOnly
              style={{ width: "600px", maxWidth: "100%" }}
              value={address}
            />
          </div>
        </div>*/}
        <div className="h-16">
          <div className="flex items-center mt-2">
            <div className="relative mr-4">
              <input
                type="number"
                className="text-shadow shadow-inner shadow-black bg-brown-200 w-48 p-2 text-right"
                step="0.1"
                value={
                  typeof amount === "string"
                    ? ""
                    : amount.toDecimalPlaces(2, Decimal.ROUND_DOWN).toNumber()
                }
                onChange={onInputChange}
              />
              {/*<img
                src={upArrow}
                alt="increment donation value"
                className="cursor-pointer w-3 absolute -right-4 top-0"
                onClick={incrementWithdraw}
              />
              <img
                src={downArrow}
                alt="decrement donation value"
                className="cursor-pointer w-3 absolute -right-4 bottom-0"
                onClick={decrementWithdraw}
              />*/}
            </div>
            <Button className="w-24 ml-6" onClick={setMax}>
              {t("Max")}
            </Button>
          </div>
        </div>
        <Button onClick={deposit} disabled={pendingTx}>
          {t("Deposit")}
        </Button>

        <span className="text-xs">
          <span className="text-xs text-base"> {message} </span>
        </span>
      </div>
    </div>
  );
};
