import express from "express";

import queuesRoutes from "./queues.route.js";

const app = express();

app.use("/queues", queuesRoutes);

export default app;