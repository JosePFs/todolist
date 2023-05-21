import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { RepositoryModule } from './repository/repository.module';
import { TaskDto } from './repository/task/postgreSQL/dto/task.dto';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [TaskDto],
        synchronize: !!configService.get('DB_SYNC'),
      }),
      inject: [ConfigService],
    }),
    ApiModule,
    ApplicationModule,
    DomainModule,
    RepositoryModule,
  ],
  providers: [],
})
export class AppModule {}
