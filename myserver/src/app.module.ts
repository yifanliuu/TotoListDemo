import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './todolist/todolist.entity';
import { TodolistModule } from './todolist/todolist.module'

@Module({
  imports: [
    TodolistModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'todolistdemo',
      entities: [TodoList],
      synchronize: true,
    })
  ],
})
export class AppModule {}
