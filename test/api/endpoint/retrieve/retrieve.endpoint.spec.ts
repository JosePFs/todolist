import { Test, TestingModule } from '@nestjs/testing';
import { Builder } from 'builder-pattern';
import { State } from '@/api/shared/state.enum';
import { QueryFilter } from '@/api/shared/query-filter.filter';
import { SortOrder } from '@/api/shared/sort-order.enum';
import { RetrieveTasksMapper } from '@/api/endpoint/retrieve/retrieve-tasks.mapper';
import { RetrieveEndpoint } from '@/api/endpoint/retrieve/retrieve.endpoint';
import { RetrieveTasksParams } from '@/api/endpoint/retrieve/retrieve-tasks.params';
import { TaskBuilder } from '@/domain/model/task/task.entity';
import { TaskDto } from '@/api/shared/task.dto';
import { RetrieveUsecase } from '@/application/usecase/retrieve/retrieve.usecase';

describe('RetrieveEndpoint', () => {
  const title = 'title';
  const description = 'description';
  const duedate = new Date();
  const state = State.NON_COMPLETED;
  const retrieveParams = Builder<RetrieveTasksParams>()
    .orderBy('dueDate')
    .sortOrder(SortOrder.ASC)
    .state(state)
    .build();
  const tasks = [
    new TaskBuilder()
      .title(title)
      .description(description)
      .dueDate(duedate)
      .state(state)
      .build(),
  ];
  const tasksDtos = [
    Builder<TaskDto>()
      .title(title)
      .description(description)
      .dueDate(duedate)
      .state(state)
      .build(),
  ];
  const mockRetrieveTasksMapperMapParams = jest.fn(() => retrieveParams);
  const mockRetrieveTasksMapperMapTasksToDtos = jest.fn(() => tasksDtos);
  let retrieveEndpoint: RetrieveEndpoint;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RetrieveTasksMapper,
          useValue: {
            mapParams: mockRetrieveTasksMapperMapParams,
            mapTasksToDtos: mockRetrieveTasksMapperMapTasksToDtos,
          },
        },
        {
          provide: RetrieveUsecase,
          useValue: { execute: jest.fn().mockResolvedValue(tasks) },
        },
      ],
      controllers: [RetrieveEndpoint],
    }).compile();

    retrieveEndpoint = module.get<RetrieveEndpoint>(RetrieveEndpoint);
  });

  it('should execute use case retrieving pending tasks', async () => {
    const queryFilter = Builder<QueryFilter>()
      .orderBy('dueDate')
      .sortOrder(SortOrder.ASC)
      .state(state)
      .build();

    retrieveEndpoint.retrieve(queryFilter);

    expect(mockRetrieveTasksMapperMapParams).toHaveBeenCalledWith(queryFilter);
    expect(await mockRetrieveTasksMapperMapTasksToDtos).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          title,
          description,
        }),
      ]),
    );
  });
});
