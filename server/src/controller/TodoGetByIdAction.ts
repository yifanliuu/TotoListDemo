import {Context} from "koa";
import {getManager} from "typeorm";
import {TodoList} from "../entity/TodoList";

/* load one todo from database */
export async function todoGetByIdAction(context: Context){
  // get a repository
  const todoRepo = getManager().getRepository(TodoList);
  // load one todo by id
  const todo = await todoRepo.findOne((context as any).params.id);

  if(!todo){
    context.status = 404;
    return;
  }
  // return one todo;
  context.body = todo;
}