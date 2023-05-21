import { Inject, Injectable } from '@nestjs/common';
import { UpdateTaskParams } from './update-task.params';
import { TaskRepository } from '@/domain/model/task/repository/task-repository.interface';
import { Task, TaskBuilder } from '@/domain/model/task/task.entity';
import { NotFoundException } from '@/domain/model/exception/not-found.exception';

@Injectable()
export class UpdateUsecase {
  constructor(
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
  ) {}

  async execute(updateTaskParams: UpdateTaskParams): Promise<Task> {
    const { id } = updateTaskParams;
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new NotFoundException(`Task with id '${id.value}' not found.`);
    }
    return this.taskRepository.update(
      this.buildTask(existingTask, updateTaskParams),
    );
  }

  private buildTask(
    existingTask: Task,
    updateTaskParams: UpdateTaskParams,
  ): Task {
    return new TaskBuilder()
      .id(existingTask.id)
      .title(updateTaskParams.title ?? existingTask.title)
      .description(updateTaskParams.description ?? existingTask.description)
      .dueDate(updateTaskParams.dueDate ?? existingTask.dueDate)
      .state(updateTaskParams.state ?? existingTask.state)
      .build();
  }
}
