import {Context} from "koa";
import {getManager} from "typeorm";
import {TodoList} from "../entity/TodoList";

/* load all todos from database */
export async function todoStatusUpdateAction(context: Context){
  // get a repository
  const todoRepo = getManager().getRepository(TodoList);
  // load all todos
  const {task_id} = context.request.body;
  //TODO:
  const todo_update = await todoRepo.findOne(task_id);
  const status = todo_update.task_status;
  try {
    await todoRepo.update(todo_update, {task_status: !status});
    context.body = `Update task ${task_id} successfully!`;
  } catch (error) {
    context.status = 404;
     console.log(error);
  }
}