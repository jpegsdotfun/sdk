import { Keypair, VersionedTransaction } from "@solana/web3.js";
import { Client } from "./client";
export async function signAndRequestSendTx(
  client: Client,
  signerKeypair: Keypair,
  txSerializeds: string[]
) {
  const txs = txSerializeds.map((txSerialized: string) => {
    const tx = VersionedTransaction.deserialize(
      Buffer.from(txSerialized, "base64")
    );
    return tx;
  });

  const signedTxs: VersionedTransaction[] = [];
  txs.forEach((tx) => {
    tx.sign([signerKeypair]);
    signedTxs.push(tx);
  });

  const signedTxSerializeds = signedTxs.map((signedTx, index) => {
    const txSignedClient = Buffer.from(signedTx.serialize()).toString("base64");
    return {
      txUnsigned: txSerializeds[index],
      txSignedClient,
    };
  });

  const txDocuments = await client.requestSendTx(
    client.getAccessToken(),
    signedTxSerializeds
  );
  return txDocuments;
}

export async function signAndRequestSendCreateCollectionAndInitialBuyTx(
  client: Client,
  signerKeypair: Keypair,
  txSerializeds: string[],
  mintKeypair: Keypair
) {
  const txs = txSerializeds.map((txSerialized: string) =>
    VersionedTransaction.deserialize(Buffer.from(txSerialized, "base64"))
  );

  txs[0].sign([mintKeypair]);
  const signedTxs: VersionedTransaction[] = [];
  txs.forEach((tx) => {
    tx.sign([signerKeypair]);
    signedTxs.push(tx);
  });

  const signedTxSerializeds = signedTxs.map((signedTx, index) => {
    const txSignedClient = Buffer.from(signedTx.serialize()).toString("base64");
    return {
      txUnsigned: txSerializeds[index],
      txSignedClient,
    };
  });

  const txDocuments = await client.requestSendTx(
    client.getAccessToken(),
    signedTxSerializeds
  );
  return txDocuments;
}
