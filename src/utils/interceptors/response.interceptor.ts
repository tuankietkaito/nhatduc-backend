import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpStatus
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  statusCode: number;
  message: string;
  payload: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const request = context.switchToHttp().getResponse();
    Logger.log(`${request.req.method}  ${request.req.url}`);
    const statusCode = request.statusCode;
    const statusMessage = Object.keys(HttpStatus)[Object.values(HttpStatus).indexOf(statusCode)];
    return next.handle().pipe(
      map((data) => ({
        success: true,
        statusCode: statusCode,
        message: statusMessage.split('_').join(' '),
        payload: data
      }))
    );
  }
}
