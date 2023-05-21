import { TaskId } from '@/domain/model/task/task-id.vo';
import { State } from '@/domain/model/shared/state.enum';
import { Task, TaskBuilder } from '@/domain/model/task/task.entity';
import { MandatoryParameterException } from '@/domain/model/exception/mandatory-parameter.exception';

describe('Task', () => {
  const taskId = TaskId.generate();
  const title = 'title';
  const dueDate = new Date();
  const state = State.COMPLETED;
  const description = 'description';
  let taskBuilder: TaskBuilder;

  beforeEach(() => {
    taskBuilder = new TaskBuilder()
      .id(taskId)
      .title(title)
      .description(description)
      .dueDate(dueDate)
      .state(state);
  });

  it('should create task when not contains empty properties', () => {
    const task: Task = taskBuilder.build();

    expect(task.id).toBe(taskId);
    expect(task.title).toBe(title);
    expect(task.description).toBe(description);
    expect(task.dueDate).toBe(dueDate);
    expect(task.state).toBe(state);
  });

  it('should throw an error when title is empty', () => {
    expect(() => taskBuilder.title('').build()).toThrow(
      MandatoryParameterException,
    );
  });

  it('should throw an error when title contains empty spaces', () => {
    expect(() => taskBuilder.title(' ').build()).toThrow(
      MandatoryParameterException,
    );
  });

  it('should throw an error when description is empty', () => {
    expect(() => taskBuilder.description('').build()).toThrow(
      MandatoryParameterException,
    );
  });

  it('should throw an error when description contains empty spaces', () => {
    expect(() => taskBuilder.description(' ').build()).toThrow(
      MandatoryParameterException,
    );
  });
});
