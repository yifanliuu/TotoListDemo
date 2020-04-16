import {todoGetAllAction} from "../controller/TodoGetAllAction";
import {todoGetByIdAction} from "../controller/TodoGetByIdAction";
import {todoSaveAction} from "../controller/TodoSaveAction";
import {todoStatusUpdateAction} from "../controller/TodoStatusUpdateAction";
import {todoDeleteByIdAction} from "../controller/TodoDeleteByIdAction";
import {todoContentUpdateAction} from "../controller/TodoContentUpdateAction";
import * as Router from "koa-router";


const TodoListRouter = new Router();

TodoListRouter["get"]("/todo/all", todoGetAllAction);
TodoListRouter["get"]("/todo/:id", todoGetByIdAction);
TodoListRouter["delete"]("/todo/:id", todoDeleteByIdAction);
TodoListRouter["post"]("/todo/create", todoSaveAction);
TodoListRouter["put"]("/todo/status",todoStatusUpdateAction);
TodoListRouter["put"]("/todo/content", todoContentUpdateAction);

export default TodoListRouter