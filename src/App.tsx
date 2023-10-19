import { useState } from "react";
import "./App.css";
import {
  Transaction,
  VersionedTransaction,
  Message,
  Keypair,
  VersionedMessage,
  Connection,
  clusterApiUrl,
  sendAndConfirmTransaction,
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
import { getMinimumBalanceForRentExemptAccount } from "@solana/spl-token";
import { doMagic } from "./test";

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

  const fee = await estimateFee(tx);
  console.log({ fee });

  // await submitTx(mnemonic, path, tx);

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

const estimateFee = async (transaction: Transaction) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const recentBlockhash = await connection.getLatestBlockhash();

  const txBlockhash = transaction.recentBlockhash;
  transaction.recentBlockhash = recentBlockhash.blockhash;

  const fee = await transaction.getEstimatedFee(connection);
  const min = await getMinimumBalanceForRentExemptAccount(connection);
  console.log({ min });

  transaction.recentBlockhash = txBlockhash;

  return fee;
};

const submitTx = async (
  mnemonic: string,
  path: string,
  transaction: Transaction
) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const recentBlockhash = await connection.getLatestBlockhash();

  const txBlockhash = transaction.recentBlockhash;
  transaction.recentBlockhash = recentBlockhash.blockhash;

  const keyPair = deriveKeyPair(mnemonic, path);
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    keyPair,
  ]);
  console.log({ signature });

  transaction.recentBlockhash = txBlockhash;

  return transaction;
};

