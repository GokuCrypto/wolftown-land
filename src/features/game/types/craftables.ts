import Decimal from "decimal.js-light";
import { SeedName, SEEDS } from "../types/crops";
import { InventoryItemName } from "../types/game";
import { Section } from "lib/utils/hooks/useScrollIntoView";
import { Flag, FLAGS } from "./flags";
import { marketRate } from "../lib/halvening";
import { KNOWN_IDS, KNOWN_ITEMS, LimitedItemType } from ".";
import { OnChainLimitedItems } from "../lib/goblinMachine";
import { isArray } from "lodash";
import { useTranslation } from "react-i18next";
export { FLAGS };

export type CraftAction = {
  type: "item.crafted";
  item: InventoryItemName;
  amount: number;
};

export type CraftableName =
  | LimitedItemName
  | Tool
  | SeedName
  | Food
  | Animal
  | Flag | Synthesis | Exchanges;

export interface Craftable {
  name: CraftableName;
  description: string;
  price?: Decimal;
  ingredients: Ingredient[];
  limit?: number;
  supply?: number;
  disabled?: boolean;
  requires?: InventoryItemName;
  section?: Section;
}

// NEW ===========

export type Ingredient = {
  id?: number;
  item: InventoryItemName;
  amount: Decimal;
  img?: string;
  synthesis?: string;
};

export interface CraftableItem {
  id?: number;
  name: CraftableName;
  description: string;
  tokenAmount?: Decimal;
  ingredients?: Ingredient[];
  disabled?: boolean;
  requires?: InventoryItemName;
  img?: string;
}

export interface LimitedItem extends CraftableItem {
  maxSupply?: number;
  section?: Section;
  cooldownSeconds?: number;
  mintedAt?: number;
  type?: LimitedItemType;
}

export type BlacksmithItem =
  | "Sunflower Statue"
  | "Potato Statue"
  | "Christmas Tree"
  | "Gnome"
  | "Sunflower Tombstone"
  | "Sunflower Rock"
  | "Goblin Crown"
  | "Fountain"
  | "Woody the Beaver"
  | "Apprentice Beaver"
  | "Foreman Beaver"
  | "Nyon Statue"
  | "Homeless Tent"
  | "Egg Basket"
  | "Farmer Bath";

export type BarnItem =
  | "Farm Cat"
  | "Farm Dog"
  | "Chicken Coop"
  | "Gold Egg"
  | "Easter Bunny";

export type MarketItem =
  | "Nancy"
  | "Scarecrow"
  | "Kuebiko"
  | "Golden Cauliflower"
  | "Mysterious Parsnip"
  | "Carrot Sword";

export type LimitedItemName = BlacksmithItem | BarnItem | MarketItem | Flag;

export type Tool =
  | "Axe"
  | "Pickaxe"
  | "Stone Pickaxe"
  | "Iron Pickaxe"
  | "Hammer"
  | "Rod";

export type Synthesis = "Animal Coupons For Wolf" | "Animal Coupons For Sheep" | "Wool Coupons" | "Sheep Coupons" | "Land Coupons" | "Land NFT Coupons" | "artillery" | "bartizan" | "Catapult" | "Cyclone wheel car" | "Rush Car" | "Land-L1|M1" | "Land-L2" | "Land-L3" | "Land-M2" | "Land-M3" | "MaxLand-L2" | "MaxLand-L3" | "MaxLand-M2" | "MaxLand-M3" | "Animal feces ball";

export type Exchanges = "Animal NFT Coupons";




export type Food =
  | "Pumpkin Soup"
  | "Roasted Cauliflower"
  | "Sauerkraut"
  | "Radish Pie";

export type Fragment =
  "Wool Fragment" | "Sheep Fragment" | "Land Fragment" | "Animal feces";


export type Wood =
  "Black sunken" | "Black sunken2" | "Black sunken3" | "Chinese parasol" | "Chinese parasol2" | "Chinese parasol3" | "Corundum" | "Corundum2" | "Corundum3" | "fir wood" | "fir wood2" | "fir wood3" | "pine" | "pine2" | "pine3" | "Land-L1" | "Land-M1" | "MaxLand-L1" | "MaxLand-M1";


