import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map, Observable, of } from "rxjs";

export class ApiVersionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = new Date();
    return next.handle().pipe(
      map((data) => ({
        ...data,
        apiVersion: "1.0",
        executionTime: new Date().valueOf() - start.valueOf() + "ms",
      })),
    );
  }
}
