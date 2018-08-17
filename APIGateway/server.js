/*
* Real time private chatting app using Angular 2, Nodejs, mongodb and Socket.io
* @author Shashank Tiwari
*/

'use strict';

const express = require("express");
const http = require('http');

const routes = require('./routes'); 

class Server{

    constructor(){
        this.app = express();
        this.http = http.Server(this.app);
    }

    appConfig(){ }

    /* Including app Routes starts*/
    includeRoutes(){
        new routes(this.app).routesConfig();
    }
    /* Including app Routes ends*/  

    appExecute(){
        this.appConfig();
        this.includeRoutes();

        const port =  process.env.PORT || 8000;
        const host = process.env.HOST || `localhost`;      

        this.http.listen(port, host, () => {
            console.log(`Listening on http://${host}:${port}`);
        });
    }

}
    
const app = new Server();
app.appExecute();