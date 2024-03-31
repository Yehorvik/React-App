import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskList } from './task-list.entity';
import { Priority } from './priority';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @CreateDateColumn()
  createDate: Date;
  @Column()
  dueDate: Date;
  @Column()
  priority: Priority;
  @ManyToOne(() => TaskList, (taskList) => taskList)
  @JoinColumn()
  taskList: TaskList;
}
