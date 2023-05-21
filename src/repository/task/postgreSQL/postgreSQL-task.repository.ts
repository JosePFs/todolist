import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SortOrder } from '@/api/shared/sort-order.enum';
import { State } from '@/api/shared/state.enum';
import { TaskRepository } from '@/domain/model/task/repository/task-repository.interface';
import { TaskId } from '@/domain/model/task/task-id.vo';
import { Task } from '@/domain/model/task/task.entity';
import { Sort } from '@/domain/model/shared/order.filter';
import { TaskDtoMapper } from './dto/task.dto-mapper';
import { TaskDto } from './dto/task.dto';
@Injectable()
export class PostgreSQLTaskRepository implements TaskRepository {
  private static readonly DEFAULT_ORDER_BY = 'dueDate';

  constructor(
    @InjectRepository(TaskDto)
    private readonly taskDAO: Repository<TaskDto>,
    private readonly taskDtoMapper: TaskDtoMapper,
  ) {}

  findAll(state?: State, sort?: Sort): Promise<Task[]> {
    const orderBy = sort?.orderBy ?? PostgreSQLTaskRepository.DEFAULT_ORDER_BY;
    const sortOrder = sort?.sortOrder ?? SortOrder.DESC;
    const order = { [orderBy]: sortOrder };
    const where = state ? [{ state }] : [];

    return this.taskDAO
      .find({ where, order })
      .then((taskDtos) =>
        taskDtos.map((taskDto) => this.taskDtoMapper.toEntity(taskDto)),
      );
  }

  findById(taskId: TaskId): Promise<Task | null> {
    return this.taskDAO
      .findOneBy({ id: taskId.value })
      .then((taskDto) => taskDto && this.taskDtoMapper.toEntity(taskDto));
  }

  delete(taskId: TaskId): void {
    this.taskDAO.delete({ id: taskId.value });
  }

  save(task: Task): Promise<Task> {
    return this.upsert(task);
  }

  update(task: Task): Promise<Task> {
    return this.upsert(task);
  }

  private upsert(task: Task): Promise<Task> {
    return this.taskDAO
      .save(this.taskDtoMapper.toDto(task))
      .then((newTakDto) => this.taskDtoMapper.toEntity(newTakDto));
  }
}
