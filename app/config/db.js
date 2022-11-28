import Sequelize from "sequelize";
import { NODE_ENV } from "../../env.config.js";

import { createRequire } from "module";

const require = createRequire(import.meta.url);
const config = require("./config.json")[NODE_ENV];
const db = {};

let sequelize;

sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: true,
});

sequelize.sync().then(
    function () {
        console.log("== DB connection sucessful. ==");
    },
    function (err) {
        // catch error here
        console.log("SequelizeError: ", err.message);
    }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
