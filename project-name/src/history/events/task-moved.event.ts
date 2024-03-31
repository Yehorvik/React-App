import { TaskList } from 'src/tasks/entities/task-list.entity';
import { Task } from 'src/tasks/entities/task.entity';

export default class TaskMovedEvent {
  taskId: Task;
  prev: TaskList;
  to: TaskList;
}
