import { Test, TestingModule } from '@nestjs/testing';
import { Builder } from 'builder-pattern';
import { CreateEndpoint } from '@/api/endpoint/create/create.endpoint';
import { CreateTaskMapper } from '@/api/endpoint/create/create-task.mapper';
import { CreateUsecase } from '@/application/usecase/create/create.usecase';
import { State } from '@/api/shared/state.enum';
import { CreateTaskDto } from '@/api/endpoint/create/create-task.dto';
import { CreateTaskParamsBuilder } from '@/application/usecase/create/create-task.params';

describe('CreateEndpoint', () => {
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
  const mockCreateTaskMapperMap = jest.fn(() => createTaskDto);
  const mockCreateUsecaseExecute = jest.fn();
  let createEndpoint: CreateEndpoint;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CreateTaskMapper,
          useValue: { map: mockCreateTaskMapperMap },
        },
        {
          provide: CreateUsecase,
          useValue: { execute: mockCreateUsecaseExecute },
        },
      ],
      controllers: [CreateEndpoint],
    }).compile();

    createEndpoint = module.get<CreateEndpoint>(CreateEndpoint);
  });

  it('should execute use case with params', () => {
    const createParams = new CreateTaskParamsBuilder()
      .title(title)
      .description(description)
      .dueDate(dueDate)
      .state(state)
      .build();

    createEndpoint.create(createTaskDto);

    expect(mockCreateTaskMapperMap).toHaveBeenCalledWith(createTaskDto);
    expect(mockCreateUsecaseExecute).toHaveBeenCalledWith(createParams);
  });
});
