import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { UsersModule } from "../users/users.module";
import { NotificationService } from "../providers/NotificationService";
import { SenderEmail } from "../providers/sender-email.class";
import { SMSGateway } from "../providers/sms-getway.class";
import { LoggerService } from "../providers/logger.service";

@Module({
  imports: [UsersModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    LoggerService,
    {
      provide: NotificationService,
      useFactory: (loggerService: LoggerService) => {
        return new NotificationService(
          new SenderEmail(loggerService),
          new SMSGateway(loggerService),
        );
      },
      inject: [LoggerService],
    },
  ],
})
export class TasksModule {}
