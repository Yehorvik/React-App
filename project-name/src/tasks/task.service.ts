import { Injectable } from '@nestjs/common';
import { TaskDto } from './dtos/task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from './entities/task-list.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TaskListDto } from './dtos/task-list.dto';
import TaskCreatedEvent from 'src/history/events/task-created.event';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
    private eventEmitter: EventEmitter2,
  ) {}

  async createTaskList(taskList: TaskListDto): Promise<TaskListDto> {
    const tl: TaskList = new TaskList();
    tl.name = taskList.name;
    tl.tasks = [];
    const createdTL = this.taskListRepository
      .save(tl)
      .then((e) => TaskListDto.from(e));
    this.eventEmitter.emit('taskList.created', {
      name: taskList.name,
    });
    return createdTL;
  }

  async updateTaskList(taskList: TaskListDto) {
    const tl = await this.taskListRepository.findOneBy({ name: taskList.name });
    const res = await this.taskListRepository.update(tl, taskList);
    this.eventEmitter.emit('taskList.updated', {
      prev: tl.name,
      cur: taskList.name,
    });
    return res;
  }

  async moveTask(id: number, taskList: string) {
    const tl = await this.taskListRepository.findOneBy({ name: taskList });
    const task1: Task = await this.taskRepository.findOneBy({ id: id });
    task1.taskList = tl;
    const res = await this.taskRepository
      .update(id, task1)
      .then((e) => e.affected > 0);
    this.eventEmitter.emit('task.moved', {
      taskId: task1,
      prev: task1.taskList,
      to: tl,
    });
    return res;
  }
  async createTask(task: TaskDto, taskListName: string): Promise<TaskDto> {
    const tl = await this.taskListRepository.findOneBy({ name: taskListName });
    const cTask = TaskDto.toEntity(task, tl);
    const res = await this.taskRepository
      .save(cTask)
      .then((e) => TaskDto.fromEntity(e));
    const t: TaskCreatedEvent = { task: cTask, taskList: tl };
    this.eventEmitter.emit('task.created', t);
    return res;
  }

  async removeTask(id: number): Promise<void> {
    const task = await this.findById(id);
    await this.taskRepository.delete(id);
    await this.eventEmitter.emit('task.deleted', task);
  }

  // findAll(): Promise<Array<Task>> {
  //   return this.taskRepository.find();
  // }

  async findAllLists(): Promise<Array<TaskListDto>> {
    return (
      await this.taskListRepository
        .createQueryBuilder('taskList')
        .leftJoinAndSelect('taskList.tasks', 'tasks')
        .orderBy('tasks.createDate', 'ASC')
        .getMany()
    ).flatMap((e) => TaskListDto.fromEntity(e));
    // return this.taskListRepository.find({
    //   relations: { tasks: true },

    //   order: { 'tasks.createDate': 'DESC' },
    // });
  }

  findById(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  async updateTask(id: number, taskDto: Partial<TaskDto>) {
    this.taskRepository.update(id, taskDto);
  }

  async deleteTaskList(taskList: TaskListDto) {
    this.taskRepository.delete(taskList);
  }
}
