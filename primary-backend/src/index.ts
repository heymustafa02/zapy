      import express from "express";
      import { userRouter } from "./router/user";
      import { zapRouter } from "./router/zap";
      import cors from "cors";
      import { triggerRouter } from "./router/trigger";
      import { actionRouter } from "./router/action";
      import webhookRouter from "./router/webhook"; // ✅ add this line
import { testTriggerRouter } from "./router/testTrigger";



      const app = express();
      app.use(express.json());
      app.use(cors())

      app.use("/api/v1/user", userRouter);

      app.use("/api/v1/zap", zapRouter);

      app.use("/api/v1/trigger", triggerRouter);

      app.use("/api/v1/action", actionRouter);
app.use("/api/v1/test-trigger", testTriggerRouter);
    app.use("/webhook", webhookRouter);

      app.listen(3000);