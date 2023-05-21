import { TodolistException } from './todolist.exception';

export class InvalidParameterException extends TodolistException {
  constructor(parameter: string) {
    super(`Parameter '${parameter}' is not valid.`);
  }
}
