import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { TodolistExceptionFilter } from '@/application/filter/todolist-exception.filter';
import { TaskRepository } from '@/domain/model/task/repository/task-repository.interface';
import { TaskBuilder } from '@/domain/model/task/task.entity';
import { TaskId } from '@/domain/model/task/task-id.vo';
import { State } from '@/domain/model/shared/state.enum';

describe('RetrieveEndpoint', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let server: any;
  let repository: TaskRepository;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    repository = moduleFixture.get('TaskRepository');

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new TodolistExceptionFilter());
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
    await moduleFixture.close();
  });

  it('should get pending tasks oder by due date', async () => {
    const taskId = TaskId.generate();
    const title = 'title';
    const dueDate = new Date();
    const description = 'description';
    const nonCompletedTaskIdOne = TaskId.generate();
    const dueDateOne = new Date();
    const nonCompletedTaskIdTwo = TaskId.generate();
    const dueDateTwo = new Date(Date.now() + 3600);
    const nonCompletedOne = new TaskBuilder()
      .id(nonCompletedTaskIdOne)
      .title(title)
      .description(description)
      .dueDate(dueDateOne)
      .state(State.NON_COMPLETED)
      .build();
    const nonCompletedTwo = new TaskBuilder()
      .id(nonCompletedTaskIdTwo)
      .title(title)
      .description(description)
      .dueDate(dueDateTwo)
      .state(State.NON_COMPLETED)
      .build();
    const tasks = [
      new TaskBuilder()
        .id(taskId)
        .title(title)
        .description(description)
        .dueDate(dueDate)
        .state(State.COMPLETED)
        .build(),
      nonCompletedOne,
      nonCompletedTwo,
    ];

    await Promise.all(tasks.map((task) => repository.save(task)));

    await request(server)
      .get('/tasks?orderBy=dueDate&sortOrder=ASC&state=NON_COMPLETED')
      .expect(200)
      .expect(({ body }) => {
        expect(body).not.toEqual(
          expect.arrayContaining([
            {
              id: taskId.value,
              title,
              description,
              dueDate: dueDate.toISOString(),
              state: State.COMPLETED,
            },
          ]),
        );
        const taskOneOderPosition = body.findIndex(
          (task: { id: string }) => task.id === nonCompletedOne.id.value,
        );
        const taskTwoOrderPosition = body.findIndex(
          (task: { id: string }) => task.id === nonCompletedTwo.id.value,
        );
        expect(taskOneOderPosition).toBeLessThan(taskTwoOrderPosition);
      });
  });
});
