import { Sort } from '../../shared/order.filter';
import { State } from '../../shared/state.enum';
import { TaskId } from '../task-id.vo';
import { Task } from '../task.entity';

export interface TaskRepository {
  findAll(state?: State, sort?: Sort): Promise<Task[]>;

  save(task: Task): Promise<Task>;

  update(task: Task): Promise<Task>;

  delete(taskId: TaskId): void;

  findById(taskId: TaskId): Promise<Task | null>;
}
