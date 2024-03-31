import { Priority } from '../entities/priority';
import { TaskList } from '../entities/task-list.entity';
import { Task } from '../entities/task.entity';

export class TaskDto implements Readonly<TaskDto> {
  name: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  id: number;
  public static toEntity(taskDto: TaskDto, taskList: TaskList = null) {
    const task = new Task();
    task.id = taskDto.id;
    task.description = taskDto.description;
    task.dueDate = taskDto.dueDate;
    task.name = taskDto.name;
    task.priority = taskDto.priority;
    task.taskList = taskList ? taskList : null;
    return task;
  }

  public static from(dto: Partial<TaskDto>) {
    const it = new TaskDto();
    it.id = dto.id;
    it.name = dto.name;
    it.description = dto.description;
    it.priority = dto.priority;
    it.dueDate = dto.dueDate;
    return it;
  }

  public static fromEntity(entity: Task) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      priority: entity.priority,
      dueDate: entity.dueDate,
    });
  }
}
