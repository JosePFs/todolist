import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { State } from '../../shared/state.enum';

export class UpdateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  readonly title?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  readonly description?: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly dueDate?: Date;

  @ApiProperty()
  @IsEnum(State)
  @IsOptional()
  readonly state?: State;
}
