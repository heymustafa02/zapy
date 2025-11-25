import {Account, Aptos, AptosConfig, Network, Ed25519PrivateKey} from "@aptos-labs/ts-sdk";

export const APTOS_NETWORKS = {
  mainnet: Network.MAINNET,
  testnet: Network.TESTNET,
  devnet: Network.DEVNET,
} as const;

export type SupportedAptosNetwork = keyof typeof APTOS_NETWORKS;

// -----------------------------
// TOKENS (module-style types)
// -----------------------------
export const APTOS_TOKENS: Record<
  SupportedAptosNetwork,
  Record<string, string>
> = {
  testnet: {
    USDC: "0x...::usdc::USDC",
    USDT: "0x...::usdt::USDT",
  },
  mainnet: {},
  devnet: {},
};

// -----------------------------
// SEND FUNCTION
// -----------------------------
export async function sendAptos({
  to,
  amount,
  network,
  tokenAddress,
  tokenSymbol,
}: {
  to: string;
  amount: string;
  network: SupportedAptosNetwork;
  tokenAddress?: string | null;
  tokenSymbol?: string | null;
}) {
  const rawPk = process.env.APTOS_PRIVATE_KEY;
  if (!rawPk) throw new Error("APTOS_PRIVATE_KEY not set");

  // Private key must be plain hex (no 0x)
  const pkHex = rawPk.startsWith("0x") ? rawPk.slice(2) : rawPk;

  // Correct key type for ts-sdk
  const privateKey = new Ed25519PrivateKey(pkHex);

  const config = new AptosConfig({ network: APTOS_NETWORKS[network] });
  const aptos = new Aptos(config);

  // Workaround: ts-sdk typing bug → cast to Account
  const account = Account.fromPrivateKey({ privateKey }) as Account;

  try {
    // ---------------------------------------
    // NATIVE APT TRANSFER
    // ---------------------------------------
    if (!tokenAddress) {
      console.log(`🔹 Sending ${amount} APT on ${network}`);

      const tx = await aptos.transaction.build.simple({
        sender: account.accountAddress,
        data: {
          function: "0x1::aptos_account::transfer",
          functionArguments: [
            to,
            BigInt(Math.floor(parseFloat(amount) * 1e8)), // 1 APT = 1e8 octas
          ],
        },
      });

      const senderAuthenticator = aptos.transaction.sign({
        signer: account,
        transaction: tx,
      });

      const pending = await aptos.transaction.submit.simple({
        transaction: tx,
        senderAuthenticator,
      });

      await aptos.waitForTransaction({ transactionHash: pending.hash });

      console.log(`✅ APT Tx confirmed: ${pending.hash}`);
      return pending.hash;
    }

    // ---------------------------------------
    // TOKEN TRANSFER (coin::transfer)
    // ---------------------------------------
    console.log(`🔹 Sending ${amount} ${tokenSymbol || "Token"} on ${network}`);

    const tx = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: {
        function: "0x1::coin::transfer",
        typeArguments: [tokenAddress], // e.g. "0x...::usdc::USDC"
        functionArguments: [
          to,
          BigInt(Math.floor(parseFloat(amount) * 1e6)), // typical 6-decimals
        ],
      },
    });

    const senderAuthenticator = aptos.transaction.sign({
      signer: account,
      transaction: tx,
    });

    const pending = await aptos.transaction.submit.simple({
      transaction: tx,
      senderAuthenticator,
    });

    await aptos.waitForTransaction({ transactionHash: pending.hash });

    console.log(`✅ Token Tx confirmed: ${pending.hash}`);
    return pending.hash;
  } catch (err) {
    console.error("❌ Aptos Transaction failed:", err);
    throw err;
  }
}
