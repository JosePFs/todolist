import { TaskId } from './task-id.vo';
import { MandatoryParameterException } from '../exception/mandatory-parameter.exception';
import { State } from '../shared/state.enum';

export type Task = {
  id: TaskId;
  title: string;
  description: string;
  dueDate: Date;
  state: State;
};

class TaskEntity implements Task {
  public constructor(
    readonly id: TaskId,
    readonly title: string,
    readonly description: string,
    readonly dueDate: Date,
    readonly state: State,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.id) {
      throw new MandatoryParameterException('id');
    }
    if (!this.title?.trim()) {
      throw new MandatoryParameterException('title');
    }
    if (!this.description?.trim()) {
      throw new MandatoryParameterException('description');
    }
    if (!this.dueDate) {
      throw new MandatoryParameterException('dueDate');
    }
    if (!this?.state) {
      throw new MandatoryParameterException('state');
    }
  }
}

export class TaskBuilder {
  private _id: TaskId;

  private _title: string;

  private _description: string;

  private _dueDate: Date;

  private _state: State;

  constructor() {
    this.reset();
  }

  public reset() {
    this._id = TaskId.generate();
  }

  public id(id: TaskId): TaskBuilder {
    this._id = id;
    return this;
  }

  public title(title: string): TaskBuilder {
    this._title = title;
    return this;
  }

  public description(description: string): TaskBuilder {
    this._description = description;
    return this;
  }

  public dueDate(dueDate: Date): TaskBuilder {
    this._dueDate = dueDate;
    return this;
  }

  public state(state: State): TaskBuilder {
    this._state = state;
    return this;
  }

  public build(): Task {
    const task = new TaskEntity(
      this._id,
      this._title,
      this._description,
      this._dueDate,
      this._state,
    );
    this.reset();
    return task;
  }
}
