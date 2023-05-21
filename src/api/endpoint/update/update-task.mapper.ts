import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { State } from 'src/api/shared/state.enum';
import { UpdateTaskDto } from './update-task.dto';
import { UpdateTaskParams } from 'src/application/usecase/update/update-task.params';
import { TaskDto } from 'src/api/shared/task.dto';
import { Task } from 'src/domain/model/task/task.entity';
import { TaskId } from '@/domain/model/task/task-id.vo';

@Injectable()
export class UpdateTaskMapper {
  public mapParams(id: string, updateTaskDto: UpdateTaskDto): UpdateTaskParams {
    const { title, description, dueDate, state } = updateTaskDto;

    return Builder<UpdateTaskParams>()
      .id(TaskId.fromString(id))
      .title(title)
      .description(description)
      .dueDate(dueDate)
      .state(state as State)
      .build();
  }

  public mapTaskToDto(task: Task): TaskDto {
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
