import {Context} from "koa";
import {getManager} from "typeorm";
import {TodoList} from "../entity/TodoList";

/* load all todos from database */
export async function todoContentUpdateAction(context: Context){
  // get a repository
  const todoRepo = getManager().getRepository(TodoList);
  // load all todos
  const {task_id, task_info} = context.request.body;

  const todo_update = await todoRepo.findOne(task_id);

  try {
    await todoRepo.update(todo_update, {task_info: task_info});
    context.body = `Update task ${task_id} successfully!`;
  } catch (error) {
    context.status = 404;
     console.log(error);
  }

}