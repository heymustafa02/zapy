import { createWalletClient, createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import {
  mainnet, sepolia,
  polygon, polygonAmoy,
  arbitrum, arbitrumSepolia,
  optimism, optimismSepolia,
  base, baseSepolia,
} from "viem/chains";
import { erc20Abi } from "viem";

export const CHAINS = {
  ethereum: mainnet,
  sepolia,
  polygon,
  polygonAmoy,
  arbitrum,
  arbitrumSepolia,
  optimism,
  optimismSepolia,
  base,
  baseSepolia,
} as const;

export type SupportedChain = keyof typeof CHAINS;

// Predefined token addresses (testnets for safety)
export const TOKENS: Record<string, Record<string, `0x${string}`>> = {
  sepolia: {
    USDC: "0x6a2b...YourUSDCAddress",
    USDT: "0x9b1a...YourUSDTAddress",
  },
  polygonAmoy: {
    USDC: "0x7f5c...YourUSDCAddress",
    USDT: "0xdAC1...YourUSDTAddress",
  },
};

export async function sendEvm({
  to,
  amount,
  chainName,
  tokenAddress,
  tokenSymbol,
}: {
  to: string;
  amount: string;
  chainName: SupportedChain;
  tokenAddress?: `0x${string}` | null;
  tokenSymbol?: string | null;
}) {
  const privateKey = process.env.ETH_PRIVATE_KEY as `0x${string}`;
  if (!privateKey) throw new Error("ETH_PRIVATE_KEY not set");

  const chain = CHAINS[chainName];
  const account = privateKeyToAccount(privateKey);
  const walletClient = createWalletClient({ account, chain, transport: http() });
  const publicClient = createPublicClient({ chain, transport: http() });

  try {
    // if tokenAddress is provided -> send ERC20 token
    if (tokenAddress) {
      const decimals = 6; // USDC/USDT
      const value = BigInt(Math.floor(parseFloat(amount) * 10 ** decimals));
      console.log(`🔹 Sending ${amount} ${tokenSymbol || "Token"} on ${chain.name}`);

      const hash = await walletClient.writeContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "transfer",
        args: [to as `0x${string}`, value],
      });

      console.log("Tx hash:", hash);
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      console.log(`✅ Token Tx confirmed in block ${receipt.blockNumber}`);
      return hash;
    }

    // otherwise native transfer
    const value = BigInt(Math.floor(parseFloat(amount) * 1e18));
    console.log(`🔹 Sending ${amount} ${chain.nativeCurrency.symbol} on ${chain.name}`);

    const hash = await walletClient.sendTransaction({
      to: to as `0x${string}`,
      value,
    });

    console.log("Tx hash:", hash);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log(`✅ Native Tx confirmed in block ${receipt.blockNumber}`);
    return hash;
  } catch (err) {
    console.error("❌ Transaction failed:", err);
    throw err;
  }
}
