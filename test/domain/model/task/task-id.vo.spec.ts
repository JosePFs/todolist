import { TaskId } from '@/domain/model/task/task-id.vo';
import { MandatoryParameterException } from '@/domain/model/exception/mandatory-parameter.exception';

describe('TaskId', () => {
  it('should generate task id', () => {
    const taskId = TaskId.generate();

    expect(taskId.value).not.toBeNull();
  });

  it('should create task id from string', () => {
    const taskId = TaskId.fromString('6c5af35a-ee2b-42bd-af78-9ed458bed0ce');

    expect(taskId.value).toBe('6c5af35a-ee2b-42bd-af78-9ed458bed0ce');
  });

  it('should throw an error when value is empty', () => {
    expect(() => TaskId.fromString('')).toThrow(MandatoryParameterException);
  });

  it('should throw an error when value constains empty spaces', () => {
    expect(() => TaskId.fromString(' ')).toThrow(MandatoryParameterException);
  });
});
