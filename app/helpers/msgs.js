"use strict";

const message = {
    200: {
        message: "Success",
        httpCode: 200,
        status: true,
    },
    201: {
        message: "Data Added Successfully.",
        httpCode: 201,
        status: true,
    },
    400: {
        message: "Failure",
        httpCode: 400,
        status: false,
    },
    403: {
        message: "User Not Authorized",
        httpCode: 403,
        status: false,
    },
    406: {
        message: "Global Default error",
        httpCode: 406,
        status: false,
    },
    409: {
        message: "Conflict",
        httpCode: 409,
        status: false,
    },
    417: {
        message: "Joi Validation Error",
        httpCode: 417,
        status: false,
    },
    455: {
        message: "Error: No code was passed in helper.",
        httpCode: 455,
        status: false,
    },
    480: {
        message: "Database Error",
        httpCode: 480,
        status: false,
    },
};

export default message;
