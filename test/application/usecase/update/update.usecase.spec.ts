import { Test, TestingModule } from '@nestjs/testing';
import { State } from '@/domain/model/shared/state.enum';
import { UpdateUsecase } from '@/application/usecase/update/update.usecase';
import { Builder } from 'builder-pattern';
import { UpdateTaskParams } from '@/application/usecase/update/update-task.params';
import { TaskId } from '@/domain/model/task/task-id.vo';
import { TaskBuilder } from '@/domain/model/task/task.entity';

describe('UpdateUsecase', () => {
  const taskId = TaskId.generate();
  const title = 'title';
  const dueDate = new Date();
  const state = State.COMPLETED;
  const description = 'description';
  const task = new TaskBuilder()
    .id(taskId)
    .title(title)
    .description(description)
    .dueDate(dueDate)
    .state(state)
    .build();
  const mockRepositoryUpdate = jest.fn();
  let updateUsecase: UpdateUsecase;

  beforeEach(async () => {
    mockRepositoryUpdate.mockReset();
  });

  it('should execute delete task when exists', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'TaskRepository',
          useValue: {
            findById: jest.fn().mockResolvedValue(task),
            update: mockRepositoryUpdate,
          },
        },
        UpdateUsecase,
      ],
    }).compile();
    updateUsecase = module.get<UpdateUsecase>(UpdateUsecase);

    const updateParams = Builder<UpdateTaskParams>()
      .id(taskId)
      .title(title)
      .description(description)
      .dueDate(dueDate)
      .state(state)
      .build();

    updateUsecase.execute(updateParams);

    expect(await mockRepositoryUpdate).toHaveBeenCalledWith(task);
  });

  it('should return error when task does not exist', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'TaskRepository',
          useValue: {
            findById: jest.fn().mockResolvedValue(null),
            update: mockRepositoryUpdate,
          },
        },
        UpdateUsecase,
      ],
    }).compile();
    updateUsecase = module.get<UpdateUsecase>(UpdateUsecase);

    const updateParams = Builder<UpdateTaskParams>()
      .title(title)
      .description(description)
      .dueDate(dueDate)
      .state(state)
      .build();

    await expect(updateUsecase.execute(updateParams)).rejects.toThrow();
  });
});
