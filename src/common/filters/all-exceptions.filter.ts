// src/common/filters/all-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const resBody = exception.getResponse();

      // resBody might be a string or an object; normalize message
      let message: any;
      if (typeof resBody === 'string') message = resBody;
      else if (Array.isArray((resBody as any).message)) message = (resBody as any).message;
      else message = (resBody as any).message || resBody;

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: message,
      });
      return;
    }

    // Fallback for unexpected errors
    this.logger.error('Unexpected error', exception as any);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: 'Internal server error',
    });
  }
}
