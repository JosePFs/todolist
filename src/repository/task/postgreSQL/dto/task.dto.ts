import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
export class TaskDto {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  readonly title: string;

  @Column()
  readonly description: string;

  @Column()
  readonly dueDate: Date;

  @Column()
  readonly state: string;

  constructor(
    id: string,
    title: string,
    description: string,
    dueDate: Date,
    state: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.state = state;
  }
}
