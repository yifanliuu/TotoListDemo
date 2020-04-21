import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListService } from './todolist.service';
import { TodoListController } from './todolist.controller';
import { TodoList } from './todolist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList])],
  providers: [TodoListService],
  controllers: [TodoListController],
})
export class TodolistModule {}