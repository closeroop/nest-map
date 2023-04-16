import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost, AbstractHttpAdapter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    const httpAdapter: AbstractHttpAdapter<any, ResponseBody, number> =
      this.httpAdapterHost.httpAdapter;
    const ctx = host.switchToHttp();
    const insFlag = exception instanceof HttpException;
    const httpStatus = insFlag
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const error = insFlag ? exception.message : 'service exception';

    console.log(exception);

    const responseBody: ResponseBody = {
      error,
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      success: false,
      status: 'Fail',
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
