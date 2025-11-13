import {
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  PublicKey,
  sendAndConfirmTransaction,
  Connection,
} from "@solana/web3.js";
import base58 from "bs58";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

export async function sendSol(to: string, amount: string) {
  try {
    if (!process.env.SOL_PRIVATE_KEY) throw new Error("Missing SOL_PRIVATE_KEY");

    const keypair = Keypair.fromSecretKey(base58.decode(process.env.SOL_PRIVATE_KEY));
    console.log("Sender:", keypair.publicKey.toBase58());
    console.log("Receiver:", to);

    const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;
    if (isNaN(lamports) || lamports <= 0) throw new Error("Invalid amount");

    const balance = await connection.getBalance(keypair.publicKey);
    if (balance < lamports) throw new Error("Insufficient SOL balance");

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: new PublicKey(to),
        lamports,
      })
    );

    const signature = await sendAndConfirmTransaction(connection, tx, [keypair]);
    console.log("✅ SOL sent! Signature:", signature);
    return { success: true, signature };
  } catch (err: any) {
    console.error("❌ Failed to send SOL:", err.message);
    return { success: false, error: err.message };
  }
}
