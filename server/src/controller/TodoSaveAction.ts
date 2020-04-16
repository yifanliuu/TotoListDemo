import {Context} from "koa";
import {getManager} from "typeorm";
import {TodoList} from "../entity/TodoList";

/* save one todo to database */
export async function todoSaveAction(context: Context){
  // get a repository
  const todoRepo = getManager().getRepository(TodoList);
  
  // create a new todo
  const new_todo = todoRepo.create(context.request.body);
  console.log(new_todo);

  try {
    await todoRepo.save(new_todo);
    context.body = new_todo;
  } catch (error) {
    context.status = 404;
    console.log(error);
  }

}