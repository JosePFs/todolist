import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUsecase } from '@/application/usecase/create/create.usecase';
import { CreateTaskMapper } from './create-task.mapper';
import { CreateTaskDto } from './create-task.dto';

@ApiTags('Tasks')
@Controller()
export class CreateEndpoint {
  constructor(
    private readonly createTaskMapper: CreateTaskMapper,
    private readonly createUsecase: CreateUsecase,
  ) {}

  @Post('tasks')
  async create(@Body() createTaskDto: CreateTaskDto): Promise<void> {
    const createParams = this.createTaskMapper.map(createTaskDto);
    await this.createUsecase.execute(createParams);
    return Promise.resolve();
  }
}
