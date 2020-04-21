<template>
  <el-dialog title="Manage Your Task" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="Task Name" label-width="120px">
        <el-input v-model="form.name" placeholder="Task Name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Task Description" label-width="120px">
        <el-input v-model="form.description" placeholder="Task Description" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Deadline" label-width="120px">
        <el-date-picker
          v-model="form.deadline"
          align="right"
          type="date"
          placeholder="deadline">
        </el-date-picker>
      </el-form-item>
      <el-form-item v-for="(label, index) in form.labels" :key="index" label="Label" label-width="120px">
        <div class="label-box" >
          <el-input :placeholder="label" v-model="form.labels[index]" autocomplete="on">
          </el-input>
          <el-button type="primary" @click="deleteLabel(index)">Delete</el-button>
        </div>
      </el-form-item>
      <el-button type="primary" @click="addOneLabel">Add label</el-button>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">Cancel</el-button>
      <el-button type="primary" @click="confirmChange">Confirm</el-button>
    </div>
  </el-dialog>
</template>


<script lang="ts">
import {Component, Prop, Vue, Watch, Emit} from 'vue-property-decorator';

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

@Component
export default class AddOrUpdate extends Vue {
  private item: TaskItem;
  private dialogFormVisible: boolean;
  private pickerOptions1: boolean;

  constructor() {
    super();
    this.dialogFormVisible = false;
    this.item = {
      id: '',
      info: {
        name: '',
        description: '',
        deadline: Date.now(),
        labels: [''],
      },
      status: false,
    };
  }
  public get form() {
    return this.item.info;
  }
  public init(item: TaskItem): void {
    if (item.id) {
      this.item = item;
    } else {
      this.item = {
        id: '',
        info: {
          name: '',
          description: '',
          deadline: Date.now(),
          labels: [''],
        },
        status: false,
      };
    }
    this.dialogFormVisible = true;
  }
  /**
   * addOneLabel
   */
  public addOneLabel(): void {
    this.item.info.labels.push('');
  }
  /**
   * deleteLabel
   */
  public deleteLabel(index: number): void {
      this.item.info.labels.splice(index, 1);
  }
  /**
   * confirmChange
   */
  public confirmChange(): void {
    this.dialogFormVisible = false;
    this.$emit('submitChange', this.item);
  }
} 
</script>

<style lang="scss">
.label-box {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
</style>
