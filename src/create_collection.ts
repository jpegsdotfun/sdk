import { Keypair, PublicKey } from "@solana/web3.js";
import { Client } from "./client";
import {
  Attributes,
  CreateCollectionParams,
  TokenImage,
  UploadCollectionParams,
} from "./types";
import { signAndRequestSendCreateCollectionAndInitialBuyTx } from "./transaction";
import { getImageTypeFromUrl, isImageSizeUnder5MB } from "./utils";

export async function createCollection(
  client: Client,
  collection: CreateCollectionParams,
  initialBuyAmount: number = 0,
  collectionKeypair: Keypair = Keypair.generate()
) {
  const collectionResult = await uploadCollection(
    client,
    collection,
    collectionKeypair.publicKey
  );

  if (!collectionResult) throw new Error("Failed to create collection");

  const tx = await client.requestCreateCollectionAndInitialBuyTx(
    client.getAccessToken(),
    collectionKeypair.publicKey.toBase58(),
    false,
    initialBuyAmount
  );

  const txResult = await signAndRequestSendCreateCollectionAndInitialBuyTx(
    client,
    client.getKeypair(),
    tx,
    collectionKeypair
  );

  return { collectionResult, txResult };
}

async function uploadCollection(
  client: Client,
  collection: CreateCollectionParams,
  collectionAddress: PublicKey
) {
  // Validate image files
  if (!(await isImageSizeUnder5MB(collection.imageUrl))) {
    throw new Error("Image size is too large");
  }

  const imageType = getImageTypeFromUrl(collection.imageUrl);
  if (!imageType) {
    throw new Error("Invalid image type");
  }

  let totalTokenAmount = 0;
  for (const token of collection.tokens) {
    const tokenImageType = getImageTypeFromUrl(token.imageUrl);
    if (!tokenImageType) {
      throw new Error("Invalid token image type");
    }

    if (!(await isImageSizeUnder5MB(token.imageUrl))) {
      throw new Error("Token image size is too large");
    }

    totalTokenAmount += token.amount;
  }

  // Validate token amount
  if (totalTokenAmount !== collection.totalSupply) {
    throw new Error("Total token amount does not match the collection supply");
  }

  let newCollection = null;
  try {
    const [bondingCurve] = PublicKey.findProgramAddressSync(
      [Buffer.from("bonding_curve"), collectionAddress.toBuffer()],
      new PublicKey(client.getProgramId())
    );

    const attributeRarities = (type: string, value: string) => {
      let count = 0;
      collection.tokens.forEach((token) => {
        if (
          token.attributes.find((trait) => trait.trait_type === type)?.value ===
          value
        ) {
          count += token.amount;
        }
      });

      return Number((count / collection.totalSupply).toFixed(4));
    };

    const tokenTraits = collection.tokens.map((image: TokenImage) =>
      image.attributes.map((trait: Attributes) => ({
        trait_type: trait.trait_type,
        value: trait.value,
        rarity: attributeRarities(trait.trait_type, trait.value),
      }))
    );

    const tokenMintingAmounts = collection.tokens.map(
      (image: TokenImage) => image.amount
    );

    const tokenRarities = collection.tokens.map(
      (image: TokenImage, index: number) => {
        if (image.attributes.length === 0)
          return image.amount / collection.totalSupply;

        const totalRarity = tokenTraits[index].reduce(
          (sum, trait) => sum + trait.rarity,
          0
        );
        return totalRarity / image.attributes.length;
      }
    );

    let tokens = collection.tokens.map((image: TokenImage, index: number) => ({
      imageUrl: image.imageUrl,
      imageType: getImageTypeFromUrl(image.imageUrl),
      attributes: tokenTraits[index],
      totalAmount: tokenMintingAmounts[index],
      rarity: tokenRarities[index],
    }));

    const collectionData: UploadCollectionParams = {
      name: collection.name,
      symbol: collection.symbol,
      description: collection.description,
      telegramLink: collection.telegramLink,
      twitterLink: collection.twitterLink,
      tiktokLink: collection.tiktokLink,
      discordLink: collection.discordLink,
      websiteLink: collection.websiteLink,
      imageUrl: collection.imageUrl,
      imageType: getImageTypeFromUrl(collection.imageUrl),
      tokens,
      address: collectionAddress.toBase58(),
      bondingCurve: bondingCurve.toBase58(),
      totalSupply: collection.totalSupply,
      creator: client.getPublicKey(),
      royaltiesBps: collection.royaltiesBps,
      tokenMode: "manual",
      topic: collection.topic || "",
    };

    newCollection = await client.requestUploadCollection(
      client.getAccessToken(),
      collectionData
    );
    if (!newCollection || !newCollection.data)
      throw new Error("Failed to create collection");
  } catch (error: any) {
    const errorMessage = error.toString();
    console.error("Error uploading collection data:", errorMessage);

    throw "Error uploading collection data:" + error;
  }

  return newCollection.data;
}
