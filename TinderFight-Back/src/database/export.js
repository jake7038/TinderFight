const knex = require("knex");
require("dotenv").config({quiet: true});

const knexConfig = require("../../knexfile.js");

const database = knex(knexConfig);

module.exports = database;