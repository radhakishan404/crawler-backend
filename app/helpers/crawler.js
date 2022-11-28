import fetch from 'node-fetch';
import PgBoss from 'pg-boss';
import * as cheerio from 'cheerio';
import { NODE_ENV } from "../../env.config.js";
import { createRequire } from "module";
import { addProducts, updateQueues } from '../services/queues.services.js';

const require = createRequire(import.meta.url);
const config = require("../config/config.json")[NODE_ENV];

const boss = new PgBoss(`postgres://${config.username}:${config.password}@${config.host}/${config.database}`);

export const createQueue = async (data) => {
    try {
        console.log(`====== starting queue ${data.job_id} ======`);
        await boss.start();

        console.log(`====== generate queue id ========`);
        await boss.send(data.job_name, data);

        // update queues inqueues
        await updateQueues({ job_id: data.job_id }, { status: "enqueued" });

        console.log(`===== started working on queue `);
        await boss.work(data.job_name, crawl);

    } catch (error) {
        // update if queues failed
        await updateQueues({ job_id: data.job_id }, { status: "failed" });
        console.log(error);
    }
}


export const crawl = async (job) => {
    try {
        console.log(`===== inprogress queue `);
        // update queues inprogress
        await updateQueues({ job_id: job.data.job_id }, { status: "in_progress" });

        const response = await fetch(job.data.job_url);
        const html = await response.text();

        const $ = cheerio.load(html);

        let payload = {
            job_id: job.data.job_id
        };

        $(".e-tastic > h1 > .hRyxVn").each(function (index) {
            payload.brand = $(this).prev("a").text();
            payload.title = $(this).next("span").text();
        })

        $(".cElwZI > div").each(function (index) {
            payload.img_url = $(this).parent().find("img")[0].attribs.src;
        })

        await addProducts(payload);

        await boss.complete(job.id);

        // update queues completed
        await updateQueues({ job_id: job.data.job_id }, { status: "completed" });

    } catch (error) {
        console.log(`===== error inprogress queue `);
        // update if queues failed
        console.log(error.message);
        await updateQueues({ job_id: job.data.job_id }, { status: "failed" });
    }
}