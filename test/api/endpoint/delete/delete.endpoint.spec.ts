import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUsecase } from '@/application/usecase/delete/delete.usecase';
import { TaskId } from '@/domain/model/task/task-id.vo';
import { DeleteEndpoint } from '@/api/endpoint/delete/delete.endpoint';

describe('DeleteEndpoint', () => {
  const mockDeleteUsecaseExecute = jest.fn();
  let deleteEndpoint: DeleteEndpoint;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DeleteUsecase,
          useValue: { execute: mockDeleteUsecaseExecute },
        },
      ],
      controllers: [DeleteEndpoint],
    }).compile();

    deleteEndpoint = module.get<DeleteEndpoint>(DeleteEndpoint);
  });

  it('should execute use case with params', () => {
    const taskId = TaskId.fromString('97b1ba18-718f-433e-b9b0-2cd622aedf71');

    deleteEndpoint.delete(taskId.value);

    expect(mockDeleteUsecaseExecute).toHaveBeenCalledWith(taskId);
  });
});
