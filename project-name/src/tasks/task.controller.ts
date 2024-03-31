import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskDto } from './dtos/task.dto';
import { TaskService } from './task.service';
import { TaskListDto } from './dtos/task-list.dto';
import { MovedTaskDto } from './dtos/moved-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly appService: TaskService) {}

  @Get()
  async getAll(): Promise<TaskListDto[]> {
    return this.appService.findAllLists();
  }

  @Post()
  async createTask(@Body() movedTask: MovedTaskDto): Promise<TaskDto> {
    return this.appService.createTask(
      movedTask.taskDto,
      movedTask.taskListName,
    );
  }

  @Post('list')
  async createList(@Body() taskList: TaskListDto): Promise<TaskListDto> {
    try {
      return await this.appService.createTaskList(taskList);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'you are trying to create list with existing name',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  @Get(':id')
  async getTask(@Param('id') id: number) {
    const task = this.appService.findById(id);
    return task ? task : {};
  }

  @Patch('list/:id')
  async moveTask(@Param('id') id: number, @Body() movedTask: MovedTaskDto) {
    this.appService.moveTask(id, movedTask.taskListName);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.appService.removeTask(id);
  }
  @Patch(':id')
  async updateTask(@Param('id') id: number, @Body() taskDto: TaskDto) {
    try {
      return await this.appService.updateTask(id, taskDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'cannot find task by specified id',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }
  @Patch('list')
  async updateTaskList(@Body() taskListDto: TaskListDto) {
    try {
      return await this.appService.updateTaskList(taskListDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'cannot find task list by specified name',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }
}
