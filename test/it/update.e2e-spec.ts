import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { TodolistExceptionFilter } from '@/application/filter/todolist-exception.filter';
import { TaskRepository } from '@/domain/model/task/repository/task-repository.interface';
import { TaskBuilder } from '@/domain/model/task/task.entity';
import { TaskId } from '@/domain/model/task/task-id.vo';
import { State } from '@/domain/model/shared/state.enum';

describe('UpdateEndpoint', () => {
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

  it('should update task to completed when exists', async () => {
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

    await repository.save(task);

    await request(server)
      .patch(`/tasks/${taskId.value}`)
      .send({
        state: State.COMPLETED,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual({
          id: taskId.value,
          title,
          description,
          dueDate: dueDate.toISOString(),
          state: State.COMPLETED,
        });
      });
  });

  it('should return and error when task does not exist', async () => {
    const taskId = TaskId.generate();

    await request(server)
      .patch(`/tasks/${taskId.value}`)
      .send({
        state: State.COMPLETED,
      })
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        statusCode: HttpStatus.BAD_REQUEST,
        message: [`Task with id '${taskId.value}' not found.`],
        error: 'Bad Request',
      });
  });
});
