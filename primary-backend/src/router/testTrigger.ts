import { Router } from "express";
import axios from "axios";
import { prismaClient } from "../db";

export const testTriggerRouter = Router();

testTriggerRouter.post("/:zapId", async (req, res) => {
  try {
    const { zapId } = req.params;

    // 1. Fetch zap to get userId
    const zap = await prismaClient.zap.findUnique({
      where: { id: zapId }
    });

    if (!zap) {
      return res.status(404).json({ error: "Zap not found" });
    }

    const userId = zap.userId;

    // 2. Construct webhook URL (from hooks service)
    const webhookUrl = `${process.env.HOOKS_URL}/hooks/catch/${userId}/${zapId}`;

    // 3. Dummy test payload
    // const testBody = {
    //   amount: 111,
    //   address: "TEST_SOLANA_ADDRESS",
    //   email: "test@example.com",
    //   ts: Date.now(),
    // };
    let testBody = req.body;

      // normalize so worker always receives "comment"
        if (!testBody.comment) {
       testBody = { comment: testBody };
        }


    // 4. POST to hooks service
    await axios.post(webhookUrl, testBody);

    return res.json({
      success: true,
      message: "Webhook triggered successfully",
      webhookUrl,
    });

  } catch (err) {
    console.error("Trigger test error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
