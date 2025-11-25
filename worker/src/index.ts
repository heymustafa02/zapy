require("dotenv").config();

import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { Kafka } from "kafkajs";
import { parse } from "./parser";
import { sendEmail } from "./email";
import { sendSol } from "../../solanad";
import { sendEvm, CHAINS, TOKENS, SupportedChain } from "./eth";
import { sendTelegram } from "./telegram";

const prismaClient = new PrismaClient();
const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor-2",
  brokers: ["localhost:9092"],
});

async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker-2" });
  await consumer.connect();
  const producer = kafka.producer();
  await producer.connect();

  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });

      if (!message.value?.toString()) return;

      const parsedValue = JSON.parse(message.value.toString());
      const zapRunId = parsedValue.zapRunId;
      const stage = parsedValue.stage;

      const zapRunDetails = await prismaClient.zapRun.findFirst({
        where: { id: zapRunId },
        include: {
          zap: {
            include: {
              actions: {
                include: {
                  type: true,
                },
              },
            },
          },
        },
      });

      const currentAction = zapRunDetails?.zap.actions.find(
        (x) => x.sortingOrder === stage
      );

      if (!currentAction) {
        console.log("Current action not found?");
        return;
      }
      const meta =currentAction.metadata as JsonObject;
      const zapRunMetadata = zapRunDetails?.metadata;

      // 📧 Email action
      if (currentAction.type.id === "email") {
        // const body = parse(
        //   (currentAction.metadata as JsonObject)?.body as string,
        //   zapRunMetadata
        // );
        // const to = parse(
        //   (currentAction.metadata as JsonObject)?.email as string,
        //   zapRunMetadata
        // );
        const body = parse(
      typeof meta?.body === "string" ? meta.body : "",
      zapRunMetadata
      );
        const to = parse(
      typeof meta?.email === "string" ? meta.email : "",
      zapRunMetadata
      );
        console.log(`Sending out email to ${to}, body: ${body}`);
        await sendEmail(to, body);
      }
      //Telegram action
      // if (currentAction.type.id === "send-telegram") {
      //   await sendTelegram(action.metadata);
      // }

      // 💸 Solana action
      if (currentAction.type.id === "send-sol") {
        // const amount = parse(
        //   (currentAction.metadata as JsonObject)?.amount as string,
        //   zapRunMetadata
        // );
        // const address = parse(
        //   (currentAction.metadata as JsonObject)?.address as string,
        //   zapRunMetadata
        // );
        const amount = parse(
    typeof meta?.amount === "string" ? meta.amount : "",
    zapRunMetadata
  );

  const address = parse(
    typeof meta?.address === "string" ? meta.address : "",
    zapRunMetadata
  );
        console.log(`Sending ${amount} SOL to ${address}`);
        await sendSol(address, amount);
      }

      // ⚡️ EVM-based chain (ETH, Polygon, etc.)
      if (currentAction.type.id === "send-eth") {
        const amount = parse(
          (currentAction.metadata as JsonObject)?.amount as string,
          zapRunMetadata
        );
        const address = parse(
          (currentAction.metadata as JsonObject)?.address as string,
          zapRunMetadata
        );
        const chain = parse(
          (currentAction.metadata as JsonObject)?.chain as string,
          zapRunMetadata
        );
        const token = parse(
          (currentAction.metadata as JsonObject)?.token as string,
          zapRunMetadata
        ); // e.g., "native", "USDC", "USDT"

        console.log(
          `Preparing to send ${amount} ${
            token || "native"
          } on ${chain} → ${address}`
        );

        const tokenAddress =
          token && token !== "native" ? TOKENS[chain]?.[token] || null : null;

        await sendEvm({
          to: address,
          amount,
          chainName: chain as SupportedChain,
          tokenAddress,
          tokenSymbol: token,
        });
      }

      // 🕓 small delay before next
      await new Promise((r) => setTimeout(r, 500));

      // 🔁 Push next stage if not done
      const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1;
      if (lastStage !== stage) {
        console.log("pushing back to the queue");
        await producer.send({
          topic: TOPIC_NAME,
          messages: [
            {
              value: JSON.stringify({
                stage: stage + 1,
                zapRunId,
              }),
            },
          ],
        });
      }

      console.log("processing done ✅");

      // ✅ Commit offset
      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
    },
  });
}

main();
