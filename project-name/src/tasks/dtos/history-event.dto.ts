import { Timestamp } from 'typeorm';
import { Task } from '../entities/task.entity';

export class HistoryEventDto {
  description: string;
  timeOfEvent: Timestamp;
  task: Task;
}
