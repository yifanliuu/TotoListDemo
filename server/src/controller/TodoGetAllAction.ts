import {Context} from "koa";
import {getManager} from "typeorm";
import {TodoList} from "../entity/TodoList";

/* load all todos from database */
export async function todoGetAllAction(context: Context){
  // get a repository
  const todoRepo = getManager().getRepository(TodoList);
  // load all todos
  const todos = await todoRepo.find();
  // return all todos
  if(!todos){
    context.status = 404;
    return;
  }
  context.body = todos;
}