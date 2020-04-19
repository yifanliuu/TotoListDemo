<template>
  <div class='todo-wrapper'>
    <div class='todo-box'>
      <div class='todo-bar'>
        MANAGE YOUR TODO LIST
        <Button @click="addOrUpdateTaskInfo(0)" class='create-todo'>
          +1
        </Button>
      </div>
      
      <div class='todo-main'>
        <ul class='todo-nav'>
          <li @click="changeTodoList" :class="{active: on_todo}">
            <i class='color pending' />
            Todo
          </li>
          <li @click="changeDoneList" :class="{active: !on_todo}">
            <i class='color resolved' />
            Done
          </li>
        </ul>
        <ul class='todo-list'>

          <li v-for="item in getTaskList()" :key="item.id" class="todo-item">
            <div :class="{todo_info : on_todo, done_info: !on_todo, on_deadline:(on_todo && (item.info.deadline < Date.now())) }">
              <span class="todo-name">
                {{item.info.name}}
              </span>
              <div class="todo-label-box">
                <li v-for="label in item.info.labels" :key="label" class= "todo-label">
                  <span>
                    #{{label}}
                  </span>
                </li>
              </div>
            </div>
            <div class="todo-icon-box">
              <b @click="addOrUpdateTaskInfo(item)" class="todo-icon">
                Edit
              </b>
              <b @click="changeTaskStatus(item.id)" v-if="getOnTodo()" class="todo-icon">
                Set Done
              </b>
              <b @click="changeTaskStatus(item.id)" v-else class="todo-icon">
                Set Todo
              </b>             
              <b @click="deleteTask(item.id)" class="todo-icon">
                Delete
              </b>
            </div>
          </li>
        </ul>
      </div>      
    </div>
    <AddOrUpdate
      v-if="addOrUpdateVisible"
      v-on:submitChange="addOrUpdateTaskToDatabase"
      ref="child">
    </AddOrUpdate>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch, Emit} from 'vue-property-decorator';
import AddOrUpdate from './addOrUpdate.vue';
import { url } from 'inspector';

interface Task_info {
  name: string;
  description: string;
  deadline: number;
  labels: string[];
}
interface Task_item {
  id: number;
  info: Task_info;
  status: boolean;
}

@Component({
  components: {AddOrUpdate},
})
export default class TodoList extends Vue {
  private task_list: Task_item[];
  private on_todo: boolean;
  private addOrUpdateVisible: boolean;
  private json_data: any;
  constructor() {
    super();
    this.task_list = [];
    this.on_todo = true;
    this.addOrUpdateVisible = false;
  }
  created() {
    this.updateAllTask();
  }
  public get getTodoList(): Task_item[] {
    const todo_list: Task_item[] = [];
    this.task_list.forEach((item) => {
      if (!item.status) {
        todo_list.push(item);
      }
    });
    return todo_list;
  }
  public get getDoneList(): Task_item[] {
    const done_list: Task_item[] = [];
    this.task_list.forEach((item) => {
      if (item.status) {
        done_list.push(item);
      }
    });
    return done_list;
  }

  public getTaskList(): Task_item[] {
    if (this.on_todo) {
      return this.getTodoList;
    }
    return this.getDoneList;
  }

