import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class TodoList {

    @PrimaryGeneratedColumn()
    task_id: number;

    @Column()
    task_info: string;

    @Column()
    task_status: boolean;
}
