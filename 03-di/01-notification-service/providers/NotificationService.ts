import { Injectable } from "@nestjs/common";
import { SenderEmailService } from "./sender-email.service";
import { SMSGatewayService } from "./sms-getway.service";
import { LoggerService } from "./logger.service";

@Injectable()
export class NotificationService {
  constructor(
    private readonly senderEmail: SenderEmailService,
    private readonly smsGateway: SMSGatewayService,
    private readonly logger: LoggerService,
  ) {}
  sendEmail(to: string, subject: string, message: string) {
    this.senderEmail.sendEmail(to, subject, message);
    this.logger.log(
      `[${new Date().toISOString()}] Email sent to ${to}: [${subject}] ${message}`,
    );
  }

  sendSMS(to: string, message: string) {
    this.smsGateway.sendSMS(to, message);

    this.logger.log(
      `[${new Date().toISOString()}] SMS sent to ${to}: ${message}`,
    );
  }
}
