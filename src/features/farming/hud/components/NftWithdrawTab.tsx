import React, { useEffect, useState } from "react";
import Decimal from "decimal.js-light";
import { BigBox } from "components/ui/BigBox";
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
    if (selectedIds.find((v) => v === id)) {
      setSelectedIds(selectedIds.filter((v) => v !== id));
    } else {
      setSelectedIds(selectedIds.concat([id]));
    }
  };

  const withdraw = async () => {};
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
        {isLoading && (
          <p className="text-white text-xs text-shadow mb-2 pl-2.5">
            Loading...
          </p>
        )}

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
        <Button onClick={withdraw} disabled={isLoading}>
          {t("Withdraw")}
        </Button>
      </div>
    </div>
  );
};
