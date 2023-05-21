import { TodolistException } from './todolist.exception';

export class MandatoryParameterException extends TodolistException {
  constructor(parameter: string) {
    super(`Parameter '${parameter}' is mandatory.`);
  }
}
