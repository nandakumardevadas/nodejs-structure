const UserTable = require("../models/tbl_users");
const UserTransformer = require('../Transformers/user');

class UserService {

    constructor(db, Sequelize) {
        this.db = db;
        this.Sequelize = Sequelize;
        this.UserModel = UserTable(this.db, this.Sequelize);
        this.UserTransformer = UserTransformer;
    }

    get add() {
        let self = this;
        let returnMethod = async (req, res, next) => {
            try {
                let requestBody = req.body;
                let user = await self.addUser(requestBody);
                if(user) {
                    res.send({
                        code: 1000,
                        message: 'User Created Succesfully'
                    });
                };
            } catch(error) {
                throw error;
            }
        }
        return returnMethod;
    }

    async addUser(data) {
        try {
            return await this.UserModel.create(data);
        } catch(error) {
            throw error;
        }
    }

    static bootstrap(db, Sequelize) {
        return new UserService(db, Sequelize);
    }
}

module.exports = UserService;