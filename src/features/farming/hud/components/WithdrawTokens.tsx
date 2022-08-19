import { useActor } from "@xstate/react";
import React, { useContext, useEffect, useState } from "react";
import Decimal from "decimal.js-light";
import { toWei } from "web3-utils";

import * as AuthProvider from "features/auth/lib/Provider";

import { Context } from "features/game/GoblinProvider";

import { shortAddress } from "features/farming/hud/components/Address";

import { Button } from "components/ui/Button";

import { metamask } from "lib/blockchain/metamask";

import token from "assets/icons/token.gif";
import player from "assets/icons/player.png";
import upArrow from "assets/icons/arrow_up.png";
import downArrow from "assets/icons/arrow_down.png";

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { getTax } from "lib/utils/tax";
import { getOnChainState } from "features/game/actions/onchain";

import { getAccountInfo } from "hooks/WolfConfig";
import { Balances, EMPTY_BALANCES } from '../lib/types'

interface Props {
  balances: Balances;
  onWithdraw: (sfl: string) => void;
}
export const WithdrawTokens: React.FC<Props> = ({ balances, onWithdraw }) => {
  const { authService } = useContext(AuthProvider.Context);
  const [authState] = useActor(authService);

  // const { goblinService } = useContext(Context);
  // const [goblinState] = useActor(goblinService);

  const [tokenType, setTokenType] = useState<keyof Balances>("BUSD")

  const [amount, setAmount] = useState<Decimal>(new Decimal(0));

  // const [balance, setBalance] = useState<Decimal>(new Decimal(0));

  const [ freshBalances, setFreshBalances ] = useState<Balances>(balances)

  const [isLoading, setIsLoading] = useState(true);

  const displayTokenName = () => {
    if(tokenType === "WTWOOL") return "WOOL"
    if(tokenType === "WTMILK") return "MILK"
    return tokenType
  }

  useEffect(() => {
    setIsLoading(true);
    const load = async () => {
      const info = await getAccountInfo()
      setFreshBalances(info);
      setIsLoading(false);
    };
    if(JSON.stringify(balances) === JSON.stringify(EMPTY_BALANCES)) load();
  }, [balances]);

  const balance = new Decimal(balances[tokenType])

  // In order to be able to type into the input box amount needs to be able to be a string
  // for when the user deletes the 0. safeAmount is a getter that will return amount as a Decimal
  const safeAmount = (value: Decimal | string): Decimal => {
    return typeof value !== "string" ? value : new Decimal(0);
  };

  const withdraw = () => {
    if (amount > new Decimal(0)) {
      onWithdraw(toWei(amount.toString()));
    } else {
      setAmount(new Decimal(0));
    }
  };

  const onWithdrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setAmount(new Decimal(0));
    } else {
      setAmount(new Decimal(Number(e.target.value)));
    }
  };

  const setMax = () => {
    if (balance.gte(0.01)) setAmount(balance.minus(new Decimal(0.01)));
  };

  const incrementWithdraw = () => {
    if (
      safeAmount(amount).plus(0.1).toNumber() <
      balance.toDecimalPlaces(2, 1).toNumber()
    )
      setAmount((prevState) => safeAmount(prevState).plus(0.1));
  };

  const decrementWithdraw = () => {
    if (safeAmount(amount).toNumber() > 0.01) {
      if (safeAmount(amount).minus(0.1).toNumber() >= 0)
        setAmount((prevState) => safeAmount(prevState).minus(0.1));
    }
  };

  if (isLoading) {
    return <span className="text-shadow loading mt-2">Loading</span>;
  }

  // Use base 1000
  const tax = getTax(typeof amount !== "string" ? amount : new Decimal(0)) / 10;

  // const enabled = authState.context.token?.userAccess.withdraw;
  const disableWithdraw =
    safeAmount(amount).gte(balance) || safeAmount(amount).lt(0);

  // if (!enabled) {
  //   return <span>Available May 9th</span>;
  // }

  return (
    <>
      <div className="flex flex-wrap">
        <ButtonGroup className="mb-2">
          <ToggleButton
            key="busd"
            id="busd"
            type="radio"
            variant="secondary"
            name="radio"
            value="BUSD"
            checked={tokenType === 'BUSD'}
            onClick={() => setTokenType("BUSD")}
          >
            BUSD
          </ToggleButton>
          <ToggleButton
            key="wool"
            id="wool"
            type="radio"
            variant="secondary"
            name="radio"
            value="WTWOOL"
            checked={tokenType === 'WTWOOL'}
            onClick={(e) => setTokenType("WTWOOL")}
          >
            WOOL
          </ToggleButton>
          <ToggleButton
            key="milk"
            id="milk"
            type="radio"
            variant="secondary"
            name="radio"
            value="WTMILK"
            checked={tokenType === 'WTMILK'}
            onClick={(e) => setTokenType("WTMILK")}
          >
            MILK
          </ToggleButton>
        </ButtonGroup>
        
      </div>
      <div>
        <span className="mb-3 text-base">Choose amount to withdraw</span>
      </div>
      <span className="text-sm">
        {balances[tokenType]} { displayTokenName() } is available
      </span>
      <div className="flex items-center mt-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Withdraw Address"
            className="text-shadow shadow-inner shadow-black bg-brown-200 p-2"
            style={{ width: "600px", maxWidth: "100%" }}
          />
        </div>
      </div>
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
              onChange={onWithdrawChange}
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
            Max
          </Button>
        </div>

        {amount.gte(0) && (
          <>
            <span className="text-xs">
              <span className="text-xs">{tax}% fee</span>
              {/*<a
                className="underline ml-2"
                href="https://docs.sunflower-land.com/fundamentals/withdrawing"
                target="_blank"
                rel="noreferrer"
              >
                (Read more)
              </a>*/}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center mt-3">
        <span className="">
          {`You will receive: ${safeAmount(amount)
            .mul((100 - tax) / 100)
            .toFixed(1)}`}
        </span>
        <span className="ml-2">{ displayTokenName() }</span> 
      </div>

      
      <Button onClick={withdraw} disabled={disableWithdraw}>
        Withdraw
      </Button>
    </>
  );
};
