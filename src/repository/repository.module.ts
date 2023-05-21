import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskDtoMapper } from './task/postgreSQL/dto/task.dto-mapper';
import { TaskDto } from './task/postgreSQL/dto/task.dto';
import { PostgreSQLTaskRepository } from './task/postgreSQL/postgreSQL-task.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([TaskDto])],
  providers: [
    TaskDtoMapper,
    PostgreSQLTaskRepository,
    { provide: 'TaskRepository', useClass: PostgreSQLTaskRepository },
  ],
  exports: [{ provide: 'TaskRepository', useClass: PostgreSQLTaskRepository }],
})
export class RepositoryModule {}
