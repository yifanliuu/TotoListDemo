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
          <ul v-for="item in getTaskList()" :key="item.id" class="todo-item">
            <div :class="{todo_info : on_todo && !(item.info.deadline < Date.now()), done_info: !on_todo, on_deadline:(on_todo && (item.info.deadline < Date.now())) }">
              <span class="todo-name">
                {{item.info.name}}
              </span>
              <div class="todo-label-box">
                <ul v-for="label in item.info.labels" :key="label" class= "todo-label">
                  <span>
                    #{{label}}
                  </span>
                </ul>
              </div>
            </div>
            <div class="todo-icon-box">
              <b @click="addOrUpdateTaskInfo(item)" class="todo-icon">
                Edit
              </b>
              <b @click="changeTaskStatus(item.id)" v-if="on_todo" class="todo-icon">
                Set Done
              </b>
              <b @click="changeTaskStatus(item.id)" v-else class="todo-icon">
                Set Todo
              </b>             
              <b @click="deleteTask(item.id)" class="todo-icon">
                Delete
              </b>
            </div>
          </ul>
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
import AddOrUpdate from '../components/addOrUpdate.vue';

interface TaskInfo {
  name: string;
  description: string;
  deadline: number;
  labels: string[];
}
interface TaskItem {
  id: string;
  info: TaskInfo;
  status: boolean;
}

@Component({
  components: {
    AddOrUpdate
  },
  async asyncData({$axios}:any) {
    const data = await $axios.$get('/todo/all').catch((err:any) => {console.log(err);});
    let task_list: TaskItem[] = [];
    data.forEach((data_item:any) => {
      const task_info = JSON.parse(data_item.task_info);
      const item: TaskItem = {
        id : data_item.task_id,
        info: task_info,
        status : data_item.task_status,
      };
      task_list.push(item);
    });
    return {task_list};
  }
})

export default class TodoList extends Vue {
  private on_todo: boolean;
  private addOrUpdateVisible: boolean;
  private task_list: TaskItem[];
  constructor() {
    super();
    this.task_list = [];
    this.on_todo = true;
    this.addOrUpdateVisible = false;
  }
    public get getTodoList(): TaskItem[] {
    const todo_list: TaskItem[] = [];
    this.task_list.forEach((item) => {
      if (!item.status) {
        todo_list.push(item);
      }
    });
    return todo_list;
  }
  public get getDoneList(): TaskItem[] {
    const done_list: TaskItem[] = [];
    this.task_list.forEach((item) => {
      if (item.status) {
        done_list.push(item);
      }
    }); 
    return done_list;
  }

  public getTaskList(): TaskItem[] {
    if (this.on_todo) {
      return this.getTodoList;
    }
    return this.getDoneList;
  }

  public changeTodoList(): void {
    this.on_todo = true;
  }
  public changeDoneList(): void {
    this.on_todo = false;
  }
  public async changeTaskStatus(id: string) {
    const index: number = this.task_list.findIndex((item: TaskItem) => (item.id == id));
    await this.$axios.put('/todo/status', {task_id: this.task_list[index].id}).catch((err:any) => {console.log(err); });
    this.task_list[index].status = !this.task_list[index].status;
              
  }
  public async deleteTask(id: string) {
    let a = await this.$axios.delete(`/todo/${id}`).catch((err:any) => {console.log(err); });
    const update_index = this.task_list.findIndex((task) => (task.id == id));
    this.task_list.splice(update_index, 1);
  }
  private GenerateId() :string{
    return Number(Math.random().toString().substr(2)).toString(32);
  }
  public async addOrUpdateTaskToDatabase(item: TaskItem) {
    if (item.id == '') {
      // add
      item.id = this.GenerateId();
      const json_data = JSON.stringify(item.info);
      await this.$axios.post('/todo/create', {
        task_id: item.id,
        task_info: json_data,
        task_status: 0,
      }).catch((err:any) => {console.log(err); });
      this.task_list.push(item);
    } else {
      // update
      const json_data = JSON.stringify(item.info);
      await this.$axios.put('/todo/content', {
        task_id: item.id,
        task_info: json_data,
      }).catch((err:any) => {console.log(err); });
      const update_index = this.task_list.findIndex((task) => (task.id == item.id));
      this.task_list[update_index].info = item.info;
    }
    /*
      GET localhost:3000/todo/all
    */
  }
  public addOrUpdateTaskInfo(item: TaskItem) {
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
