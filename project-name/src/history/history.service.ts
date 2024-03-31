import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryEvent } from './entities/history-event.entity';
import { TaskHistoryEvent } from './entities/task-history-event.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEvent)
    private readonly historyRepository: Repository<HistoryEvent>,
    @InjectRepository(TaskHistoryEvent)
    private readonly eventRepository: Repository<TaskHistoryEvent>,
  ) {}

  async getAll(): Promise<HistoryEvent[]> {
    return await this.historyRepository.find();
  }
  async getByTask(id: number): Promise<TaskHistoryEvent[]> {
    return await this.eventRepository.findBy({ task: { id: id } });
  }
  async addEvent(historyEvent: HistoryEvent) {
    this.historyRepository.save(historyEvent);
  }

  async addTaskEvent(historyEvent: TaskHistoryEvent) {
    this.eventRepository.save(historyEvent);
  }
}
