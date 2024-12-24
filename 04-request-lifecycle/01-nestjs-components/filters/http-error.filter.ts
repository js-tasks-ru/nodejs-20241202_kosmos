import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
import { error } from "console";
import { Response, Request } from "express";
import { appendFileSync } from "fs";

import { join } from "path";

export class HttpErrorFilter implements ExceptionFilter {
  filepath = join(process.cwd(), "errors.log");

  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const date = new Date().toISOString();

    let message = "";
    let status = 500;

    if (exception instanceof HttpException) {
      message = exception.message;
      status = exception.getStatus();
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    appendFileSync("errors.log", `[${date}] ${status} - ${message}\n`);

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: date,
      path: ctx.getRequest<Request>().originalUrl,
      error: exception instanceof HttpException ? exception.stack : null,
    });
  }
}
