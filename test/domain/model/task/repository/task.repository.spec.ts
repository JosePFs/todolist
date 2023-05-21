import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from '@/domain/model/task/repository/task-repository.interface';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@/app.module';
import { TaskBuilder } from '@/domain/model/task/task.entity';
import { State } from '@/domain/model/shared/state.enum';
import { TaskId } from '@/domain/model/task/task-id.vo';

describe('TaskRepositoryService', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let repository: TaskRepository;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    repository = moduleFixture.get('TaskRepository');

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await moduleFixture.close();
  });

  it('should create, update, retrieve and delete task', async () => {
    const taskId = TaskId.generate();
    const title = 'title';
    const dueDate = new Date();
    const description = 'description';
    const task = new TaskBuilder()
      .id(taskId)
      .title(title)
      .description(description)
      .dueDate(dueDate)
      .state(State.NON_COMPLETED)
      .build();

    const createdTask = await repository.save(task);
    const retrievedTask = await repository.findById(taskId);

    expect(createdTask).toEqual(retrievedTask);

    const taskToUpdate = { ...task, title: 'updated' };
    const updatedTask = await repository.update(taskToUpdate);

    expect(updatedTask).toEqual(taskToUpdate);

    await repository.delete(taskId);

    const tasks = await repository.findAll();

    expect(tasks).not.toEqual(
      expect.arrayContaining([
        {
          id: taskId.value,
          title: 'updated',
          description,
          dueDate: dueDate.toISOString(),
          state: State.NON_COMPLETED,
        },
      ]),
    );
  });
});
