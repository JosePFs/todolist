import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { Task, TaskBuilder } from '@/domain/model/task/task.entity';
import { TaskId } from '@/domain/model/task/task-id.vo';
import { State } from '@/domain/model/shared/state.enum';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskDtoMapper {
  public toEntity(taskDto: TaskDto): Task {
    const { title, description, dueDate, state } = taskDto;

    return new TaskBuilder()
      .id(TaskId.fromString(taskDto.id))
      .title(title)
      .description(description)
      .dueDate(dueDate)
      .state(state as State)
      .build();
  }

  public toDto(task: Task): TaskDto {
    const { title, description, dueDate, state } = task;

    return Builder<TaskDto>()
      .id(task.id?.value)
      .title(title)
      .description(description)
      .dueDate(dueDate)
      .state(state.toString())
      .build();
  }
}
