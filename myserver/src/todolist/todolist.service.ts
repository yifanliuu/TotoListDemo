import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { TodoList } from './todolist.entity'
import { CreateTask, ChangeContent} from './todolist.interface'

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList)
    private readonly TodoListRepository: Repository<TodoList>,
  ){}

  async getAllTasks(): Promise<any> {
    return await this.TodoListRepository.find();
  }

  async createOneTask(content: CreateTask): Promise<any> {
    return await this.TodoListRepository.insert(content);
  }

  async changeTaskStatus(id: string): Promise<any> {
    const todo_update = await this.TodoListRepository.findOne(id);
    return await this.TodoListRepository.update(todo_update, {task_status: !todo_update.task_status});
  }

  async changeTaskInfo(content: ChangeContent): Promise<any> {
    const todo_update = await this.TodoListRepository.findOne(content.task_id);
    return await this.TodoListRepository.update(todo_update, {task_info: content.task_info});
  }

  async deleteOneTask(id: string): Promise<any> {
    return await this.TodoListRepository.delete(id);
  }
}
