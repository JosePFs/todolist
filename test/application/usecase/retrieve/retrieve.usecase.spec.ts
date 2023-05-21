import { Test, TestingModule } from '@nestjs/testing';
import { Builder } from 'builder-pattern';
import { State } from '@/domain/model/shared/state.enum';
import { RetrieveUsecase } from '@/application/usecase/retrieve/retrieve.usecase';
import { TaskId } from '@/domain/model/task/task-id.vo';
import { TaskBuilder } from '@/domain/model/task/task.entity';
import { RetrieveTasksParams } from '@/api/endpoint/retrieve/retrieve-tasks.params';
import { Sort } from '@/domain/model/shared/order.filter';
import { SortOrder } from '@/domain/model/shared/sort-order.enum';

describe('RetrieveUsecase', () => {
  const taskId = TaskId.generate();
  const title = 'title';
  const dueDate = new Date();
  const state = State.NON_COMPLETED;
  const description = 'description';
  const task = new TaskBuilder()
    .id(taskId)
    .title(title)
    .description(description)
    .dueDate(dueDate)
    .state(state)
    .build();
  const mockRepositoryFindAll = jest.fn().mockResolvedValue([task]);
  let retrieveUsecase: RetrieveUsecase;

  beforeEach(async () => {
    mockRepositoryFindAll.mockReset();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'TaskRepository',
          useValue: { findAll: mockRepositoryFindAll },
        },
        RetrieveUsecase,
      ],
    }).compile();

    retrieveUsecase = module.get<RetrieveUsecase>(RetrieveUsecase);
  });

  it('should execute with params when not empty params', () => {
    const retrieveParams = Builder<RetrieveTasksParams>()
      .orderBy('dueDate')
      .sortOrder(SortOrder.ASC)
      .state(state)
      .build();
    const sort = Builder<Sort>()
      .orderBy(retrieveParams.orderBy)
      .sortOrder(retrieveParams.sortOrder)
      .build();

    retrieveUsecase.execute(retrieveParams);

    expect(mockRepositoryFindAll).toHaveBeenCalledWith(state, sort);
  });

  it('should execute without params when empty params', () => {
    const retrieveParams = Builder<RetrieveTasksParams>().build();

    retrieveUsecase.execute(retrieveParams);

    expect(mockRepositoryFindAll).toHaveBeenCalledWith(undefined, {
      orderBy: undefined,
      sortOrder: undefined,
    });
  });
});
