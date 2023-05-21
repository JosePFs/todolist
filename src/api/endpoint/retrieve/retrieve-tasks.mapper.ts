import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { State } from 'src/api/shared/state.enum';
import { QueryFilter } from 'src/api/shared/query-filter.filter';
import { RetrieveTasksParams } from './retrieve-tasks.params';
import { Task } from 'src/domain/model/task/task.entity';
import { TaskDto } from 'src/api/shared/task.dto';

@Injectable()
export class RetrieveTasksMapper {
  public mapParams(filter: QueryFilter): RetrieveTasksParams {
    const { orderBy, sortOrder, state } = filter;

    return Builder<RetrieveTasksParams>()
      .orderBy(orderBy)
      .sortOrder(sortOrder)
      .state(state as State)
      .build();
  }

  public mapTasksToDtos(tasks: Task[]): TaskDto[] {
    return tasks.map(this.mapTaskToDto);
  }

  private mapTaskToDto(task: Task): TaskDto {
    const { id, title, description, dueDate, state } = task;

    return Builder<TaskDto>()
      .id(id?.value)
      .title(title)
      .description(description)
      .dueDate(dueDate)
      .state(state)
      .build();
  }
}
