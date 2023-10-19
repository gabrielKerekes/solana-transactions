import "./App.css";
import {
  Transaction,
  Message,
  Keypair,
  VersionedTransaction,
  VersionedMessage,
} from "@solana/web3.js";
import * as bip39 from "bip39";
import { HDKey } from "micro-ed25519-hdkey";
import * as SystemProg from "./transactions/systemProgram";
import * as StakeProg from "./transactions/stakeProgram";
import * as TokenProg from "./transactions/tokenProgram";
import * as Grouped from "./transactions/groupedInstructions";
import * as Memo from "./transactions/memoProgram";
import * as ComputeBudget from "./transactions/computeBudgetProgram";
import * as V0Transactions from "./transactions/v0Transactions";
import { ALL_MNEMONIC } from "./transactions/constants";

const mnemonic = ALL_MNEMONIC;
const path = "m/44'/501'/0'/0'";

const deriveKeyPair = (mnemonic: string, path: string) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const hd = HDKey.fromMasterSeed(seed.toString("hex"));

  return Keypair.fromSeed(hd.derive(path).privateKey);
};

const signLegacyTx = async (
  mnemonic: string,
  path: string,
  serializedTx: string
) => {
  const keyPair = deriveKeyPair(mnemonic, path);

  const tx = Transaction.populate(
    Message.from(Buffer.from(serializedTx, "hex"))
  );

  tx.sign(keyPair);

  return Buffer.from(tx.signatures[0].signature || []).toString("hex");
};

const signV0Tx = (mnemonic: string, path: string, serializedTx: string) => {
  const keyPair = deriveKeyPair(mnemonic, path);

  const v0tx = new VersionedTransaction(
    VersionedMessage.deserialize(Buffer.from(serializedTx, "hex"))
  );
  v0tx.sign([keyPair]);

  return Buffer.from(v0tx.signatures[0]).toString("hex");
};

/***** SYSTEM PROGRAM *****/

