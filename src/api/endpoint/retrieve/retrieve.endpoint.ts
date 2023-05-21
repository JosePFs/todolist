import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RetrieveUsecase } from '@/application/usecase/retrieve/retrieve.usecase';
import { QueryFilter } from '@/api/shared/query-filter.filter';
import { TaskDto } from '@/api/shared/task.dto';
import { RetrieveTasksMapper } from './retrieve-tasks.mapper';

@ApiTags('Tasks')
@Controller()
export class RetrieveEndpoint {
  constructor(
    private readonly retrieveTasksMapper: RetrieveTasksMapper,
    private readonly retrieveTasksUsecase: RetrieveUsecase,
  ) {}

  @Get('tasks')
  retrieve(@Query() filter: QueryFilter): Promise<TaskDto[]> {
    return this.retrieveTasksUsecase
      .execute(this.retrieveTasksMapper.mapParams(filter))
      .then((tasks) => this.retrieveTasksMapper.mapTasksToDtos(tasks));
  }
}
