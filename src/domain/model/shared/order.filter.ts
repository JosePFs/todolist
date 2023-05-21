import { SortOrder } from './sort-order.enum';

export class Sort {
  public constructor(
    readonly orderBy?: string,
    readonly sortOrder?: SortOrder,
  ) {}
}
