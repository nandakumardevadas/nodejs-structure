const BaseService = require('../Services/index');

class UserController extends BaseService {

    constructor() {
        super();
    }

    get create() {
        return this.user.add;
    }
}

module.exports = new UserController();