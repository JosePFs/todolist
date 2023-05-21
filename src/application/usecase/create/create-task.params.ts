import { State } from '@/api/shared/state.enum';
import { InvalidParameterException } from '@/domain/model/exception/invalid-parameter.exception';
import { MandatoryParameterException } from '@/domain/model/exception/mandatory-parameter.exception';

export type CreateTaskParams = {
  title: string;
  description: string;
  dueDate: Date;
  state: State;
};

class CreateTaskParamsImpl implements CreateTaskParams {
  public constructor(
    readonly title: string,
    readonly description: string,
    readonly dueDate: Date,
    readonly state: State = State.NON_COMPLETED,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.title?.trim()) {
      throw new MandatoryParameterException('title');
    }
    if (!this.description?.trim()) {
      throw new MandatoryParameterException('description');
    }
    if (!this.dueDate) {
      throw new MandatoryParameterException('dueDate');
    }
    if (this.state?.trim() && !(this.state in State)) {
      throw new InvalidParameterException('state');
    }
  }
}

export class CreateTaskParamsBuilder {
  private _title: string;

  private _description: string;

  private _dueDate: Date;

  private _state: State = State.NON_COMPLETED;

  constructor() {
    this.reset();
  }

  public reset() {
    this._state = State.NON_COMPLETED;
  }

  public title(title: string): CreateTaskParamsBuilder {
    this._title = title;
    return this;
  }

  public description(description: string): CreateTaskParamsBuilder {
    this._description = description;
    return this;
  }

  public dueDate(dueDate: Date): CreateTaskParamsBuilder {
    this._dueDate = dueDate;
    return this;
  }

  public state(state: State): CreateTaskParamsBuilder {
    if (state) {
      this._state = state;
    }
    return this;
  }

  public build(): CreateTaskParams {
    const createTaskParms = new CreateTaskParamsImpl(
      this._title,
      this._description,
      this._dueDate,
      this._state,
    );
    this.reset();
    return createTaskParms;
  }
}
