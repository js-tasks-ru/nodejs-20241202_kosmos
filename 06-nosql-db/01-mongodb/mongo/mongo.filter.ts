import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import mongoose from "mongoose";

@Catch(mongoose.Error.ValidationError, mongoose.mongo.MongoError)
export class MongoFilter implements ExceptionFilter {
  catch(
    exception: mongoose.Error.ValidationError | mongoose.mongo.MongoError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = 400;

    response.status(status).json({
      message: exception.message,
      statusCode: 400,
      error: "Bad Request",
    });
  }
}
