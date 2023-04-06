import React, { useEffect, useState } from "react";
import Decimal from "decimal.js-light";
import { BigBox } from "components/ui/BigBox";
import { useTranslation } from "react-i18next";
import { CopyField } from "components/ui/CopyField";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Button } from "components/ui/Button";
import { getNftToChainList, nftWithdraw } from "hooks/WolfConfig";

import {
  Balances,
  EMPTY_BALANCES,
  Allowances,
  EMPTY_ALLOWANCES,
} from "../lib/types";
import { metamask } from "lib/blockchain/metamask";
import { queryBaglist } from "hooks/WolfConfig";

const ITEM_CARD_MIN_HEIGHT = "148px";

interface Props {
  address: string;
}

const TAB_CONTENT_HEIGHT = 380;

export const NftWithdrawTab = () => {
  const { t } = useTranslation();

  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const [animals, setAnimals] = useState<any>([]);
  const [lands, setLands] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenType, setTokenType] = useState<any>("Animal");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const load = async () => {
      const bags = await queryBaglist();
      setAnimals(bags.filter((b: any) => b.goodsType === "Animal"));
      setLands(bags.filter((b: any) => b.goodsType === "Equip"));
      setIsLoading(false);
    };
    load();
  }, []);

  const handleSelect = (id: string | number) => {
    /* if (selectedIds.find((v) => v === id)) {
      setSelectedIds(selectedIds.filter((v) => v !== id));
    } else {
      setSelectedIds(selectedIds.concat([id]));
    } */
    selectedIds[0] = id;
    setSelectedIds(selectedIds);
    setIsLoading(!isLoading);
  };

  const toCenterSign = async () => {
    //暂时只能一个

    if (selectedIds.length != 1) {
      setMessage("Only one can be selected");
      return;
    }

    nftWithdraw(selectedIds[0]).then((result) => {
      if (result.success) {
        setMessage("Success");
      } else {
        setMessage(result?.message);
      }
    });
  };

  return (
    <div className="flex flex-col" style={{ minHeight: TAB_CONTENT_HEIGHT }}>
      <div className="flex flex-wrap">
        <ButtonGroup className="mb-2">
          <ToggleButton
            key="busd"
            id="busd"
            type="radio"
            variant="warning"
            name="radio"
            value="Animal"
            checked={tokenType === "Animal"}
            onClick={() => setTokenType("Animal")}
            className={
              tokenType === "Animal" ? "text-white" : "text-white bg-yellow-600"
            }
          >
            Animals
          </ToggleButton>
          <ToggleButton
            key="wool"
            id="wool"
            type="radio"
            variant="warning"
            name="radio"
            value="Land"
            checked={tokenType === "Land"}
            onClick={(e) => setTokenType("Land")}
            className={
              tokenType === "Land" ? "text-white" : "text-white bg-yellow-600"
            }
          >
            Lands
          </ToggleButton>
        </ButtonGroup>
      </div>
      <div
        className="w-full flex flex-wrap h-fit"
        style={{ maxHeight: TAB_CONTENT_HEIGHT, overflowY: "auto" }}
      >
        {tokenType === "Animal" &&
          animals.map((animal: any, i: number) => (
            <BigBox
              key={`animal_${animal.id}`}
              isSelected={selectedIds.find((v) => v === animal.id)}
              onClick={() => handleSelect(animal.id)}
              image={animal.goodsUrl}
              id={animal.nftId}
            />
          ))}
        {tokenType === "Land" &&
          lands.map((animal: any, i: number) => (
            <BigBox
              key={`land_${animal.id}`}
              isSelected={selectedIds.find((v) => v === animal.id)}
              onClick={() => handleSelect(animal.id)}
              image={animal.goodsUrl}
              id={animal.nftId}
            />
          ))}
      </div>
      <div className="mt-2">
        <Button onClick={toCenterSign}>{t("Withdraw")}</Button>
      </div>
      <div className="mt-2">
        <span className="text-xs text-base"> {message} </span>
      </div>
    </div>
  );
};
