import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';

const productsSchema = db.sequelize.define(
    "Products",
    {
        product_id: {
            type: DataTypes.STRING(),
            unique: true,
            primaryKey: true,
        },
        job_id: {
            type: DataTypes.STRING(255),
        },
        title: {
            type: DataTypes.STRING(255),
        },
        img_url: {
            type: DataTypes.STRING(255),
        },
        brand: {
            type: DataTypes.STRING(255),
        }
    },
    {
        timestamps: true,
        indexes: [
            {
                unique: false,
                fields: ["job_id"],
            },
        ],
        hooks: {
            beforeCreate: (product) => {
                product.product_id = uuidv4();
            },
            afterCreate: async (data, options) => {
                console.log(data, "product data create");
            },
        }
    }
);

export default productsSchema;
