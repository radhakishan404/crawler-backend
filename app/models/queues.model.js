import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';
import { sendSocketMsg } from "../utils/socket-io.js";
import productsSchema from "./product.model.js";

const queuesSchema = db.sequelize.define(
    "Queues",
    {
        job_id: {
            type: DataTypes.STRING(),
            unique: true,
            primaryKey: true,
        },
        job_name: {
            type: DataTypes.STRING(255),
        },
        status: {
            type: DataTypes.STRING(25),
            defaultValue: "in_progress",
            validate: {
                isIn: {
                    args: [['completed', 'in_progress', 'enqueued', 'failed']],
                    msg: 'Must be a valid status',
                },
            },
        },
        job_url: {
            type: DataTypes.TEXT(),
        },
    },
    {
        timestamps: true,
        indexes: [
            {
                unique: false,
                fields: ["job_id", "status"],
            },
        ],
        hooks: {
            beforeCreate: (queue) => {
                queue.job_id = uuidv4();
            },
            afterCreate: async (data, options) => {
                sendSocketMsg("QUEUE_CREATED", data);
            },
            afterUpdate: async (data, options) => {
                sendSocketMsg("QUEUE_UPDATED", data);
            }
        }
    }
);

queuesSchema.belongsTo(productsSchema, {
    foreignKey: "job_id",
    targetKey: "job_id",
    as: "product_data",
});

productsSchema.hasOne(queuesSchema, {
    foreignKey: "job_id",
    targetKey: "job_id",
    as: "product_data",
});


export default queuesSchema;