export type Stone =
  "copper" | "copper2" | "copper3" | "gold" | "gold2" | "gold3" | "iron" | "iron2" | "iron3" | "Red gold" | "Red gold2" | "Red gold3" | "titanium" | "titanium2" | "titanium3" | "Level_1 drawing" | "Level_2 drawing" | "Level_3 drawing" | "Level_4 drawing" | "Level_5 drawing";


export type Animal = "Chicken" | "Cow" | "Pig" | "Sheep";

export const FOODS: () => Record<Food, CraftableItem> = () => ({
  "Pumpkin Soup": {
    name: "Pumpkin Soup",
    description: "A creamy soup that goblins love",
    tokenAmount: marketRate(3),
    ingredients: [
      {
        item: "Pumpkin",
        amount: new Decimal(5),
      },
    ],
    limit: 1,
  },
  Sauerkraut: {
    name: "Sauerkraut",
    description: "Fermented cabbage",
    tokenAmount: marketRate(25),
    ingredients: [
      {
        item: "Cabbage",
        amount: new Decimal(10),
      },
    ],
  },
  "Roasted Cauliflower": {
    name: "Roasted Cauliflower",
    description: "A Goblin's favourite",
    tokenAmount: marketRate(150),
    ingredients: [
      {
        item: "Cauliflower",
        amount: new Decimal(30),
      },
    ],
  },
  "Radish Pie": {
    name: "Radish Pie",
    description: "Despised by humans, loved by goblins",
    tokenAmount: marketRate(300),
    ingredients: [
      {
        item: "Radish",
        amount: new Decimal(60),
      },
    ],
  },
});

export const TOOLS: Record<Tool, CraftableItem> = {
  Axe: {
    name: "Axe",
    description: "Used to collect wood",
    tokenAmount: new Decimal(1),
    ingredients: [],
  },
  Pickaxe: {
    name: "Pickaxe",
    description: "Used to collect stone",
    tokenAmount: new Decimal(1),
    ingredients: [
      {
        item: "Wood",
        amount: new Decimal(2),
      },
    ],
  },
  "Stone Pickaxe": {
    name: "Stone Pickaxe",
    description: "Used to collect iron",
    tokenAmount: new Decimal(2),
    ingredients: [
      {
        item: "Wood",
        amount: new Decimal(3),
      },
      {
        item: "Stone",
        amount: new Decimal(3),
      },
    ],
  },
  "Iron Pickaxe": {
    name: "Iron Pickaxe",
    description: "Used to collect gold",
    tokenAmount: new Decimal(5),
    ingredients: [
      {
        item: "Wood",
        amount: new Decimal(5),
      },
      {
        item: "Iron",
        amount: new Decimal(3),
      },
    ],
  },
  Hammer: {
    name: "Hammer",
    description: "Used to construct buildings",
    tokenAmount: new Decimal(5),
    ingredients: [
      {
        item: "Wood",
        amount: new Decimal(5),
      },
      {
        item: "Stone",
        amount: new Decimal(5),
      },
    ],
    disabled: true,
  },
  Rod: {
    name: "Rod",
    description: "Used to fish trout",
    tokenAmount: new Decimal(5),
    ingredients: [
      {
        item: "Wood",
        amount: new Decimal(5),
      },
    ],
    disabled: true,
  },
};



