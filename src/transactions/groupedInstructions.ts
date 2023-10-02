import { StakeProgram, SystemProgram, Transaction } from "@solana/web3.js";
import {
  BLOCKHASH,
  LAST_VALID_BLOCK_HEIGHT,
  allAllPubKey,
  allAllStakePubKey,
  randomPubKey,
  stakeProgramPubKey,
  systemProgramPubKey,
  fileObscurePubKey,
} from "./constants";

export const createStakeAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    SystemProgram.createAccount({
      fromPubkey: allAllPubKey,
      newAccountPubkey: allAllStakePubKey,
      lamports: 20000000,
      space: 1000,
      programId: stakeProgramPubKey,
    }),
    StakeProgram.initialize({
      stakePubkey: allAllStakePubKey,
      authorized: {
        staker: allAllPubKey,
        withdrawer: allAllPubKey,
      },
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const createStakeAccountAndDelegate = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allAllPubKey,
  }).add(
    SystemProgram.createAccount({
      fromPubkey: allAllPubKey,
      newAccountPubkey: randomPubKey,
      lamports: 20000000,
      space: 1000,
      programId: systemProgramPubKey,
    }),
    StakeProgram.initialize({
      stakePubkey: allAllStakePubKey,
      authorized: {
        staker: fileObscurePubKey,
        withdrawer: allAllPubKey,
      },
    }),
    StakeProgram.delegate({
      stakePubkey: allAllStakePubKey,
      authorizedPubkey: allAllPubKey,
      votePubkey: fileObscurePubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};
