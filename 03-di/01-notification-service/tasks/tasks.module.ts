import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { UsersModule } from "../users/users.module";
import { NotificationService } from "../providers/NotificationService";

import { LoggerService } from "../providers/logger.service";
import { SenderEmailService } from "../providers/sender-email.service";
import { SMSGatewayService } from "../providers/sms-getway.service";

@Module({
  imports: [UsersModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    LoggerService,
    SenderEmailService,
    SMSGatewayService,
    NotificationService,
  ],
})
export class TasksModule {}
