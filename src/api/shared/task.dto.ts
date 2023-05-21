import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { State } from './state.enum';

export class TaskDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ required: true })
  @Type(() => Date)
  @IsDate()
  readonly dueDate: Date;

  @ApiProperty({ required: true })
  @IsEnum(State)
  @IsOptional()
  readonly state?: State;
}
