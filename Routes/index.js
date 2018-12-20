var path = require('path');
var controller = require('../Controllers/index');

class Router {
    constructor(app, expressRouter) {
        this.expressRouter = expressRouter;
        this.app = app;
        this.dashboardController = controller.dashboard;
        this.userController = controller.user;
        this.init = this.initRouting(app, expressRouter);
    }

    initRouting(app, expressRouter) {
        expressRouter.get('/dashboard', this.bindParams(this.dashboardController.Dashboard))
        expressRouter.post('/users', this.bindParams(this.userController.create))
        expressRouter.get("/", (req, res) => {
            res.sendFile(path.resolve('index.html'));
        });
        return expressRouter;
    }
    
    static bootstrap(app, expressRouter) {
        return new Router(app, expressRouter);
    }

    bindParams(params) {
        return params.bind(params)
    }
}

module.exports = Router;