import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { BLOCKHASH, LAST_VALID_BLOCK_HEIGHT, allAllPubKey } from "./constants";

export const legacyMemo = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    new TransactionInstruction({
      keys: [
        {
          pubkey: allAllPubKey,
          isSigner: true,
          isWritable: true,
        },
      ],
      data: Buffer.from("Hello Legacy World", "utf-8"),
      programId: new PublicKey("Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo"),
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const memo = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    new TransactionInstruction({
      keys: [
        {
          pubkey: allAllPubKey,
          isSigner: true,
          isWritable: true,
        },
      ],
      data: Buffer.from("Hello World", "utf-8"),
      programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
    })
  );

  return tx.serializeMessage().toString("hex");
};
