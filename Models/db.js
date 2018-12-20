const path = require('path');
const CONFIG = require(path.resolve('./config/env.json'))[process.env.NODE_ENV || 'development'];

class DB {
    constructor() {
        this.Sequelize = require('sequelize');
        this.database = new this.Sequelize(
                            `${CONFIG.MYSQL_DB}`, `${CONFIG.MYSQL_USER}`, `${CONFIG.MYSQL_PWD}`, 
                            {
                                host: `${CONFIG.MYSQL_HOST}`,
                                dialect: 'mysql',
                                pool: {
                                    max: 5,
                                    min: 0,
                                    acquire: 30000,
                                    idle: 10000
                                },
                                operatorsAliases: false,
                                define: {
                                    timestamps: true
                                }
                            }
                        );
    }
}

module.exports = DB;
