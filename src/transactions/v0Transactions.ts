import {
  AddressLookupTableAccount,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  BLOCKHASH,
  allAllPubKey,
  fileObscurePubKey,
  randomPubKey,
} from "./constants";

export const v0Transaction = () => {
  const instructions = [
    SystemProgram.transfer({
      fromPubkey: allAllPubKey,
      toPubkey: fileObscurePubKey,
      lamports: 20000000,
    }),
    SystemProgram.transfer({
      fromPubkey: allAllPubKey,
      toPubkey: new PublicKey("9wFA8FYZwvBbhE22uvYBZniTXi1KJiN8iNQsegkTWZqS"),
      lamports: 30000000,
    }),
    SystemProgram.transfer({
      fromPubkey: allAllPubKey,
      toPubkey: new PublicKey("GDDMwNyyx8uB6zrqwBFHjLLG3TBYk2F8Az4yrQC5RzMp"),
      lamports: 40000000,
    }),
  ];

  const lookupTableAccount = new AddressLookupTableAccount({
    key: randomPubKey,
    state: {
      deactivationSlot: BigInt(0),
      lastExtendedSlot: 0,
      lastExtendedSlotStartIndex: 0,
      addresses: [
        fileObscurePubKey,
        new PublicKey("9wFA8FYZwvBbhE22uvYBZniTXi1KJiN8iNQsegkTWZqS"),
      ],
    },
  });

  const anotherLookupTableAccount = new AddressLookupTableAccount({
    key: new PublicKey("H8JEG2wjU2LnjXJUVkivEokcK1pmtHXTyoGeDaBtazCy"),
    state: {
      deactivationSlot: BigInt(10),
      lastExtendedSlot: 10,
      lastExtendedSlotStartIndex: 10,
      addresses: [
        new PublicKey("GDDMwNyyx8uB6zrqwBFHjLLG3TBYk2F8Az4yrQC5RzMp"),
      ],
    },
  });

  const v0Message = new TransactionMessage({
    recentBlockhash: BLOCKHASH,
    payerKey: allAllPubKey,
    instructions,
  }).compileToV0Message([lookupTableAccount, anotherLookupTableAccount]);

  const v0tx = new VersionedTransaction(v0Message);

  const serializedTx = Buffer.from(v0tx.message.serialize()).toString("hex");

  return serializedTx;
};
