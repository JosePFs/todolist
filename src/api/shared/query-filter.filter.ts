import { IsEnum, IsOptional } from 'class-validator';
import { SortOrder } from './sort-order.enum';
import { ApiProperty } from '@nestjs/swagger';
import { State } from './state.enum';

export class QueryFilter {
  @ApiProperty({ required: false })
  @IsOptional()
  public orderBy?: string;

  @ApiProperty({ required: false, enum: SortOrder })
  @IsEnum(SortOrder)
  @IsOptional()
  public sortOrder?: SortOrder = SortOrder.DESC;

  @ApiProperty({ required: false, enum: State })
  @IsEnum(State)
  @IsOptional()
  readonly state?: State;
}
