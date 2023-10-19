import { Transaction, SystemProgram } from "@solana/web3.js";
import {
  BLOCKHASH,
  LAST_VALID_BLOCK_HEIGHT,
  allAllPubKey,
  noncePubKey,
  randomPubKey,
  seedPubKey,
  systemProgramPubKey,
  fileObscurePubKey,
} from "./constants";

export const createAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    SystemProgram.createAccount({
      fromPubkey: allAllPubKey,
      newAccountPubkey: randomPubKey,
      lamports: 20000000,
      space: 10210220,
      programId: systemProgramPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const assign = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    SystemProgram.assign({
      accountPubkey: allAllPubKey,
      programId: systemProgramPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const transfer = (blockhash: string = BLOCKHASH) => {
  const tx = new Transaction({
    blockhash,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    SystemProgram.transfer({
      fromPubkey: allAllPubKey,
      toPubkey: fileObscurePubKey,
      lamports: 200000,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const createAccountWithSeed = (
  blockhash: string = BLOCKHASH
): string => {
  const tx = new Transaction({
    blockhash,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    SystemProgram.createAccountWithSeed({
      fromPubkey: allAllPubKey,
      newAccountPubkey: seedPubKey,
      basePubkey: allAllPubKey,
      seed: "seed:1",
      lamports: 20000000,
      space: 0,
      programId: systemProgramPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const advanceNonceAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    SystemProgram.nonceAdvance({
      noncePubkey: noncePubKey,
      authorizedPubkey: allAllPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const withdrawNonceAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    SystemProgram.nonceWithdraw({
      noncePubkey: noncePubKey,
      authorizedPubkey: allAllPubKey,
      toPubkey: allAllPubKey,
      lamports: 200000,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const initializeNonceAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    SystemProgram.nonceInitialize({
      noncePubkey: randomPubKey,
      authorizedPubkey: allAllPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const authorizeNonceAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    SystemProgram.nonceAuthorize({
      noncePubkey: randomPubKey,
      authorizedPubkey: allAllPubKey,
      newAuthorizedPubkey: fileObscurePubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const allocate = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    SystemProgram.allocate({
      accountPubkey: allAllPubKey,
      space: 200,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const allocateWithSeed = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    SystemProgram.allocate({
      accountPubkey: seedPubKey,
      basePubkey: allAllPubKey,
      seed: "seed:0",
      space: 22200,
      programId: systemProgramPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const assignWithSeed = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    SystemProgram.assign({
      accountPubkey: seedPubKey,
      basePubkey: allAllPubKey,
      seed: "seed:0",
      programId: systemProgramPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const transferWithSeed = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    SystemProgram.transfer({
      fromPubkey: allAllPubKey,
      basePubkey: allAllPubKey,
      toPubkey: seedPubKey,
      lamports: 200000,
      seed: "seed:0",
      programId: systemProgramPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};
