const DB = require('../Models/db');
const user = require('./user');

class BaseService extends DB {
    constructor() {
        super();
        this.user = user.bootstrap(this.database, this.Sequelize);
    }

    static bootstrap() {
        return new BaseService();
    }
}

module.exports = BaseService;