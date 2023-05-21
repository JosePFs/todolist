import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUsecase } from '@/application/usecase/delete/delete.usecase';
import { TaskId } from '@/domain/model/task/task-id.vo';
import { TaskBuilder } from '@/domain/model/task/task.entity';
import { State } from '@/domain/model/shared/state.enum';
import { NotFoundException } from '@/domain/model/exception/not-found.exception';

describe('DeleteUsecase', () => {
  const taskId = TaskId.generate();
  const title = 'title';
  const description = 'description';
  const dueDate = new Date();
  const state = State.NON_COMPLETED;
  const task = new TaskBuilder()
    .id(taskId)
    .title(title)
    .description(description)
    .dueDate(dueDate)
    .state(state)
    .build();
  const mockRepositoryDelete = jest.fn();
  let deleteUsecase: DeleteUsecase;

  beforeEach(async () => {
    mockRepositoryDelete.mockReset();
  });

  it('should execute delete task when exists', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'TaskRepository',
          useValue: {
            findById: jest.fn().mockResolvedValue(task),
            delete: mockRepositoryDelete,
          },
        },
        DeleteUsecase,
      ],
    }).compile();
    deleteUsecase = module.get<DeleteUsecase>(DeleteUsecase);

    deleteUsecase.execute(taskId);

    expect(await mockRepositoryDelete).toHaveBeenCalledWith(taskId);
  });

  it('should return error when task does not exist', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'TaskRepository',
          useValue: {
            findById: jest.fn().mockResolvedValue(null),
            delete: mockRepositoryDelete,
          },
        },
        DeleteUsecase,
      ],
    }).compile();
    deleteUsecase = module.get<DeleteUsecase>(DeleteUsecase);

    await expect(deleteUsecase.execute(taskId)).rejects.toThrow();
  });
});
