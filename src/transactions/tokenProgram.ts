import { PublicKey, Transaction } from "@solana/web3.js";
import {
  AuthorityType,
  TOKEN_PROGRAM_ID,
  createApproveCheckedInstruction,
  createAssociatedTokenAccountIdempotentInstruction,
  createAssociatedTokenAccountInstruction,
  createBurnCheckedInstruction,
  createCloseAccountInstruction,
  createFreezeAccountInstruction,
  createInitializeAccount2Instruction,
  createInitializeAccount3Instruction,
  createInitializeAccountInstruction,
  createInitializeImmutableOwnerInstruction,
  createInitializeMultisigInstruction,
  createMintToCheckedInstruction,
  createRevokeInstruction,
  createSetAuthorityInstruction,
  createSyncNativeInstruction,
  createThawAccountInstruction,
  createTransferCheckedInstruction,
} from "@solana/spl-token";
import {
  BLOCKHASH,
  LAST_VALID_BLOCK_HEIGHT,
  allAllPubKey,
  mintPubKey,
  randomPubKey,
  tokenPubKey,
  fileObscurePubKey,
} from "./constants";

export const initializeAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    createInitializeAccountInstruction(tokenPubKey, mintPubKey, allAllPubKey)
  );

  return tx.serializeMessage().toString("hex");
};

export const initializeAccount2 = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    createInitializeAccount2Instruction(tokenPubKey, mintPubKey, allAllPubKey)
  );

  return tx.serializeMessage().toString("hex");
};

export const initializeAccount3 = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    createInitializeAccount3Instruction(tokenPubKey, mintPubKey, allAllPubKey)
  );

  return tx.serializeMessage().toString("hex");
};

export const initializeMultisig = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    createInitializeMultisigInstruction(
      tokenPubKey,
      [allAllPubKey, fileObscurePubKey],
      2
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const initializeImmutableOwner = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    createInitializeImmutableOwnerInstruction(tokenPubKey, TOKEN_PROGRAM_ID)
  );

  return tx.serializeMessage().toString("hex");
};

export const transferChecked = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    createTransferCheckedInstruction(
      tokenPubKey,
      mintPubKey,
      fileObscurePubKey,
      randomPubKey,
      200,
      1,
      [
        allAllPubKey,
        randomPubKey,
        new PublicKey("6kkV8JtbvN41c9VXNKRSzMmS8JJ5n2wC7fZicYB7xqJx"),
      ]
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const approveChecked = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    createApproveCheckedInstruction(
      tokenPubKey,
      mintPubKey,
      fileObscurePubKey,
      allAllPubKey,
      200,
      1,
      [allAllPubKey, randomPubKey]
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const revoke = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(createRevokeInstruction(tokenPubKey, allAllPubKey));

  return tx.serializeMessage().toString("hex");
};

export const setAuthority = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    createSetAuthorityInstruction(
      tokenPubKey,
      allAllPubKey,
      AuthorityType.MintTokens,
      allAllPubKey,
      [allAllPubKey, randomPubKey]
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const mintToChecked = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    createMintToCheckedInstruction(
      mintPubKey,
      fileObscurePubKey,
      allAllPubKey,
      200,
      2
      //   [ledgerPubKey, randomPubKey]
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const burnChecked = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    createBurnCheckedInstruction(
      tokenPubKey,
      mintPubKey,
      allAllPubKey,
      200,
      2,
      [allAllPubKey, randomPubKey]
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const closeAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    createCloseAccountInstruction(
      tokenPubKey,
      fileObscurePubKey,
      allAllPubKey,
      [allAllPubKey, randomPubKey]
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const freezeAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(createFreezeAccountInstruction(tokenPubKey, mintPubKey, allAllPubKey));

  return tx.serializeMessage().toString("hex");
};

export const thawAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    createThawAccountInstruction(tokenPubKey, mintPubKey, allAllPubKey, [
      allAllPubKey,
      randomPubKey,
    ])
  );

  return tx.serializeMessage().toString("hex");
};

export const syncNative = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(createSyncNativeInstruction(tokenPubKey));

  return tx.serializeMessage().toString("hex");
};

export const createAssociatedTokenAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    createAssociatedTokenAccountInstruction(
      allAllPubKey,
      tokenPubKey,
      allAllPubKey,
      mintPubKey
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const createAssociatedTokenAccountIdempotent = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    createAssociatedTokenAccountIdempotentInstruction(
      allAllPubKey,
      tokenPubKey,
      allAllPubKey,
      mintPubKey
    )
  );

  return tx.serializeMessage().toString("hex");
};
