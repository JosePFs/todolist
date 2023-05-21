import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { State } from 'src/api/shared/state.enum';
import {
  CreateTaskParams,
  CreateTaskParamsBuilder,
} from '@/application/usecase/create/create-task.params';

@Injectable()
export class CreateTaskMapper {
  public map(createTaskDto: CreateTaskDto): CreateTaskParams {
    const { title, description, dueDate, state } = createTaskDto;

    return new CreateTaskParamsBuilder()
      .title(title)
      .description(description)
      .dueDate(dueDate)
      .state(state as State)
      .build();
  }
}
