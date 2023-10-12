import {
  Keypair,
  Connection,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  ComputeBudgetProgram,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  BLOCKHASH,
  LAST_VALID_BLOCK_HEIGHT,
  allAllPubKey,
  fileObscurePubKey,
} from "./constants";

export const computeBudget = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  })
    .add(
      ComputeBudgetProgram.requestHeapFrame({
        bytes: 2048,
      })
    )
    .add(
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 200000,
      })
    )
    .add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 8000,
      })
    )
    .add(
      SystemProgram.transfer({
        fromPubkey: allAllPubKey,
        toPubkey: fileObscurePubKey,
        lamports: 20000000,
      })
    );

  return tx.serializeMessage().toString("hex");
};

export const requestHeapFrame = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  })
    .add(
      ComputeBudgetProgram.requestHeapFrame({
        bytes: 2048,
      })
    )
    .add(
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 200000,
      })
    )
    .add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 8000,
      })
    )
    .add(
      SystemProgram.transfer({
        fromPubkey: allAllPubKey,
        toPubkey: fileObscurePubKey,
        lamports: 20000000,
      })
    );

  return tx.serializeMessage().toString("hex");
};
