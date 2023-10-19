import { StakeProgram, Transaction } from "@solana/web3.js";
import {
  BLOCKHASH,
  LAST_VALID_BLOCK_HEIGHT,
  allAllPubKey,
  allAllStakePubKey,
  randomPubKey,
  systemProgramPubKey,
  fileObscurePubKey,
} from "./constants";

export const initializeAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    StakeProgram.initialize({
      stakePubkey: allAllStakePubKey,
      authorized: {
        staker: allAllPubKey,
        withdrawer: allAllPubKey,
      },
      lockup: {
        unixTimestamp: 20,
        epoch: 330,
        custodian: allAllPubKey,
      },
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const authorize = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    StakeProgram.authorize({
      stakePubkey: allAllStakePubKey,
      authorizedPubkey: allAllPubKey,
      newAuthorizedPubkey: fileObscurePubKey,
      stakeAuthorizationType: { index: 0 },
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const delegate = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    StakeProgram.delegate({
      stakePubkey: allAllPubKey,
      authorizedPubkey: allAllPubKey,
      votePubkey: fileObscurePubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const split = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    StakeProgram.split({
      stakePubkey: allAllPubKey,
      authorizedPubkey: allAllPubKey,
      splitStakePubkey: fileObscurePubKey,
      lamports: 1000000,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const withdraw = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    StakeProgram.withdraw({
      stakePubkey: allAllStakePubKey,
      authorizedPubkey: allAllPubKey,
      toPubkey: allAllPubKey,
      lamports: 1000000,
      custodianPubkey: allAllPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const deactivate = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    StakeProgram.deactivate({
      stakePubkey: allAllStakePubKey,
      authorizedPubkey: allAllPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const merge = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    StakeProgram.merge({
      stakePubkey: allAllStakePubKey,
      sourceStakePubKey: randomPubKey,
      authorizedPubkey: allAllPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const authorizeWithSeed = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    StakeProgram.authorizeWithSeed({
      stakePubkey: allAllStakePubKey,
      authorityBase: allAllPubKey,
      authoritySeed: "stake:0",
      authorityOwner: systemProgramPubKey,
      newAuthorizedPubkey: fileObscurePubKey,
      stakeAuthorizationType: { index: 1 },
    })
  );

  return tx.serializeMessage().toString("hex");
};

// IntializeChecked, AuthorizeChecked, AuthorizeCheckedWithSeed
// and SetLockupChecked not implemented
