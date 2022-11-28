import productsSchema from "../models/product.model.js";
import queuesSchema from "../models/queues.model.js";

export const readQueues = async (where, select) => {
    try {
        const result = await queuesSchema.findAll({
            // raw: true,
            where: where,
            attributes: select,
            order: [["createdAt", "desc"]],
            include: [
                {
                    model: productsSchema,
                    as: "product_data"
                }
            ]
        });

        const count = await queuesSchema.count({
            where: where,
        });

        return { result, count };
    } catch (error) {
        throw new Error(error);
    }
};

export const readSingleQueues = async (where, select) => {
    try {
        const result = await queuesSchema.findOne({
            raw: true,
            where: where,
            attributes: select,
        });

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const addNewQueues = async (data) => {
    try {
        const result = await queuesSchema.create(data);
        return result.get({ plain: true });
    } catch (error) {
        throw new Error(error);
    }
};

export const updateQueues = async (filter, updateData, select) => {
    try {
        const result = await queuesSchema.update(updateData, {
            where: filter,
            returning: select ? select : [],
            raw: true,
            individualHooks: true
        });
        if (!result[0]) throw new Error("Failed to update the Data.");
        return result[1][0];
    } catch (error) {
        throw new Error(error);
    }
}

export const addProducts = async (data) => {
    try {
        const result = await productsSchema.create(data);
        return result.get({ plain: true });
    } catch (error) {
        throw new Error(error);
    }
}