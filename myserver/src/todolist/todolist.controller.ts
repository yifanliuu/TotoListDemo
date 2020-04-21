import { Controller, Get, Param, Put, Delete, Post, Body } from '@nestjs/common';
import { TodoListService } from './todolist.service';
import { ChangeContent, CreateTask, ChangeStatus } from './todolist.interface'
import { CreateDateColumn } from 'typeorm';

@Controller('todo')
export class TodoListController {
  constructor(private readonly TodoListService: TodoListService) {}

  @Get('all')
  getAllTasks(){
    return this.TodoListService.getAllTasks();
  }

  @Post('create')
  createOneTask(@Body() content: CreateTask){
    return this.TodoListService.createOneTask(content);
  }

  @Put('status')
  ChangeTaskStatus(@Body() content: ChangeStatus) {
    return this.TodoListService.changeTaskStatus(content.task_id);
  }

  @Put('content')
  ChangeTaskInfo(@Body() content: ChangeContent) {
    return this.TodoListService.changeTaskInfo(content);
  }

  @Delete(':id')
  DeleteOneTask(@Param("id") id: string){
    return this.TodoListService.deleteOneTask(id);
  }
}
