export enum TxType {
  CREATE_COLLECTION = "create-collection",
  BUY = "buy",
  MINT = "mint",
  SELL = "sell",
  BUY_TENSOR = "buy-tensor",
  SELL_TENSOR = "sell-tensor",
  BURN_DISCIPLES = "burn-disciples",
}

export enum TxStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  FAILED = "failed",
}

export interface TradeAsset {
  assetId?: string;
  tokenIndex: number;
}

export type TxDocument = {
  type: TxType;
  status: TxStatus;
  userAddress: string;
  txUnsigned: string;
  txSignedClient?: string;
  txSubmitted?: string;
  createdAt: Date;
  submittedAt?: Date;
  signature?: string;
  data:
    | TxDataCreateCollection
    | TxDataBuy
    | TxDataSell
    | TxDataBuyTensor
    | TxDataSellTensor
  error?: string;
};


export type TxDataCreateCollectionRequest = {
  collectionAddress: string;
  mintMode: boolean;
  tokenAmount: number;
};

export type TxDataCreateCollection = {
  collectionAddress: string;
  mintMode: boolean;
  tokenAmount: number;
  assetIds?: string[]; // result of create collection
};

export type TxDataBuyRequest = {
  collectionAddress: string;
  mintMode: boolean;
  tokenAmount: number;
  maxPrice: number;
};

export type TxDataBuy = {
  collectionAddress: string;
  mintMode: boolean;
  tokenAmount: number;
  maxPrice: number;
  assetIds: string[]; // result of buy
};

export type TxDataSell = {
  collectionAddress: string;
  assets: TradeAsset[];
  minPrice: number;
};

export type TxDataBuyTensorRequest = {
  collectionAddress: string;
  tokenAmount: number;
  maxPrice: number;
};

export type TxDataBuyTensor = {
  collectionAddress: string;
  tokenAmount: number;
  maxPrice: number;
  assetIds: string[]; // result of buy
};

export type TxDataSellTensor = {
  collectionAddress: string;
  assetIds: string[];
  minPrice: number;
};
