const dotenv = require('dotenv');
const Sequelize = require('sequelize');
const ClientModel = require('../models/ClientModel');
const DiscountModel = require('../models/DiscountModel');
const VWClientModel = require('../models/VWClientModel');

dotenv.config();

const connection = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME || 'ShopsRUs',
    dialect: 'mysql',
    port: 3306,
    ssl: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    retry: {
        max: 10
    },
    dialectOptions: {
        ssl: {
            encrypt: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

const Client = ClientModel(connection, Sequelize);
const Discount = DiscountModel(connection, Sequelize);
const VWClient = VWClientModel(connection, Sequelize);

module.exports = {
    connection,
    Client,
    Discount,
    VWClient
};