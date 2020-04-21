import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class TodoList {

    @PrimaryColumn({
        default: 0
    })
    task_id: string;

    @Column()
    task_info: string;

    @Column()
    task_status: boolean;
}
