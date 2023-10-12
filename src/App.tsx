import { useState } from "react";
import "./App.css";
import {
  Transaction,
  VersionedTransaction,
  Message,
  Keypair,
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

const deriveKeyPair = (mnemonic: string, path: string) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const hd = HDKey.fromMasterSeed(seed.toString("hex"));

  return Keypair.fromSeed(hd.derive(path).privateKey);
};

const signLegacyTx = (mnemonic: string, path: string, serializedTx: string) => {
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

  const signCreateAccount = () => {
    const tx = SystemProg.createAccount();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAssign = () => {
    const tx = SystemProg.assign();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signTransfer = () => {
    const tx = SystemProg.transfer();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signCreateAccountWithSeed = () => {
    const tx = SystemProg.createAccountWithSeed();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAdvanceNonceAccount = () => {
    const tx = SystemProg.advanceNonceAccount();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signWithdrawNonceAccount = () => {
    const tx = SystemProg.withdrawNonceAccount();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signInitializeNonceAccount = () => {
    const tx = SystemProg.initializeNonceAccount();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAuthorizeNonceAccount = () => {
    const tx = SystemProg.authorizeNonceAccount();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAllocate = () => {
    const tx = SystemProg.allocate();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAllocateWithSeed = () => {
    const tx = SystemProg.allocateWithSeed();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAssignWithSeed = () => {
    const tx = SystemProg.assignWithSeed();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signTransferWithSeed = () => {
    const tx = SystemProg.transferWithSeed();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  /***** STAKE PROGRAM *****/

  const signInitializeAccount = () => {
    const tx = StakeProg.initializeAccount();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAuthorize = () => {
    const tx = StakeProg.authorize();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signDelegate = () => {
    const tx = StakeProg.delegate();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signSplit = () => {
    const tx = StakeProg.split();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signWithdraw = () => {
    const tx = StakeProg.withdraw();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signDeactivate = () => {
    const tx = StakeProg.deactivate();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signMerge = () => {
    const tx = StakeProg.merge();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signAuthorizeWithSeed = () => {
    const tx = StakeProg.authorizeWithSeed();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  /***** TOKEN PROGRAM *****/

  const signInitializeTokenAccount = () => {
    const tx = TokenProg.initializeAccount();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signInitializeTokenAccount2 = () => {
    const tx = TokenProg.initializeAccount2();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signInitializeTokenAccount3 = () => {
    const tx = TokenProg.initializeAccount3();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signInitializeMultisig = () => {
    const tx = TokenProg.initializeMultisig();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signInitializeImmutableOwner = () => {
    const tx = TokenProg.initializeImmutableOwner();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signTransferChecked = () => {
    const tx = TokenProg.transferChecked();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signApproveChecked = () => {
    const tx = TokenProg.approveChecked();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signRevoke = () => {
    const tx = TokenProg.revoke();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signSetAuthority = () => {
    const tx = TokenProg.setAuthority();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signMintToChecked = () => {
    const tx = TokenProg.mintToChecked();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signBurnChecked = () => {
    const tx = TokenProg.burnChecked();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signCloseAccount = () => {
    const tx = TokenProg.closeAccount();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signFreezeAccount = () => {
    const tx = TokenProg.freezeAccount();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signThawAccount = () => {
    const tx = TokenProg.thawAccount();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signSyncNative = () => {
    const tx = TokenProg.syncNative();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  /***** ASSOCIATED TOKEN PROGRAM *****/

  const signCreateAssociatedTokenAccount = () => {
    const tx = TokenProg.createAssociatedTokenAccount();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signCreateAssociatedTokenAccountIdempotent = () => {
    const tx = TokenProg.createAssociatedTokenAccountIdempotent();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  /***** MEMO PROGRAM *****/

  const signLegacyMemo = () => {
    const tx = Memo.legacyMemo();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signMemo = () => {
    const tx = Memo.memo();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  /***** COMPUTE BUDGET *****/

  const signComputeBudget = () => {
    const tx = ComputeBudget.computeBudget();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  /***** GROUPED INSTRUCTIONS *****/

  const signCreateStakeAccount = () => {
    const tx = Grouped.createStakeAccount();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  const signCreateStakeAccountAndDelegate = () => {
    const tx = Grouped.createStakeAccountAndDelegate();
    const signature = signLegacyTx(mnemonic, path, tx);

    setResult({ tx, signature });
  };

  /***** V0 TRANSACTIONS *****/

  const signV0 = () => {
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
    </div>
  );
}

export default App;
