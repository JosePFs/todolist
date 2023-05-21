import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { State } from '../../shared/state.enum';

export class CreateTaskDto {
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

  @ApiProperty()
  @IsEnum(State)
  @IsOptional()
  readonly state?: State;
}
