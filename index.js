const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
// Error Handlers
const error404Handler = require('./Middlewares/404');
const errorHandler = require('./Middlewares/errorHandler');
// Routing
const route = require('./Routes/index');

class Server {
    constructor() {
        this.app = express();
        this.server = http.Server(this.app);
        this.initConfig();
        this.initCORS();
        this.initRoutes();
        this.handleExceptions();
        this.initServer();
    }

    initConfig() {
        this.app.use(bodyParser.json());
    }

    initRoutes() {
        let expressRouter = express.Router();
        let router = route.bootstrap(this.app, expressRouter);
        this.app.use(router.init);
        this.app.use(errorHandler);
        this.app.use(error404Handler);
    }

    initCORS() {
        this.app.all('/*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
            res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
            next();
        });
    }
    
    initServer() {
        let PORT = process.env.PORT || 3000;
        let HOST = "localhost";
        this.server.listen(PORT, HOST, function(err){
            console.log('Listening on Port '+ HOST + ' '+PORT);
        });
    }

    handleExceptions() {
        process.on('uncaughtException', exception => {
            console.log(exception);
            //throw (new Error('UnCaught Exception'));
            //process.exit(1)
        });
        process.on('unhandledRejection', exception => {
            console.log(exception);
            //throw (new Error('Unhandled Rejection Exception'));
            //process.exit(1)
        })
    }

    static bootstrap() {
        return new Server();
    }
}

var server = Server.bootstrap();