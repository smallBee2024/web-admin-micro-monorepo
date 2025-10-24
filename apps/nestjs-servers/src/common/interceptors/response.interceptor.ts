import { NestInterceptor, CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs'; // 这是一个类型，表示一个可观察对象
import { map } from 'rxjs/operators';


interface Data<T> {
  code: number;
  message: string;
  data: T;
}

/**
 * 响应拦截器
 * 用于处理响应数据
 * 可以用于处理响应数据，如添加响应头，添加响应体等
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map(data => {
        return {
          code: 200,
          message: 'success',
          data,
        };
      }),
    );
  }
}