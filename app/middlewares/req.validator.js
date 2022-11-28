import { responseSend } from "../helpers/responseSend.js";

const options = {
    errors: {
        wrap: {
            label: "",
        },
    },
};

const reqValidator = (validator) => {
    return async function (req, res, next) {
        try {
            if (req.method === "GET" || req.method === "DELETE") {
                await validator.validateAsync({ ...req.query, ...req.params }, options);
                next();
            } else if (["POST", "PUT", "PATCH"].includes(req.method)) {
                const validated = await validator.validateAsync(req.body, options);
                req.body = validated;
                next();
            }
        } catch (err) {
            //* Pass err to next
            responseSend(res, 417, err.message, null);
        }
    };
};

export default reqValidator;
