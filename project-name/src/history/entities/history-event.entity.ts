import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class HistoryEvent {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
  @Column({ type: 'varchar', length: 300, nullable: false })
  description;
}