export const SynthesisGoods: Record<Synthesis, CraftableItem> = {
  "Animal Coupons For Wolf": {
    name: "Animal Coupons For Wolf",
    description: "Used to Exchange Animal Coupons",
    tokenAmount: new Decimal(500),

    ingredients: [{
      item: "Wool Coupons",

      amount: new Decimal(2),
    },],
  },
  "Animal Coupons For Sheep": {
    name: "Animal Coupons For Sheep",
    description: "Used to Exchange Animal Coupons",
    tokenAmount: new Decimal(500),

    ingredients: [
      {

        item: "Sheep Coupons",
        amount: new Decimal(3),
      },
    ],
  },


  "Wool Coupons": {
    name:"Wool Coupons",
    description: "Used to collect Animal Coupons",

    tokenAmount: new Decimal(100),
    ingredients: [
      {

        item: "Wool Fragment",
        amount: new Decimal(10),
      },

    ],
  },
  "Sheep Coupons": {
    name: "Sheep Coupons",
    description: "Used to collect Animal Coupons",
    tokenAmount: new Decimal(100),

    ingredients: [
      {

        item: "Sheep Fragment",
        amount: new Decimal(10),
      },

    ],
  },
  "Land Coupons": {
    name: "Land Coupons",
    description: "Used to collect Land NFT",
    tokenAmount: new Decimal(100),

    ingredients: [
      {

        item: "Land Fragment",
        amount: new Decimal(10),
      },

    ],
  },
  "Land NFT Coupons": {
    name: "Land NFT Coupons",
    description: "Used to Exchange Land NFT",
    tokenAmount: new Decimal(500),

    ingredients: [
      {

        item: "Land Coupons",
        amount: new Decimal(5),
      },

    ],
  },

  "Animal feces ball": {
    name: "Animal feces ball",
    description: "Animal feces ball",
    tokenAmount: new Decimal(0),
    ingredients: [
      {

        item: "Animal feces",
        amount: new Decimal(10),
      },

    ],
  },
  /*多个合成区 */
  "bartizan": {
    name: "bartizan", description: "bartizan", tokenAmount: new Decimal(100), ingredients: [
      {
        item: "Chinese parasol", amount: new Decimal(10), synthesis: "@Chinese parasol@copper@Level_1 drawing@amount@10@10@1@"
      },
      { item: "copper", amount: new Decimal(10), },
      { item: "Level_1 drawing", amount: new Decimal(1), },
    ],
  },

  "Catapult": {
    name: "Catapult", description: "Catapult", tokenAmount: new Decimal(200), ingredients: [
      { item: "Chinese parasol", amount: new Decimal(5), synthesis: "@Chinese parasol@copper@pine@iron@Level_2 drawing@amount@5@5@10@10@1@" },
      { item: "copper", amount: new Decimal(5), },
      { item: "pine", amount: new Decimal(10), },
      { item: "iron", amount: new Decimal(10), },
      { item: "Level_2 drawing", amount: new Decimal(1), },
    ],
  },
  "artillery": {
    name: "artillery", description: "artillery", tokenAmount: new Decimal(300), ingredients: [
      { item: "Chinese parasol", amount: new Decimal(5), synthesis: "@Chinese parasol@copper@pine@iron@fir wood@gold@Level_3 drawing@amount@5@5@5@5@5@5@1@" },
      { item: "copper", amount: new Decimal(5), },
      { item: "pine", amount: new Decimal(5), },
      { item: "iron", amount: new Decimal(5), },
      { item: "fir wood", amount: new Decimal(5), },
      { item: "gold", amount: new Decimal(5), },
      { item: "Level_3 drawing", amount: new Decimal(1), },
    ],
  },

  "Rush Car": {
    name: "Rush Car", description: "Rush Car", tokenAmount: new Decimal(400), ingredients: [
      { item: "bartizan", amount: new Decimal(1), synthesis: "@bartizan@Catapult@artillery@titanium@Corundum@Level_5 drawing@amount@1@1@1@5@5@1@" },
      { item: "Catapult", amount: new Decimal(1), },
      { item: "artillery", amount: new Decimal(1), },
      { item: "titanium", amount: new Decimal(5), },
      { item: "Corundum", amount: new Decimal(5), },
      { item: "Level_5 drawing", amount: new Decimal(1), },
    ],
  },
  "Cyclone wheel car": {
    name: "Cyclone wheel car", description: "Cyclone wheel car", tokenAmount: new Decimal(500), ingredients: [
      { item: "bartizan", amount: new Decimal(1), synthesis: "@bartizan@Catapult@artillery@Rush Car@titanium@Corundum@Black sunken@Red gold@Level_4 drawing@amount@1@1@1@1@5@5@1@1@1@" },
      { item: "Catapult", amount: new Decimal(1), },
      { item: "artillery", amount: new Decimal(1), },
      { item: "Rush Car", amount: new Decimal(1), },
      { item: "titanium", amount: new Decimal(5), },
      { item: "Corundum", amount: new Decimal(5), },
      { item: "Black sunken", amount: new Decimal(1), },
      { item: "Red gold", amount: new Decimal(1), },
      { item: "Level_4 drawing", amount: new Decimal(1), },
    ],
  },


  /*土地合成区 */

  "Land-L2": {
    name: "Land-L2", description: "Land-L2", tokenAmount: new Decimal(2000), ingredients: [
      { item: "Land-L1", amount: new Decimal(2), },
    ],
  },
  "Land-L3": {
    name: "Land-L3", description: "Land-L3", tokenAmount: new Decimal(5000), ingredients: [
      { item: "Land-L2", amount: new Decimal(2), },
    ],
  },
  "Land-M2": {
    name: "Land-M2", description: "Land-M2", tokenAmount: new Decimal(2000), ingredients: [
      { item: "Land-M1", amount: new Decimal(2), },
    ],
  },
  "Land-M3": {
    name: "Land-M3", description: "Land-M3", tokenAmount: new Decimal(5000), ingredients: [
      { item: "Land-M2", amount: new Decimal(2), },
    ],
  },
  /*特别土地 */
  "MaxLand-L2": {
    name: "MaxLand-L2", description: "Special Land-L2", tokenAmount: new Decimal(2000), ingredients: [
      { item: "MaxLand-L1", amount: new Decimal(2), },
    ],
  },
  "MaxLand-L3": {
    name: "MaxLand-L3", description: "Special Land-L3", tokenAmount: new Decimal(5000), ingredients: [
      { item: "MaxLand-L2", amount: new Decimal(2), },
    ],
  },
  "MaxLand-M2": {
    name: "MaxLand-M2", description: "Special Land-M2", tokenAmount: new Decimal(2000), ingredients: [
      { item: "MaxLand-M1", amount: new Decimal(2), },
    ],
  },
  "MaxLand-M3": {
    name: "MaxLand-M3", description: "Special Land-M3", tokenAmount: new Decimal(5000), ingredients: [
      { item: "MaxLand-M2", amount: new Decimal(2), },
    ],
  },

  "Land-L1|M1": {
    name: "Land-L1|M1", description: "Randomly generate special land/mountains", tokenAmount: new Decimal(0), ingredients: [
      { item: "Land NFT Coupons", amount: new Decimal(1), },
    ],
  },


};



