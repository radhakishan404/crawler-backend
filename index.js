"use strict";

import "./app/config/db.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";


// Internal Dependencies
import { responseSend } from "./app/helpers/responseSend.js";
import allRoutes from "./app/routes/index.js";
import { socketConnectionConfig } from "./app/utils/socket-io.js";

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/", allRoutes);

app.use((error, req, res, next) => {
    if (!error) {
        return next();
    }
    responseSend(res, 406, error.message);
});

// Server Connection
const server = app.listen(port, () => {
    console.log("== Server running on Port ==", port);
});

// socket connection for live data transfer
socketConnectionConfig(server);