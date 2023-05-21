import { v4 as uuidv4 } from 'uuid';
import { MandatoryParameterException } from '../exception/mandatory-parameter.exception';

export class TaskId {
  private constructor(readonly value: string) {
    this.validate();
  }

  public static generate(): TaskId {
    return new TaskId(uuidv4());
  }

  public static fromString(value: string): TaskId {
    return new TaskId(value);
  }

  private validate(): void {
    if (!this.value?.trim()) {
      throw new MandatoryParameterException('value');
    }
  }
}
