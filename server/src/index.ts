import * as admin from "firebase-admin";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

import config from "./config";
import { router } from "./routers";

// Create Express app
const app = express();

// Add tRPC middleware
app.use("/trpc", createExpressMiddleware({ router }));

// Start server
const port = config.port;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
