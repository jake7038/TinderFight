const knex = require("knex");
require("dotenv").config({ quiet: true });

const knexConfig = require("../../knexfile.js");

const env = process.env.NODE_ENV || "development";
const database = knex(knexConfig[env]);

module.exports = database;