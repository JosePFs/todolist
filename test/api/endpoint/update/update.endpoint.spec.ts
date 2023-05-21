import { Test, TestingModule } from '@nestjs/testing';
import { TaskId } from '@/domain/model/task/task-id.vo';
import { UpdateEndpoint } from '@/api/endpoint/update/update.endpoint';
import { UpdateUsecase } from '@/application/usecase/update/update.usecase';
import { State } from '@/api/shared/state.enum';
import { UpdateTaskMapper } from '@/api/endpoint/update/update-task.mapper';
import { Builder } from 'builder-pattern';
import { UpdateTaskParams } from '@/application/usecase/update/update-task.params';
import { TaskDto } from '@/api/shared/task.dto';
import { TaskBuilder } from '@/domain/model/task/task.entity';

describe('UpdateEndpoint', () => {
  const taskId = TaskId.fromString('97b1ba18-718f-433e-b9b0-2cd622aedf71');
  const title = 'title';
  const dueDate = new Date();
  const state = State.COMPLETED;
  const description = 'description';
  const updateTaskParams = Builder<UpdateTaskParams>()
    .id(taskId)
    .title(title)
    .description(description)
    .dueDate(dueDate)
    .state(state as State)
    .build();
  const updatedTask = new TaskBuilder()
    .id(taskId)
    .title(title)
    .description(description)
    .dueDate(dueDate)
    .state(state)
    .build();
  const updatedTaskDto = Builder<TaskDto>()
    .title(title)
    .description(description)
    .dueDate(dueDate)
    .state(state)
    .build();
  const mockUpdateTaskMapperMapParams = jest.fn(() => updateTaskParams);
  const mockUpdateTaskMapperMapTaskToDto = jest.fn(() => updatedTaskDto);
  let updateEndpoint: UpdateEndpoint;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UpdateTaskMapper,
          useValue: {
            mapParams: mockUpdateTaskMapperMapParams,
            mapTaskToDto: mockUpdateTaskMapperMapTaskToDto,
          },
        },
        {
          provide: UpdateUsecase,
          useValue: { execute: jest.fn().mockResolvedValue(updatedTask) },
        },
      ],
      controllers: [UpdateEndpoint],
    }).compile();

    updateEndpoint = module.get<UpdateEndpoint>(UpdateEndpoint);
  });

  it('should execute use case with params', async () => {
    updateEndpoint.update(taskId.value, updatedTask);

    expect(mockUpdateTaskMapperMapParams).toHaveBeenCalledWith(
      taskId.value,
      updatedTask,
    );
    expect(await mockUpdateTaskMapperMapTaskToDto).toHaveBeenCalledWith(
      expect.objectContaining({
        title,
        description,
        dueDate,
        state,
      }),
    );
  });
});