export const ExchangesGoods: Record<Exchanges, CraftableItem> = {
  "Animal NFT Coupons": {
    name: "Animal NFT Coupons",
    description: "Can be exchanged to the chain",
    tokenAmount: new Decimal(0),
    ingredients: [],
  },

};

export const BLACKSMITH_ITEMS: Record<BlacksmithItem, LimitedItem> = {
  "Sunflower Statue": {
    name: "Sunflower Statue",
    description: "A symbol of the holy token",
    section: Section["Sunflower Statue"],
    type: LimitedItemType.BlacksmithItem,
  },
  "Potato Statue": {
    name: "Potato Statue",
    description: "The OG potato hustler flex",
    section: Section["Potato Statue"],
    type: LimitedItemType.BlacksmithItem,
  },
  "Christmas Tree": {
    name: "Christmas Tree",
    description: "Receive a Santa Airdrop on Christmas day",
    section: Section["Christmas Tree"],
    type: LimitedItemType.BlacksmithItem,
  },
  Gnome: {
    name: "Gnome",
    description: "A lucky gnome",
    section: Section.Gnome,
    type: LimitedItemType.BlacksmithItem,
  },
  "Homeless Tent": {
    name: "Homeless Tent",
    description: "A nice and cozy tent",
    section: Section.Tent,
    type: LimitedItemType.BlacksmithItem,
  },
  "Sunflower Tombstone": {
    name: "Sunflower Tombstone",
    description: "In memory of Sunflower Farmers",
    section: Section["Sunflower Tombstone"],
    type: LimitedItemType.BlacksmithItem,
  },
  "Sunflower Rock": {
    name: "Sunflower Rock",
    description: "The game that broke Polygon",
    section: Section["Sunflower Rock"],
    type: LimitedItemType.BlacksmithItem,
  },
  "Goblin Crown": {
    name: "Goblin Crown",
    description: "Summon the leader of the Goblins",
    section: Section["Goblin Crown"],
    type: LimitedItemType.BlacksmithItem,
  },
  Fountain: {
    name: "Fountain",
    description: "A relaxing fountain for your farm",
    section: Section.Fountain,
    type: LimitedItemType.BlacksmithItem,
  },
  "Nyon Statue": {
    name: "Nyon Statue",
    description: "In memory of Nyon Lann",
    // TODO: Add section
    type: LimitedItemType.BlacksmithItem,
  },
  "Farmer Bath": {
    name: "Farmer Bath",
    description: "A beetroot scented bath for the farmers",
    section: Section["Bath"],
    type: LimitedItemType.BlacksmithItem,
  },
  "Woody the Beaver": {
    name: "Woody the Beaver",
    description: "Increase wood drops by 20%",
    section: Section.Beaver,
    type: LimitedItemType.BlacksmithItem,
  },
  "Apprentice Beaver": {
    name: "Apprentice Beaver",
    description: "Trees recover 50% faster",
    section: Section.Beaver,
    type: LimitedItemType.BlacksmithItem,
  },
  "Foreman Beaver": {
    name: "Foreman Beaver",
    description: "Cut trees without axes",
    section: Section.Beaver,
    type: LimitedItemType.BlacksmithItem,
  },
  "Egg Basket": {
    name: "Egg Basket",
    description: "Gives access to the Easter Egg Hunt",
    type: LimitedItemType.BlacksmithItem,
  },
};

