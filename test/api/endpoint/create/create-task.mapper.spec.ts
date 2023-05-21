import { Test, TestingModule } from '@nestjs/testing';
import { Builder } from 'builder-pattern';
import { CreateTaskMapper } from '@/api/endpoint/create/create-task.mapper';
import { CreateTaskDto } from '@/api/endpoint/create/create-task.dto';
import { State } from '@/domain/model/shared/state.enum';
import { CreateTaskParamsBuilder } from '@/application/usecase/create/create-task.params';

describe('CreateTaskMapper', () => {
  const title = 'title';
  const dueDate = new Date();
  const state = State.COMPLETED;
  const description = 'description';
  const createTaskDto = Builder<CreateTaskDto>()
    .title(title)
    .description(description)
    .dueDate(dueDate)
    .state(state)
    .build();
  const expectedCreateParams = new CreateTaskParamsBuilder()
    .title(title)
    .description(description)
    .dueDate(dueDate)
    .state(state)
    .build();

  let createTaskMapper: CreateTaskMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTaskMapper],
    }).compile();

    createTaskMapper = module.get<CreateTaskMapper>(CreateTaskMapper);
  });

  it('should map from create task dto to create task params', () => {
    expect(createTaskMapper.map(createTaskDto)).toEqual(expectedCreateParams);
  });
});
