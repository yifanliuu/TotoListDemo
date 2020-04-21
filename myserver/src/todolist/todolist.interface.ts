export interface CreateTask {
  task_id: string,
  task_info: string,
  task_status: boolean
}

export interface ChangeContent {
  task_id: string,
  task_info: string,
}

export interface ChangeStatus {
  task_id: string,
}