import express from "express";
import reqValidator from "../middlewares/req.validator.js";
import { queuesListV, queuesAddV, queuesGetV } from "../validator/queues.validator.js";
import { listQueues, addQueues, getUniqueQueues } from "../controller/queues.controller.js";

const router = express.Router();

router.get(
    "/",
    reqValidator(queuesListV),
    (req, res, next) => {
        listQueues(req, res, next);
    }
)

router.get(
    "/:job_id",
    reqValidator(queuesGetV),
    (req, res, next) => {
        getUniqueQueues(req, res, next);
    }
)

router.post(
    "/",
    reqValidator(queuesAddV),
    (req, res, next) => {
        addQueues(req, res, next);
    }
)

export default router;