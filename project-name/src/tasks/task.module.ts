import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskList } from './entities/task-list.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskList]),
    EventEmitterModule.forRoot(),
    HistoryModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService, HistoryModule],
})
export class TaskModule {}
