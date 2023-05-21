import { Module } from '@nestjs/common';
import { CreateUsecase } from './usecase/create/create.usecase';
import { RetrieveUsecase } from './usecase/retrieve/retrieve.usecase';
import { UpdateUsecase } from './usecase/update/update.usecase';
import { DeleteUsecase } from './usecase/delete/delete.usecase';

@Module({
  providers: [
    CreateUsecase,
    RetrieveUsecase,
    UpdateUsecase,
    DeleteUsecase,
  ],
  exports: [CreateUsecase, RetrieveUsecase, UpdateUsecase, DeleteUsecase],
})
export class ApplicationModule {}
