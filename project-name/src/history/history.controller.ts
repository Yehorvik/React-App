import { Controller, Get, Param } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  @Get(':id')
  async getTaskHistory(@Param('id') id: number) {
    return this.historyService.getByTask(id);
  }
  @Get('')
  async getHistory() {
    return this.historyService.getAll();
  }
}
