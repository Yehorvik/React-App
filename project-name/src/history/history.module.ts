import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryEvent } from './entities/history-event.entity';
import { TaskHistoryEvent } from './entities/task-history-event.entity';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import EventHappenedListener from './listener/event-happened-listener';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEvent, TaskHistoryEvent])],
  providers: [HistoryService, EventHappenedListener],
  controllers: [HistoryController],
})
export class HistoryModule {}
