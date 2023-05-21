import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '@/domain/model/task/repository/task-repository.interface';
import { TaskId } from '@/domain/model/task/task-id.vo';
import { NotFoundException } from '@/domain/model/exception/not-found.exception';

@Injectable()
export class DeleteUsecase {
  constructor(
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
  ) {}

  async execute(taskId: TaskId): Promise<void> {
    const existingTask = await this.taskRepository.findById(taskId);
    if (!existingTask) {
      throw new NotFoundException(`Task with id '${taskId.value}' not found.`);
    }
    return this.taskRepository.delete(taskId);
  }
}
