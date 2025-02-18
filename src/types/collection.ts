export interface CreateCollectionParams {
  name: string;
  symbol: string;
  description: string;
  topic?: string;
  telegramLink?: string;
  tiktokLink?: string;
  discordLink?: string;
  twitterLink?: string;
  websiteLink?: string;
  imageUrl: string;
  tokens: TokenImage[];
  totalSupply: CollectionTotalSupply;
  royaltiesBps: 0 | 100;
}

export interface UploadCollectionParams {
  name: string;
  symbol: string;
  description: string;
  topic?: string;
  telegramLink?: string;
  tiktokLink?: string;
  discordLink?: string;
  twitterLink?: string;
  websiteLink?: string;
  imageUrl: string;
  imageType: string;
  tokens: {
    imageUrl: string;
    imageType?: string;
    totalAmount: number;
    attributes: Attributes[];
    rarity: number;
  }[];
  address: string;
  bondingCurve: string;
  totalSupply: CollectionTotalSupply;
  creator: string;
  tokenMode: "manual";
  royaltiesBps: 0 | 100;
}

export type Attributes = {
  trait_type: string;
  value: string;
  rarity?: number;
};

export type CollectionTotalSupply = 1000 | 2000 | 3000 | 4000 | 5000 | 6000;

export interface TokenImage {
  imageUrl: string;
  imageType?: string;
  amount: number;
  attributes: Attributes[];
}
