import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    console.log('In API Gateway: ' + exception);

    if (exception?.errorMessage) {
      status = exception.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.errorMessage;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'object' && res !== null) {
        // Handle ValidationPipe / BadRequestException response
        status = (res as any).statusCode ?? status;
        message = (res as any).message ?? exception.message;
      } else {
        message = exception.message;
      }
    } else {
      // ✅ Handle AggregateError (Promise.all / RxJS)
      const errors = exception.errors ?? [];
      message = errors.map((err: any) =>
        typeof err === 'string' ? err : err?.message ?? JSON.stringify(err)
      );
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
