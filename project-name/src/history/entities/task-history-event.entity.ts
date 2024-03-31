import { Entity, ManyToOne } from 'typeorm';
import { HistoryEvent } from './history-event.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class TaskHistoryEvent extends HistoryEvent {
  @ManyToOne(() => Task, (task) => task.id, { cascade: true })
  task: Task;
}
