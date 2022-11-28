import message from "./msgs.js";

export const responseSend = (res, code, msg, data, count) => {
    try {
        const result = {};
        const n_code = code ? code : 455;
        const m = message[n_code];

        result.success = m ? m.status : n_code;
        result.message = msg ? msg : m.message;
        result.data = data;
        if (count) result.count = count;
        res.status(m ? m.httpCode : 280).send(result);
    } catch (error) {
        res.status(406).send({
            success: false,
            message: "Failure while encrypting data: " + error.message,
        });
    }
};
