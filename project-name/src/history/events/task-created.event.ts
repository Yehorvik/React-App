import { TaskList } from 'src/tasks/entities/task-list.entity';
import { Task } from 'src/tasks/entities/task.entity';

export default class TaskCreatedEvent {
  task: Task;
  taskList: TaskList;
}