export const MARKET_ITEMS: Record<MarketItem, LimitedItem> = {
  Nancy: {
    name: "Nancy",
    description: "Keeps a few crows away. Crops grow 15% faster",
    section: Section.Scarecrow,
    type: LimitedItemType.MarketItem,
  },
  Scarecrow: {
    name: "Scarecrow",
    description: "A goblin scarecrow. Yield 20% more crops",
    section: Section.Scarecrow,
    type: LimitedItemType.MarketItem,
  },
  Kuebiko: {
    name: "Kuebiko",
    description:
      "Even the shopkeeper is scared of this scarecrow. Seeds are free",
    section: Section.Scarecrow,
    type: LimitedItemType.MarketItem,
  },
  "Golden Cauliflower": {
    name: "Golden Cauliflower",
    description: "Double the rewards from cauliflowers",
    type: LimitedItemType.MarketItem,
  },
  "Mysterious Parsnip": {
    name: "Mysterious Parsnip",
    description: "Parsnips grow 50% faster",
    type: LimitedItemType.MarketItem,
  },
  "Carrot Sword": {
    name: "Carrot Sword",
    description: "Increase chance of a mutant crop appearing",
    type: LimitedItemType.MarketItem,
  },
};

export const BARN_ITEMS: Record<BarnItem, LimitedItem> = {
  "Chicken Coop": {
    name: "Chicken Coop",
    description: "Collect 3x the amount of eggs",
    section: Section["Chicken Coop"],
    type: LimitedItemType.BarnItem,
  },
  "Farm Cat": {
    name: "Farm Cat",
    description: "Keep the rats away",
    section: Section["Farm Cat"],
    type: LimitedItemType.BarnItem,
  },
  "Farm Dog": {
    name: "Farm Dog",
    description: "Herd sheep 4x faster",
    section: Section["Farm Dog"],
    type: LimitedItemType.BarnItem,
  },
  "Gold Egg": {
    name: "Gold Egg",
    description: "A rare egg, what lays inside?",
    type: LimitedItemType.BarnItem,
  },
  "Easter Bunny": {
    name: "Easter Bunny",
    description: "Earn 20% more Carrots",
    section: Section["Easter Bunny"],
    type: LimitedItemType.BarnItem,
  },
};

