const knex = require('knex');
const knexFile = require('../knexfile');

const enviornment = process.env.DB_ENV || 'development';

module.exports = knex(knexFile[enviornment]);