import { State } from '@/domain/model/shared/state.enum';
import { MandatoryParameterException } from '@/domain/model/exception/mandatory-parameter.exception';
import {
  CreateTaskParams,
  CreateTaskParamsBuilder,
} from '@/application/usecase/create/create-task.params';

describe('CreateTaskParams', () => {
  const title = 'title';
  const dueDate = new Date();
  const state = State.COMPLETED;
  const description = 'description';
  let createTaskParamsBuilder: CreateTaskParamsBuilder;

  beforeEach(() => {
    createTaskParamsBuilder = new CreateTaskParamsBuilder()
      .title(title)
      .description(description)
      .dueDate(dueDate)
      .state(state);
  });

  it('should create params when not contains empty properties', () => {
    const createTaskParams: CreateTaskParams = createTaskParamsBuilder.build();

    expect(createTaskParams.title).toBe(title);
    expect(createTaskParams.description).toBe(description);
    expect(createTaskParams.dueDate).toBe(dueDate);
    expect(createTaskParams.state).toBe(state);
  });

  it('should throw an error when title is empty', () => {
    expect(() => createTaskParamsBuilder.title('').build()).toThrow(
      MandatoryParameterException,
    );
  });

  it('should throw an error when title contains empty spaces', () => {
    expect(() => createTaskParamsBuilder.title(' ').build()).toThrow(
      MandatoryParameterException,
    );
  });

  it('should throw an error when description is empty', () => {
    expect(() => createTaskParamsBuilder.description('').build()).toThrow(
      MandatoryParameterException,
    );
  });

  it('should throw an error when description contains empty spaces', () => {
    expect(() => createTaskParamsBuilder.description(' ').build()).toThrow(
      MandatoryParameterException,
    );
  });
});
