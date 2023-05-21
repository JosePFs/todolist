import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteUsecase } from '@/application/usecase/delete/delete.usecase';
import { TaskId } from '@/domain/model/task/task-id.vo';

@ApiTags('Tasks')
@Controller()
export class DeleteEndpoint {
  constructor(private readonly deleteUsecase: DeleteUsecase) {}

  @Delete('tasks/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.deleteUsecase.execute(TaskId.fromString(id));
  }
}
