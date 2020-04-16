import {Context} from "koa";
import {getManager} from "typeorm";
import {TodoList} from "../entity/TodoList";

/* load one todo from database */
export async function todoDeleteByIdAction(context: Context){
  // get a repository
  const todoRepo = getManager().getRepository(TodoList);
  // load one todo by id
  await todoRepo.delete((context as any).params.id);
  // return one todo;
  context.body = `delete task ${(context as any).params.id} successfully!`;
}