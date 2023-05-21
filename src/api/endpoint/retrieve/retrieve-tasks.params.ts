import { SortOrder } from 'src/api/shared/sort-order.enum';
import { State } from 'src/api/shared/state.enum';

export class RetrieveTasksParams {
  public constructor(
    readonly orderBy?: string,
    readonly sortOrder?: SortOrder,
    readonly state?: State,
  ) {}
}
