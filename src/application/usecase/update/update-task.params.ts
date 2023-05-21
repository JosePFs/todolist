import { TaskId } from '@/domain/model/task/task-id.vo';
import { MandatoryParameterException } from 'src/domain/model/exception/mandatory-parameter.exception';
import { State } from 'src/domain/model/shared/state.enum';

export class UpdateTaskParams {
  public constructor(
    readonly id: TaskId,
    readonly title?: string,
    readonly description?: string,
    readonly dueDate?: Date,
    readonly state?: State,
  ) {
    this.validate();
  }

  private validate() {
    if (!this.id) {
      throw new MandatoryParameterException('id');
    }
  }
}
