const express = require("express");
const cors = require('cors');

class App {
    constructor() {
        this.app = express();

        //미들웨어
        // this.setMiddleWare();        
        this.setCors();
        this.bodyParsing();

        // 라우팅
        this.getRouting();

        // // 404 error
        this.status404();

        // // 에러처리
        this.errorHandler();

    }

    // dbConnection() {
    //     // DB authentication
    //     require('./routes');
    // } 
    
    bodyParsing() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    getRouting() {
        this.app.use(require("./routes"));
    }

    status404() {
        this.app.use((req, res, _) => {
            res.status(404).json("error","404");
        });
    }

    errorHandler() {
        this.app.use((err, req, res, _) => {
            res.status(500).json("error","500");
        });
    }

    setCors() {
        this.app.use(cors({orgin: 'http://13.125.249.90 :8080'}));
    }

}

module.exports = new App().app;
