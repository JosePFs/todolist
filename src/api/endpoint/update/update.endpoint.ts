import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUsecase } from '@/application/usecase/update/update.usecase';
import { TaskDto } from '@/api/shared/task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { UpdateTaskMapper } from './update-task.mapper';

@ApiTags('Tasks')
@Controller()
export class UpdateEndpoint {
  constructor(
    private readonly updateTaskMapper: UpdateTaskMapper,
    private readonly updateUsecase: UpdateUsecase,
  ) {}

  @Patch('tasks/:id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDto> {
    const updateParams = this.updateTaskMapper.mapParams(id, updateTaskDto);
    const updatedTask = await this.updateUsecase.execute(updateParams);
    return this.updateTaskMapper.mapTaskToDto(updatedTask);
  }
}
