import { TodolistException } from '@/domain/model/exception/todolist.exception';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(TodolistException)
export class TodolistExceptionFilter implements ExceptionFilter {
  catch(exception: TodolistException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [exception.message],
      error: 'Bad Request',
    });
  }
}
