import { createCollection } from "../dist/create_collection";
import { Client } from "../dist/client";
import { CreateCollectionParams } from "../dist/types";
import { Keypair } from "@solana/web3.js";

const PRIVATE_KEY = [
  128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128,
  128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128,
  128,
];
const IS_DEVNET = true;

async function exampleCreateCollection() {
  if (!PRIVATE_KEY) throw new Error("PRIVATE_KEY is not set");

  const client = new Client(
    Keypair.fromSecretKey(Uint8Array.from(PRIVATE_KEY)),
    IS_DEVNET
  );
  console.debug("Client created with public key:", client.getPublicKey());

  await client.init();
  console.debug("Client initialized.");

  const collectionData: CreateCollectionParams = {
    name: "Mona Lisa",
    symbol: "MONALISA",
    description: `The Mona Lisa (/ˌmoʊnə ˈliːsə/ MOH-nə LEE-sə; Italian: la Gioconda [la dʒoˈkonda] or Monna Lisa [ˈmɔnna ˈliːza]; French: la Joconde [la ʒɔkɔ̃d]) is a half-length portrait painting by Italian artist Leonardo da Vinci. Considered an archetypal masterpiece of the Italian Renaissance,[4][5] it has been described as "the best known, the most visited, the most written about, the most sung about, [and] the most parodied work of art in the world."[6] The painting's novel qualities include the subject's enigmatic expression,[7] monumentality of the composition, the subtle modelling of forms, and the atmospheric illusionism.[8]`,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/270px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    tokens: [
      {
        imageUrl: "https://jpegs.fun/resources/monalisa.png",
        attributes: [{ trait_type: "Name", value: "Mona Lisa" }],
        amount: 700,
      },
      {
        imageUrl: "https://jpegs.fun/resources/dogenarisa.png",
        attributes: [{ trait_type: "Name", value: "Dogenarisa" }],
        amount: 300,
      },
    ],
    totalSupply: 1000,
    royaltiesBps: 100,
  };

  console.debug("Collection data prepared:", collectionData);

  const initialBuyAmount = 10;
  try {
    const { collectionResult, txResult } = await createCollection(
      client,
      collectionData,
      initialBuyAmount
    );
    console.log("Collection created successfully:", collectionResult);
    console.log("Transaction created successfully:", txResult);
  } catch (error) {
    console.error("Error creating collection:", error);
  }
}

exampleCreateCollection();
