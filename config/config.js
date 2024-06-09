require("dotenv").config();
const { HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const config = {
  db: {
    host: HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectTimeout: 60000,
  },
};

module.exports = config;
