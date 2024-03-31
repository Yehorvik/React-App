import { Task } from 'src/tasks/entities/task.entity';

export default class TaskDeletedEvent {
  deletedTask: Task;
}
