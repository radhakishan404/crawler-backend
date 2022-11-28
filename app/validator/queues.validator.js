import Joi from "joi";

export const queuesListV = Joi.object({
    page: Joi.string().allow(),
    perPage: Joi.string().allow(),
    sortField: Joi.string().allow(),
    sortBy: Joi.string().allow(),
    search: Joi.string().optional().allow('')
});

export const queuesGetV = Joi.object({
    job_id: Joi.string().required(),
});

export const queuesAddV = Joi.object({
    job_name: Joi.string().required(),
    job_url: Joi.string().required()
})