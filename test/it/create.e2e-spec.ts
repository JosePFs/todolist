import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { CreateTaskDto } from '@/api/endpoint/create/create-task.dto';
import { State } from '@/api/shared/state.enum';
import { TodolistExceptionFilter } from '@/application/filter/todolist-exception.filter';

describe('CreateEndpoint', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let server: any;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

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

  it('should create task when valid request', async () => {
    const title = 'title';
    const dueDate = new Date();
    const state = State.COMPLETED;
    const description = 'description';
    const createTaskDto = Builder<CreateTaskDto>()
      .title(title)
      .description(description)
      .dueDate(dueDate)
      .state(state)
      .build();

    await request(server).post('/tasks').send(createTaskDto).expect(201);
  });

  it('should return an error when task contains an empty title request', async () => {
    const dueDate = new Date();
    const state = State.COMPLETED;
    const description = 'description';
    const createTaskDto = Builder<CreateTaskDto>()
      .description(description)
      .dueDate(dueDate)
      .state(state)
      .build();

    await request(server)
      .post('/tasks')
      .send(createTaskDto)
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['title should not be empty'],
        error: 'Bad Request',
      });
  });

  it('should return an error when task contains an empty description request', async () => {
    const title = 'title';
    const dueDate = new Date();
    const state = State.COMPLETED;
    const createTaskDto = Builder<CreateTaskDto>()
      .title(title)
      .dueDate(dueDate)
      .state(state)
      .build();

    await request(server)
      .post('/tasks')
      .send(createTaskDto)
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['description should not be empty'],
        error: 'Bad Request',
      });
  });

  it('should return an error when task contains an empty due date request', async () => {
    const title = 'title';
    const state = State.COMPLETED;
    const description = 'description';
    const createTaskDto = Builder<CreateTaskDto>()
      .title(title)
      .description(description)
      .state(state)
      .build();

    await request(server)
      .post('/tasks')
      .send(createTaskDto)
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['dueDate must be a Date instance'],
        error: 'Bad Request',
      });
  });

  it('should create with default state when task contains an empty state request', async () => {
    const title = 'title';
    const dueDate = new Date();
    const description = 'description';
    const createTaskDto = Builder<CreateTaskDto>()
      .title(title)
      .description(description)
      .dueDate(dueDate)
      .build();

    await request(server).post('/tasks').send(createTaskDto).expect(201);
  });

  it('should return an error when task contains a wrong state', async () => {
    const title = 'title';
    const dueDate = new Date();
    const description = 'description';
    const createTaskDto = Builder<CreateTaskDto>()
      .title(title)
      .description(description)
      .dueDate(dueDate)
      .state('wrong' as State)
      .build();

    await request(server)
      .post('/tasks')
      .send(createTaskDto)
      .expect(HttpStatus.BAD_REQUEST);
  });
});
