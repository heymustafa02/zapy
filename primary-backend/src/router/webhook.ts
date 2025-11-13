import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * Endpoint to receive webhook POST events
 * Example body: { amount: 100, address: "0x123", email: "test@example.com" }
 */
router.post("/:zapId", async (req, res) => {
  try {
    const { zapId } = req.params;
    const metadata = req.body;

    // 1️⃣ Find zap
    const zap = await prisma.zap.findUnique({
      where: { id: zapId },
      include: { actions: true },
    });

    if (!zap) return res.status(404).json({ error: "Zap not found" });

    // 2️⃣ Create a ZapRun entry (to record the trigger)
    const zapRun = await prisma.zapRun.create({
      data: {
        zapId,
        metadata,
      },
    });

    console.log("Webhook received for Zap:", zapId, "Metadata:", metadata);

    // 3️⃣ Publish to Kafka (if needed, for async processing)
    // — We'll integrate this later
    // sendKafkaMessage("zap-events", { zapId, metadata });

    return res.status(200).json({ success: true, zapRun });
  } catch (err) {
    console.error("Webhook Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
