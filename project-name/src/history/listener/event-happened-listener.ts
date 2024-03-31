import { Injectable } from '@nestjs/common';
import { HistoryService } from '../history.service';
import { OnEvent } from '@nestjs/event-emitter';
import TaskCreatedEvent from '../events/task-created.event';
import TaskMovedEvent from '../events/task-moved.event';
import TaskDeletedEvent from '../events/task-deleted.event';
import TaskListCreated from '../events/task-list-created.event';
import TaskListUpdated from '../events/task-list-updated.event';
import { HistoryEvent } from '../entities/history-event.entity';
import { TaskHistoryEvent } from '../entities/task-history-event.entity';
import { TaskDto } from 'src/tasks/dtos/task.dto';

@Injectable()
export default class EventHappenedListener {
  constructor(private readonly historyService: HistoryService) {}

  @OnEvent('task.created')
  async createdHandler(payload: TaskCreatedEvent) {
    //console.log('task.created');
    //console.log(JSON.stringify(payload));

    const DESCR: string = `the *{${payload.task.name}} was added to ${payload.taskList.name}`;
    const he: HistoryEvent = new HistoryEvent();
    const hts: TaskHistoryEvent = new TaskHistoryEvent();
    hts.description = DESCR;
    hts.task = TaskDto.toEntity(payload.task, payload.taskList);
    he.description = DESCR;
    //console.log(he);
    //console.log(hts);
    await this.historyService.addEvent(he);
    await this.historyService.addTaskEvent(hts);
    //console.log('task.exited');
  }

  @OnEvent('task.moved')
  movedHandler(payload: TaskMovedEvent) {
    console.log('task.moved');
    const DESCR: string = `the *{${payload.taskId.name}} was moved to {${payload.prev.name}} from {${payload.to.name}}`;
    const he: HistoryEvent = new HistoryEvent();
    const hts: TaskHistoryEvent = new TaskHistoryEvent();
    hts.description = DESCR;
    hts.task = payload.taskId;
    he.description = DESCR;
    this.historyService.addEvent(he);
    this.historyService.addTaskEvent(hts);
  }

  @OnEvent('task.deleted')
  deletedHandler(payload: TaskDeletedEvent) {
    console.log('task.deleted');
    const DESCR: string = `the *{${payload.deletedTask.name}} was deleted`;
    const he: HistoryEvent = new HistoryEvent();
    he.description = DESCR;
    this.historyService.addEvent(he);
  }

  @OnEvent('taskList.created')
  listCreatedHandler(payload: TaskListCreated) {
    console.log('taskList.created');
    const DESCR: string = `the list *{${payload.createdTaskList.name}} was created`;
    const he: HistoryEvent = new HistoryEvent();
    he.description = DESCR;
    this.historyService.addEvent(he);
  }

  @OnEvent('taskList.updated')
  listUpdatedHandler(payload: TaskListUpdated) {
    console.log('taskList.updated');
    const DESCR: string = `the list {${payload.previousTaskListName}} was renamed to {${payload.currentTaskListName}}  `;
    const he: HistoryEvent = new HistoryEvent();
    he.description = DESCR;
    this.historyService.addEvent(he);
  }
}
