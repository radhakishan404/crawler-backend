import constants from "../config/constants.js";
import { crawl, createQueue } from "../helpers/crawler.js";
import { responseSend } from "../helpers/responseSend.js";
import { addNewQueues, readQueues, readSingleQueues } from "../services/queues.services.js";

const select_queues_details = ["job_id", "job_name", "status", "job_url", "createdAt"];

const listQueues = async (req, res, next) => {
    try {
        const queuesData = await readQueues({}, select_queues_details);

        responseSend(res, 201, "Queues Data Fetched Successfully", queuesData.result, queuesData.count || "0");
    } catch (error) {
        next(error);
    }
}

const getUniqueQueues = async (req, res, next) => {
    try {
        const { job_id } = req.params;

        const queuesData = await readSingleQueues({ job_id: job_id }, select_queues_details);
        if (!queuesData) throw new Error("No data found");

        responseSend(res, 201, "Queues Data Fetched Successfully", queuesData);
    } catch (error) {
        next(error);
    }
}


const addQueues = async (req, res, next) => {
    try {
        let payload = {
            ...req.body,
            status: constants.STATUS.in_progress
        }
        const addData = await addNewQueues(payload);
        if (!addData) throw new Error("Failed to add Notes.");

        createQueue(addData);

        responseSend(res, 200, "Crawler job added", addData);
    } catch (error) {
        next(error);
    }
}

export {
    listQueues,
    addQueues,
    getUniqueQueues,
}