# Example - Create a collection

```ts
const client = new Client(KEYPAIR, IS_DEVNET);
await client.init();

const collectionData: CreateCollectionParams = {
  name: "Mona Lisa",
  symbol: "MONALISA",
  description: `The Mona Lisa (/ˌmoʊnə ˈliːsə/ MOH-nə LEE-sə; Italian: la Gioconda [la dʒoˈkonda] or Monna Lisa [ˈmɔnna ˈliːza]; French: la Joconde [la ʒɔkɔ̃d]) is a half-length portrait painting by Italian artist Leonardo da Vinci...`,
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

const initialBuyAmount = 10;

const { collectionResult, txResult } = await createCollection(
  client,
  collectionData,
  initialBuyAmount
);
```
