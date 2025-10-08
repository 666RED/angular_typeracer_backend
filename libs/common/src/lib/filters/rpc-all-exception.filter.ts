import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError, Observable } from 'rxjs';

interface ExceptionResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  errorMessage: string;
}

@Catch()
export class RpcAllExceptionFilter implements RpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToRpc();

    let statusCode = 500;
    let message = 'Internal server error';

    console.log('In RPC: ' + exception);

    if (exception instanceof RpcException) {
      const error = exception.getError();
      if (typeof error === 'object' && error !== null) {
        statusCode = (error as any).statusCode ?? 500;
        message = (error as any).message ?? message;
      } else {
        message = String(error);
      }
    } else if (exception instanceof Error) {
      // HttpExceptions have getStatus()
      if ('getStatus' in exception) {
        statusCode = (exception as any).getStatus?.() ?? 500;
      }
      message = exception.message;
    }

    const errorResponse: ExceptionResponse = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: ctx.getContext().args[2] as string,
      errorMessage: message,
    };

    return throwError(() => errorResponse);
  }
}
