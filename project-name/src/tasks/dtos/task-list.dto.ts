import { TaskList } from '../entities/task-list.entity';
import { Task } from '../entities/task.entity';

export class TaskListDto {
  constructor(
    public name: string,
    public tasks: Task[],
  ) {}

  public static from(taskList: Partial<TaskListDto>) {
    const it = new TaskListDto(taskList.name, taskList.tasks);
    return it;
  }

  public static fromEntity(taskList: TaskList) {
    return this.from({ name: taskList.name, tasks: taskList.tasks });
  }

  public static toEntity(listDto: TaskListDto): TaskList {
    const tl: TaskList = new TaskList();
    tl.name = listDto.name;
    tl.tasks = listDto.tasks;
    return tl;
  }
}