const signCreateAccount = async () => {
  const tx = SystemProg.createAccount();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signAssign = async () => {
  const tx = SystemProg.assign();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signTransfer = async () => {
  const tx = SystemProg.transfer();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signCreateAccountWithSeed = async () => {
  const tx = SystemProg.createAccountWithSeed();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signAdvanceNonceAccount = async () => {
  const tx = SystemProg.advanceNonceAccount();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signWithdrawNonceAccount = async () => {
  const tx = SystemProg.withdrawNonceAccount();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signInitializeNonceAccount = async () => {
  const tx = SystemProg.initializeNonceAccount();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signAuthorizeNonceAccount = async () => {
  const tx = SystemProg.authorizeNonceAccount();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signAllocate = async () => {
  const tx = SystemProg.allocate();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signAllocateWithSeed = async () => {
  const tx = SystemProg.allocateWithSeed();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signAssignWithSeed = async () => {
  const tx = SystemProg.assignWithSeed();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signTransferWithSeed = async () => {
  const tx = SystemProg.transferWithSeed();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

/***** STAKE PROGRAM *****/

const signInitializeAccount = async () => {
  const tx = StakeProg.initializeAccount();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signAuthorize = async () => {
  const tx = StakeProg.authorize();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signDelegate = async () => {
  const tx = StakeProg.delegate();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signSplit = async () => {
  const tx = StakeProg.split();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signWithdraw = async () => {
  const tx = StakeProg.withdraw();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signDeactivate = async () => {
  const tx = StakeProg.deactivate();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signMerge = async () => {
  const tx = StakeProg.merge();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signAuthorizeWithSeed = async () => {
  const tx = StakeProg.authorizeWithSeed();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

/***** TOKEN PROGRAM *****/

const signInitializeTokenAccount = async () => {
  const tx = TokenProg.initializeAccount();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signInitializeTokenAccount2 = async () => {
  const tx = TokenProg.initializeAccount2();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signInitializeTokenAccount3 = async () => {
  const tx = TokenProg.initializeAccount3();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signInitializeMultisig = async () => {
  const tx = TokenProg.initializeMultisig();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signInitializeImmutableOwner = async () => {
  const tx = TokenProg.initializeImmutableOwner();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signTransferChecked = async () => {
  const tx = TokenProg.transferChecked();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signTransferCheckedMultisig = async () => {
  const tx = TokenProg.transferCheckedMultisig();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signApproveChecked = async () => {
  const tx = TokenProg.approveChecked();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signApproveCheckedMultisig = async () => {
  const tx = TokenProg.approveCheckedMultisig();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signRevoke = async () => {
  const tx = TokenProg.revoke();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signRevokeMultisig = async () => {
  const tx = TokenProg.revokeMultisig();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signSetAuthority = async () => {
  const tx = TokenProg.setAuthority();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signSetAuthorityMultisig = async () => {
  const tx = TokenProg.setAuthorityMultisig();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signMintToChecked = async () => {
  const tx = TokenProg.mintToChecked();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signMintToCheckedMultisig = async () => {
  const tx = TokenProg.mintToCheckedMultisig();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signBurnChecked = async () => {
  const tx = TokenProg.burnChecked();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signBurnCheckedMultisig = async () => {
  const tx = TokenProg.burnCheckedMultisig();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signCloseAccount = async () => {
  const tx = TokenProg.closeAccount();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signCloseAccountMultisig = async () => {
  const tx = TokenProg.closeAccountMultisig();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signFreezeAccount = async () => {
  const tx = TokenProg.freezeAccount();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signFreezeAccountMultisig = async () => {
  const tx = TokenProg.freezeAccountMultisig();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signThawAccount = async () => {
  const tx = TokenProg.thawAccount();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signThawAccountMultisig = async () => {
  const tx = TokenProg.thawAccountMultisig();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signSyncNative = async () => {
  const tx = TokenProg.syncNative();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

/***** ASSOCIATED TOKEN PROGRAM *****/

const signCreateAssociatedTokenAccount = async () => {
  const tx = TokenProg.createAssociatedTokenAccount();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signCreateAssociatedTokenAccountIdempotent = async () => {
  const tx = TokenProg.createAssociatedTokenAccountIdempotent();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

/***** MEMO PROGRAM *****/

const signLegacyMemo = async () => {
  const tx = Memo.legacyMemo();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signMemo = async () => {
  const tx = Memo.memo();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

/***** COMPUTE BUDGET *****/

const signComputeBudget = async () => {
  const tx = ComputeBudget.computeBudget();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

/***** GROUPED INSTRUCTIONS *****/

const signCreateStakeAccount = async () => {
  const tx = Grouped.createStakeAccount();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

const signCreateStakeAccountAndDelegate = async () => {
  const tx = Grouped.createStakeAccountAndDelegate();
  const signature = await signLegacyTx(mnemonic, path, tx);

  return { tx, signature };
};

/***** V0 TRANSACTIONS *****/

const signV0 = async () => {
  const tx = V0Transactions.v0Transaction();
  const signature = signV0Tx(mnemonic, path, tx);

  return { tx, signature };
};

export const doMagic = async () => {
  const results = [];
  results.push({
    description: "signCreateAccount",
    ...(await signCreateAccount()),
  });
  results.push({ description: "signAssign", ...(await signAssign()) });
  results.push({ description: "signTransfer", ...(await signTransfer()) });
  results.push({
    description: "signCreateAccountWithSeed",
    ...(await signCreateAccountWithSeed()),
  });
  results.push({
    description: "signAdvanceNonceAccount",
    ...(await signAdvanceNonceAccount()),
  });
  results.push({
    description: "signWithdrawNonceAccount",
    ...(await signWithdrawNonceAccount()),
  });
  results.push({
    description: "signInitializeNonceAccount",
    ...(await signInitializeNonceAccount()),
  });
  results.push({
    description: "signAuthorizeNonceAccount",
    ...(await signAuthorizeNonceAccount()),
  });
  results.push({ description: "signAllocate", ...(await signAllocate()) });
  results.push({
    description: "signAllocateWithSeed",
    ...(await signAllocateWithSeed()),
  });
  results.push({
    description: "signAssignWithSeed",
    ...(await signAssignWithSeed()),
  });
  results.push({
    description: "signTransferWithSeed",
    ...(await signTransferWithSeed()),
  });
  results.push({
    description: "signInitializeAccount",
    ...(await signInitializeAccount()),
  });
  results.push({ description: "signAuthorize", ...(await signAuthorize()) });
  results.push({ description: "signDelegate", ...(await signDelegate()) });
  results.push({ description: "signSplit", ...(await signSplit()) });
  results.push({ description: "signWithdraw", ...(await signWithdraw()) });
  results.push({ description: "signDeactivate", ...(await signDeactivate()) });
  results.push({ description: "signMerge", ...(await signMerge()) });
  results.push({
    description: "signAuthorizeWithSeed",
    ...(await signAuthorizeWithSeed()),
  });
  results.push({
    description: "signInitializeTokenAccount",
    ...(await signInitializeTokenAccount()),
  });
  results.push({
    description: "signInitializeTokenAccount2",
    ...(await signInitializeTokenAccount2()),
  });
  results.push({
    description: "signInitializeTokenAccount3",
    ...(await signInitializeTokenAccount3()),
  });
  results.push({
    description: "signInitializeMultisig",
    ...(await signInitializeMultisig()),
  });
  results.push({
    description: "signInitializeImmutableOwner",
    ...(await signInitializeImmutableOwner()),
  });
  results.push({
    description: "signTransferChecked",
    ...(await signTransferChecked()),
  });
  results.push({
    description: "signTransferCheckedMultisig",
    ...(await signTransferCheckedMultisig()),
  });
  results.push({
    description: "signApproveChecked",
    ...(await signApproveChecked()),
  });
  results.push({
    description: "signApproveCheckedMultisig",
    ...(await signApproveCheckedMultisig()),
  });
  results.push({ description: "signRevoke", ...(await signRevoke()) });
  results.push({
    description: "signRevokeMultisig",
    ...(await signRevokeMultisig()),
  });
  results.push({
    description: "signSetAuthority",
    ...(await signSetAuthority()),
  });
  results.push({
    description: "signSetAuthorityMultisig",
    ...(await signSetAuthorityMultisig()),
  });
  results.push({
    description: "signMintToChecked",
    ...(await signMintToChecked()),
  });
  results.push({
    description: "signMintToCheckedMultisig",
    ...(await signMintToCheckedMultisig()),
  });
  results.push({
    description: "signBurnChecked",
    ...(await signBurnChecked()),
  });
  results.push({
    description: "signBurnCheckedMultisig",
    ...(await signBurnCheckedMultisig()),
  });
  results.push({
    description: "signCloseAccount",
    ...(await signCloseAccount()),
  });
  results.push({
    description: "signCloseAccountMultisig",
    ...(await signCloseAccountMultisig()),
  });
  results.push({
    description: "signFreezeAccount",
    ...(await signFreezeAccount()),
  });
  results.push({
    description: "signFreezeAccountMultisig",
    ...(await signFreezeAccountMultisig()),
  });
  results.push({
    description: "signThawAccount",
    ...(await signThawAccount()),
  });
  results.push({
    description: "signThawAccountMultisig",
    ...(await signThawAccountMultisig()),
  });
  results.push({ description: "signSyncNative", ...(await signSyncNative()) });
  results.push({
    description: "signCreateAssociatedTokenAccount",
    ...(await signCreateAssociatedTokenAccount()),
  });
  results.push({
    description: "signCreateAssociatedTokenAccountIdempotent",
    ...(await signCreateAssociatedTokenAccountIdempotent()),
  });
  results.push({ description: "signLegacyMemo", ...(await signLegacyMemo()) });
  results.push({ description: "signMemo", ...(await signMemo()) });
  results.push({
    description: "signComputeBudget",
    ...(await signComputeBudget()),
  });
  results.push({
    description: "signCreateStakeAccount",
    ...(await signCreateStakeAccount()),
  });
  results.push({
    description: "signCreateStakeAccountAndDelegate",
    ...(await signCreateStakeAccountAndDelegate()),
  });
  results.push({ description: "signV0", ...(await signV0()) });

  console.log({
    results: JSON.stringify(
      results.map((r) => {
        return {
          description: r.description,
          parameters: { tx: r.tx },
          result: {
            signature: r.signature,
          },
        };
      })
    ),
  });
};
