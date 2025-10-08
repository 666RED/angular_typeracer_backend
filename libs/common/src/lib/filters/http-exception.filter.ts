import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface Exception {
  error?: string;
  statusCode?: number;
  message?: string | string[];
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as Partial<Exception>;
    const errorMessage = () => {
      const { message } = exceptionResponse;

      if (!message) {
        return exception.message || 'An unknown error occurred.';
      }

      if (Array.isArray(message)) {
        //@ Deduplicate, trim, and format messages nicely
        const uniqueMessages = [...new Set(message.map((m) => m.trim()))];
        return uniqueMessages.join('; ');
      }

      if (typeof message === 'string') {
        return message.trim();
      }

      //@ Fallback if message is neither string nor array
      return exception.message || 'Unexpected error format.';
    };

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errorMessage: errorMessage(),
    });
  }
}
