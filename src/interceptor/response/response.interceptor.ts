import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseBody> {
    const res = context.switchToHttp().getResponse<Response>();
    const req = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      map((data) => ({
        error: '',
        statusCode: res.statusCode,
        timestamp: new Date().toISOString(),
        success: true,
        path: req.path,
        status: 'Success',
        data,
      })),
    );
  }
}
