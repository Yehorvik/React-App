import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class TaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Task, (task) => task.taskList, { cascade: true })
  //@JoinColumn({ name: 'task_id', referencedColumnName: 'id' })
  tasks: Task[];
}
