require('dotenv').config();
const fs = require("fs");

const readFileSync = filename => fs.readFileSync(filename).toString("utf8");

const environment = process.env.NODE_ENV || 'development';

const suffix = {
  dev: '-dev',
  development: '-dev',
  test: '-test',
};

const options = {
  host: process.env.MYSQLHOST || 'localhost',
  port: process.env.MYSQLPORT || '3306',
  database: 
    `${process.env.MYSQLDATABASE || 'blogs-api'}${suffix[environment] || suffix.test}`,
  username: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD 
    ? readFileSync(process.env.MYSQLPASSWORD)
    : null,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: process.env.DEBUG !== 'false',
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: 'mysql'
  }
};