export const ANIMALS: Record<Animal, CraftableItem> = {
  Chicken: {
    name: "Chicken",
    description: "Produces eggs. Requires wheat for feeding",
    tokenAmount: new Decimal(5),
    ingredients: [],
    disabled: true,
  },
  Cow: {
    name: "Cow",
    description: "Produces milk. Requires wheat for feeding",
    tokenAmount: new Decimal(50),
    ingredients: [],
    disabled: true,
  },
  Pig: {
    name: "Pig",
    description: "Produces manure. Requires wheat for feeding",
    tokenAmount: new Decimal(20),
    ingredients: [],
    disabled: true,
  },
  Sheep: {
    name: "Sheep",
    description: "Produces wool. Requires wheat for feeding",
    tokenAmount: new Decimal(20),
    ingredients: [],
    disabled: true,
  },
};

type Craftables = Record<CraftableName, CraftableItem>;

export const CRAFTABLES: () => Craftables = () => ({
  ...TOOLS,
  ...BLACKSMITH_ITEMS,
  ...BARN_ITEMS,
  ...MARKET_ITEMS,
  ...SEEDS(),
  ...FOODS(),
  ...ANIMALS,
  ...FLAGS,
  ...SynthesisGoods,
  ...ExchangesGoods,
});

/**
 * getKeys is a ref to Object.keys, but the return is typed literally.
 */
export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;

export const LIMITED_ITEMS = {
  ...BLACKSMITH_ITEMS,
  ...BARN_ITEMS,
  ...MARKET_ITEMS,
  ...FLAGS,
};

export const LIMITED_ITEM_NAMES = getKeys(LIMITED_ITEMS);

export const makeLimitedItemsByName = (
  items: Record<LimitedItemName, LimitedItem>,
  onChainItems: OnChainLimitedItems
) => {
  return getKeys(items).reduce((limitedItems, itemName) => {
    const name = itemName as LimitedItemName;
    // Get id form limited item name
    const id = KNOWN_IDS[name];
    // Get onchain item based on id
    const onChainItem = onChainItems[id];
    
    if (onChainItem) {
      const {
        tokenAmount,
        ingredientAmounts,
        ingredientIds,
        cooldownSeconds,
        maxSupply,
        mintedAt,
        enabled,
      } = onChainItem;

      // Build ingredients
      const ingredients = ingredientIds.map((id, index) => ({
        id,
        item: KNOWN_ITEMS[id],
        amount: new Decimal(ingredientAmounts[index]),
      }));

      limitedItems[name] = {
        id: onChainItem.mintId,
        name,
        description: items[name].description,
        tokenAmount: new Decimal(tokenAmount),
        maxSupply,
        cooldownSeconds,
        ingredients,
        mintedAt,
        type: items[name].type,
        disabled: !enabled,
      };
    }

    return limitedItems;
    // TODO: FIX TYPE
  }, {} as Record<CraftableName, LimitedItem>);
};

export const filterLimitedItemsByType = (
  type: LimitedItemType | LimitedItemType[],
  limitedItems: Record<LimitedItemName, LimitedItem>
) => {
  // Convert `obj` to a key/value array
  // `[['name', 'Luke Skywalker'], ['title', 'Jedi Knight'], ...]`
  const asArray = Object.entries(limitedItems);

  const filtered = asArray.filter(([_, value]) => {
    if (value.type && isArray(type)) {
      return type.includes(value.type);
    }

    return value.type === type;
  });

  // Convert the key/value array back to an object:
  // `{ name: 'Luke Skywalker', title: 'Jedi Knight' }`
  return Object.fromEntries(filtered);
};

export const isLimitedItem = (itemName: any) => {
  return !!getKeys(LIMITED_ITEMS).find(
    (limitedItemName) => limitedItemName === itemName
  );
};