function App() {
  const [mnemonic, setMnemonic] = useState(ALL_MNEMONIC);
  const [path, setPath] = useState("m/44'/501'/0'/0'");
  const [result, setResult] = useState<any>();

  const getPublicKey = () => {
    setResult({
      publicKey: Buffer.from(
        deriveKeyPair(mnemonic, path).publicKey.toBytes()
      ).toString("hex"),
    });
  };

  const getAddress = async () => {
    setResult({ address: deriveKeyPair(mnemonic, path).publicKey.toBase58() });
  };

  /***** SYSTEM PROGRAM *****/

  const signCreateAccount = async () => {
    const tx = SystemProg.createAccount();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAssign = async () => {
    const tx = SystemProg.assign();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signTransfer = async () => {
    const tx = SystemProg.transfer();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signCreateAccountWithSeed = async () => {
    const tx = SystemProg.createAccountWithSeed();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAdvanceNonceAccount = async () => {
    const tx = SystemProg.advanceNonceAccount();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signWithdrawNonceAccount = async () => {
    const tx = SystemProg.withdrawNonceAccount();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signInitializeNonceAccount = async () => {
    const tx = SystemProg.initializeNonceAccount();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAuthorizeNonceAccount = async () => {
    const tx = SystemProg.authorizeNonceAccount();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAllocate = async () => {
    const tx = SystemProg.allocate();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAllocateWithSeed = async () => {
    const tx = SystemProg.allocateWithSeed();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAssignWithSeed = async () => {
    const tx = SystemProg.assignWithSeed();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signTransferWithSeed = async () => {
    const tx = SystemProg.transferWithSeed();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  /***** STAKE PROGRAM *****/

  const signInitializeAccount = async () => {
    const tx = StakeProg.initializeAccount();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAuthorize = async () => {
    const tx = StakeProg.authorize();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signDelegate = async () => {
    const tx = StakeProg.delegate();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signSplit = async () => {
    const tx = StakeProg.split();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signWithdraw = async () => {
    const tx = StakeProg.withdraw();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signDeactivate = async () => {
    const tx = StakeProg.deactivate();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signMerge = async () => {
    const tx = StakeProg.merge();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAuthorizeWithSeed = async () => {
    const tx = StakeProg.authorizeWithSeed();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  /***** TOKEN PROGRAM *****/

  const signInitializeTokenAccount = async () => {
    const tx = TokenProg.initializeAccount();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signInitializeTokenAccount2 = async () => {
    const tx = TokenProg.initializeAccount2();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signInitializeTokenAccount3 = async () => {
    const tx = TokenProg.initializeAccount3();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signInitializeMultisig = async () => {
    const tx = TokenProg.initializeMultisig();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signInitializeImmutableOwner = async () => {
    const tx = TokenProg.initializeImmutableOwner();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signTransferChecked = async () => {
    const tx = TokenProg.transferChecked();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signApproveChecked = async () => {
    const tx = TokenProg.approveChecked();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signRevoke = async () => {
    const tx = TokenProg.revoke();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signSetAuthority = async () => {
    const tx = TokenProg.setAuthority();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signMintToChecked = async () => {
    const tx = TokenProg.mintToChecked();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signBurnChecked = async () => {
    const tx = TokenProg.burnChecked();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signCloseAccount = async () => {
    const tx = TokenProg.closeAccount();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signFreezeAccount = async () => {
    const tx = TokenProg.freezeAccount();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signThawAccount = async () => {
    const tx = TokenProg.thawAccount();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signSyncNative = async () => {
    const tx = TokenProg.syncNative();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  /***** ASSOCIATED TOKEN PROGRAM *****/

  const signCreateAssociatedTokenAccount = async () => {
    const tx = TokenProg.createAssociatedTokenAccount();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signCreateAssociatedTokenAccountIdempotent = async () => {
    const tx = TokenProg.createAssociatedTokenAccountIdempotent();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  /***** MEMO PROGRAM *****/

  const signLegacyMemo = async () => {
    const tx = Memo.legacyMemo();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signMemo = async () => {
    const tx = Memo.memo();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  /***** COMPUTE BUDGET *****/

  const signComputeBudget = async () => {
    const tx = ComputeBudget.computeBudget();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  /***** GROUPED INSTRUCTIONS *****/

  const signCreateStakeAccount = async () => {
    const tx = Grouped.createStakeAccount();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signCreateStakeAccountAndDelegate = async () => {
    const tx = Grouped.createStakeAccountAndDelegate();
    const signature = await signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  /***** V0 TRANSACTIONS *****/

  const signV0 = async () => {
    const tx = V0Transactions.v0Transaction();
    const signature = signV0Tx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  return (
    <div className="app-container">
      <div className="path-input">
        <p>Path:</p>
        <input value={path} onChange={(e) => setPath(e.target.value)} />
      </div>

      <button onClick={getPublicKey}>Get public key</button>
      <button onClick={getAddress}>Get address</button>

      <div className="result">
        <p>Result:</p>
        <pre>{JSON.stringify(result, null, "\t")}</pre>
      </div>

      <div className="transactions">
        <div>
          <h1>System Program</h1>
          <button onClick={signCreateAccount}>Create Account</button>
          <button onClick={signAssign}>Assign</button>
          <button onClick={signTransfer}>Transfer</button>
          <button onClick={signCreateAccountWithSeed}>
            Create Account With Seed
          </button>
          <button onClick={signAdvanceNonceAccount}>
            Advance Nonce Account
          </button>
          <button onClick={signWithdrawNonceAccount}>
            Withdraw Nonce Account
          </button>
          <button onClick={signInitializeNonceAccount}>
            Initialize Nonce Account
          </button>
          <button onClick={signAuthorizeNonceAccount}>
            Authorize Nonce Account
          </button>
          <button onClick={signAllocate}>Allocate</button>
          <button onClick={signAllocateWithSeed}>Allocate With Seed</button>
          <button onClick={signAssignWithSeed}>Assign With Seed</button>
          <button onClick={signTransferWithSeed}>Transfer with Seed</button>
        </div>
        <div>
          <h1>Stake Program</h1>
          <button onClick={signInitializeAccount}>Initialize Account</button>
          <button onClick={signAuthorize}>Authorize</button>
          <button onClick={signDelegate}>Delegate</button>
          <button onClick={signSplit}>Split</button>
          <button onClick={signWithdraw}>Withdraw</button>
          <button onClick={signDeactivate}>Deactivate</button>
          <button onClick={signMerge}>Merge</button>
          <button onClick={signAuthorizeWithSeed}>Authorize With Seed</button>
        </div>
        <div>
          <h1>Token Program</h1>
          <button onClick={signInitializeTokenAccount}>
            Initialize Account
          </button>
          <button onClick={signInitializeTokenAccount2}>
            Initialize Account 2
          </button>
          <button onClick={signInitializeTokenAccount3}>
            Initialize Account 3
          </button>
          <button onClick={signInitializeMultisig}>Initialize Multisig</button>
          <button onClick={signInitializeImmutableOwner}>
            Initialize Immutable Owner
          </button>
          <button onClick={signTransferChecked}>Transfer checked</button>
          <button onClick={signApproveChecked}>Approve Checked</button>
          <button onClick={signRevoke}>Revoke</button>
          <button onClick={signSetAuthority}>Set Authority</button>
          <button onClick={signMintToChecked}>Mint To Checked</button>
          <button onClick={signBurnChecked}>Burn Checked</button>
          <button onClick={signCloseAccount}>Close Account</button>
          <button onClick={signFreezeAccount}>Freeze Account</button>
          <button onClick={signThawAccount}>Thaw Account</button>
          <button onClick={signSyncNative}>Sync Native</button>
        </div>
        <div>
          <h1>Associated Token Program</h1>
          <button onClick={signCreateAssociatedTokenAccount}>Create</button>
          <button onClick={signCreateAssociatedTokenAccountIdempotent}>
            Create Idempotent
          </button>
        </div>
        <div>
          <h1>Memo Program</h1>
          <button onClick={signLegacyMemo}>Legacy Memo</button>
          <button onClick={signMemo}>Memo</button>
        </div>
      </div>
      <div>
        <h1>Grouped Instructions</h1>
        <button onClick={signCreateStakeAccount}>Create Stake Account</button>
        <button onClick={signCreateStakeAccountAndDelegate}>
          Create Stake Acc + Deleg
        </button>
      </div>
      <div>
        <h1>Compute Budget</h1>
        <button onClick={signComputeBudget}>Compute Budget</button>
      </div>
      <div>
        <h1>V0 Transactions</h1>
        <button onClick={signV0}>V0 transaction</button>
      </div>
      <div>
        <h1>Do magic!!</h1>
        <button onClick={() => doMagic()}>Do magic</button>
      </div>
    </div>
  );
}

export default App;
