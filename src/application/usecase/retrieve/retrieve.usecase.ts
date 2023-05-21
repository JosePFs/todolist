import { Inject, Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { RetrieveTasksParams } from 'src/api/endpoint/retrieve/retrieve-tasks.params';
import { Sort } from 'src/domain/model/shared/order.filter';
import { TaskRepository } from 'src/domain/model/task/repository/task-repository.interface';
import { Task } from 'src/domain/model/task/task.entity';

@Injectable()
export class RetrieveUsecase {
  constructor(
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
  ) {}

  async execute(retrieveAllTasksParams: RetrieveTasksParams): Promise<Task[]> {
    const sort = Builder<Sort>()
      .orderBy(retrieveAllTasksParams.orderBy)
      .sortOrder(retrieveAllTasksParams.sortOrder)
      .build();

    return this.taskRepository.findAll(retrieveAllTasksParams.state, sort);
  }
}
