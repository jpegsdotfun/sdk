import { Keypair } from "@solana/web3.js";
import * as nacl from "tweetnacl";
import {
  NftBondingCurve,
  TxDocument,
  UploadCollectionParams,
  User,
} from "./types";

export class Client {
  private accessToken: string = "";
  private publicKey: string;
  private keypair: Keypair;
  private hostUrl: string;
  private programId: string;
  constructor(keypair: Keypair, isDevnet: boolean = false) {
    this.keypair = keypair;
    this.publicKey = this.keypair.publicKey.toString();
    this.hostUrl = isDevnet ? "https://devnet.jpegs.fun" : "https://jpegs.fun";
    this.programId = isDevnet
      ? "ccuxyAbTNFGwJ7xEFuFG5nW3drizuVaZ9sX4vmwDN21"
      : "JPEGsCrzrEwi4UiWwqBakBYK1XkGmN5AeUBCrmrJK6b";
  }

  getPublicKey() {
    return this.publicKey;
  }

  getKeypair() {
    return this.keypair;
  }

  getAccessToken() {
    return this.accessToken;
  }

  getProgramId() {
    return this.programId;
  }

  async init() {
    if (this.accessToken) {
      return this.accessToken;
    }

    const { data, code, message } = await this.requestCodeForLogin(
      this.publicKey
    );

    if (!data) {
      console.error("Failed to get login code:", message);
      throw message;
    }

    const encodedMessage = new TextEncoder().encode(data);
    const signedMessage = nacl.sign(encodedMessage, this.keypair.secretKey);
    const signature = Buffer.from(signedMessage.slice(0, 64)).toString(
      "base64"
    );
    const { data: user } = await this.requestSignIn(this.publicKey, signature);

    this.accessToken = user.accessToken;
    return this.accessToken;
  }

  async requestCodeForLogin(address: string) {
    const res = await fetch(`${this.hostUrl}/api/login?address=${address}`, {
      method: "GET",
    });
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return res.json();
  }

  async requestSignIn(address: string, signature: string) {
    const res = await fetch(`${this.hostUrl}/api/login`, {
      method: "POST",
      body: JSON.stringify({ address, signature }),
    });
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return res.json();
  }

  async requestUploadCollection(
    accessToken: string,
    collectionData: UploadCollectionParams
  ): Promise<{ data: NftBondingCurve; message?: string }> {
    const res = await fetch(`${this.hostUrl}/api/collections`, {
      method: "POST",
      body: JSON.stringify(collectionData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
    });
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return res.json();
  }

  async requestCreateCollectionAndInitialBuyTx(
    accessToken: string,
    collectionAddress: string,
    mintMode: boolean,
    tokenAmount: number
  ): Promise<string[]> {
    const res = await fetch(`${this.hostUrl}/api/tx/create-collection`, {
      method: "POST",
      body: JSON.stringify({ collectionAddress, mintMode, tokenAmount }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
    });

    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    const result = await res.json();
    if (!result.data) {
      throw new Error(result.message);
    }
    return result.data;
  }

  async requestSendTx(
    accessToken: string,
    txs: {
      txUnsigned: string;
      txSignedClient: string;
    }[]
  ): Promise<TxDocument[]> {
    const res = await fetch(`${this.hostUrl}/api/tx`, {
      method: "POST",
      body: JSON.stringify({ txs }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
    });
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    const result = await res.json();
    if (!result.data) {
      throw new Error(result.message);
    }
    return result.data;
  }
}