  public getOnTodo(): boolean {
    return this.on_todo;
  }
  public changeTodoList(): void {
    this.on_todo = true;
  }
  public changeDoneList(): void {
    this.on_todo = false;
  }
  /**
   * updateAllTask
   */
  public updateAllTask():void {
    this.$axios.get('/api/todo/all')
            .then((res) => {
              this.task_list = [];
              this.json_data = res;
              this.json_data.data.forEach(data_item => {
                let info = JSON.parse(data_item.task_info);
                let item :Task_item = {
                  id : data_item.task_id,
                  info : info,
                  status : data_item.task_status,
                }
                this.task_list.push(item);
              });
            })
            .catch((err)=>{console.log(err)});  
  }
  public changeTaskStatus(id: number) {
    let index: number = this.task_list.findIndex((item: Task_item) => (item.id == id));
    this.$axios.put('/api/todo/status',{"task_id": this.task_list[index].id})
              .then((res)=>{
                if(res.status = 200){
                  this.task_list[index].status = !this.task_list[index].status;
                }
              })
              .catch((err)=>{console.log(err)});
  }
  public deleteTask(id: number) {
    this.$axios.delete(`/api/todo/${id}`)
              .then((res)=>{
                if(res.status = 200){
                  this.updateAllTask();
                }
              })
              .catch((err)=>{console.log(err)});
  }
  public addOrUpdateTaskToDatabase(item: Task_item) {
    if(item.id < 0){
      //add 
      this.json_data = JSON.stringify(item.info);
      this.$axios.post('/api/todo/create',{
        "task_info": this.json_data,
        "task_status": 0,
      }).then((res)=>{
          if(res.status = 200){
            this.updateAllTask();
          }
        })
        .catch((err)=>{console.log(err)});
    }
    else{
      // update
      this.json_data = JSON.stringify(item.info);
      this.$axios.put('/api/todo/content',{
        "task_id": item.id,
        "task_info": this.json_data,
      }).then((res)=>{
          if(res.status = 200){
            let update_index = this.task_list.findIndex((task)=>(task.id == item.id));
            this.task_list[update_index].info = item.info;
          }
        })
        .catch((err)=>{console.log(err)});
    }
    /*
      GET localhost:3000/todo/all
    */
  }
  public addOrUpdateTaskInfo(item: Task_item) {
    this.addOrUpdateVisible = true;
    this.$nextTick(() => {
      this.$refs.child.init(item);
    });
  }
}
</script>


<style lang="scss" scoped>

.todo-wrapper {
  padding: 70px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;
}
.todo-box{
  width: 60%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.todo-bar {
  height: 40px;
  display: flex;
  border-radius: 5%;
  background-color: rgb(173, 205, 238);
  justify-content: space-between;
  padding: 5px;
  font-size: large;
}

.active {
  background-color: #fff;;
}

.create-todo{
  cursor: pointer;
  font-size: larger;
  border-radius: 100%;
  border: 0px;
  width: 6%;
  display: flex;
  background-color:rgb(255, 245, 180);
}

.create-todo:hover {
  transform: scale(1.2);
}

.todo-main {
  display: flex;
  flex-direction: row;
  
}

.todo-nav {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

.todo-nav {
  li {
    cursor: pointer;
    width: 100px;
    display: flex;
    padding: 1rem;
  }
}

.todo-list {
  width: 600px;

}

.color {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  margin-right: 1rem;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.todo-item {
  display: flex;
  min-height: 3rem;
  line-height: 3rem;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.todo_info {
  display: flex;
  background-color: rgb(98, 241, 162);
  flex-direction: column;
  width: 85%;
  height: 100%;
}

.done_info {
  display: flex;
  background-color: rgb(123, 148, 146);
  flex-direction: column;
  width: 85%;
  height: 100%;
}

.on_deadline {
  display: flex;
  background-color: rgb(218, 82, 64);
  flex-direction: column;
  width: 85%;
  height: 100%;
}

.todo-label-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background: rgb(248, 253, 198);
}

.todo-label {
  display: flex;
  background-color: rgb(250, 213, 144);
  flex-direction: row;
  width: 15%;
  height: 40px;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    font-size: 1rem;
    margin-left: 10%;
  }
}


.todo-name {
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    font-size: 1.2rem;
  }
}

.todo-icon-box {
  display: flex;
  flex-direction: column;
}

.todo-icon {
  cursor: pointer;
  background-color: rgb(143, 156, 156);
}

.todo-icon+.todo-icon {
  margin-top: 0.5rem;
}

.todo-nav {
  li.active {
    border-bottom: 2px solid rgba(114, 111, 112, 0.5);
  }
}

.todo-icon:hover {
  transform: scale(1.2);
}

.pending {
  background-color: rgb(245, 147, 35);
}

.resolved {
  background-color: rgba(35, 58, 88, 0.836);
}

</style>
