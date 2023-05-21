import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsecase } from '@/application/usecase/create/create.usecase';
import { State } from '@/domain/model/shared/state.enum';
import { CreateTaskParamsBuilder } from '@/application/usecase/create/create-task.params';

describe('CreateUsecase', () => {
  const title = 'title';
  const dueDate = new Date();
  const state = State.COMPLETED;
  const description = 'description';
  const createParams = new CreateTaskParamsBuilder()
    .title(title)
    .description(description)
    .dueDate(dueDate)
    .state(state)
    .build();
  const mockRepositorySave = jest.fn();
  let createUsecase: CreateUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'TaskRepository',
          useValue: { save: mockRepositorySave },
        },
        CreateUsecase,
      ],
    }).compile();

    createUsecase = module.get<CreateUsecase>(CreateUsecase);
  });

  it('should execute params', () => {
    createUsecase.execute(createParams);

    expect(mockRepositorySave).toHaveBeenCalledWith(
      expect.objectContaining({
        title,
        description,
        dueDate,
        state,
      }),
    );
  });
});
