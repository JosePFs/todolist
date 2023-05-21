import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '@/domain/model/task/repository/task-repository.interface';
import { Task, TaskBuilder } from '@/domain/model/task/task.entity';
import { CreateTaskParams } from './create-task.params';

@Injectable()
export class CreateUsecase {
  constructor(
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
  ) {}

  execute(createTaskParams: CreateTaskParams): Promise<Task> {
    return this.taskRepository.save(
      new TaskBuilder()
        .title(createTaskParams.title)
        .description(createTaskParams.description)
        .dueDate(createTaskParams.dueDate)
        .state(createTaskParams.state)
        .build(),
    );
  }
}
