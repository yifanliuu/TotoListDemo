import "reflect-metadata";
import {createConnection} from "typeorm";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import TodoListRouter from "./routes/TodoListRouter";

createConnection().then(async connection => {

    // create koa app
    const server = new Koa();

    // run app
    server.use(bodyParser());
    server.use(TodoListRouter.routes());
    server.use(TodoListRouter.allowedMethods());

    server.listen(3000, () =>{
        console.log("Api is listening on port 3000.");
    });

    
}).catch(error => console.log(error));
