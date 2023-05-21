import { Module } from '@nestjs/common';
import { CreateTaskMapper } from './endpoint/create/create-task.mapper';
import { CreateEndpoint } from './endpoint/create/create.endpoint';
import { RetrieveEndpoint } from './endpoint/retrieve/retrieve.endpoint';
import { UpdateEndpoint } from './endpoint/update/update.endpoint';
import { DeleteEndpoint } from './endpoint/delete/delete.endpoint';
import { RetrieveTasksMapper } from './endpoint/retrieve/retrieve-tasks.mapper';
import { UpdateTaskMapper } from './endpoint/update/update-task.mapper';
import { ApplicationModule } from '@/application/application.module';

@Module({
  imports: [ApplicationModule],
  providers: [CreateTaskMapper, RetrieveTasksMapper, UpdateTaskMapper],
  controllers: [
    CreateEndpoint,
    RetrieveEndpoint,
    UpdateEndpoint,
    DeleteEndpoint,
  ],
})
export class ApiModule {}
