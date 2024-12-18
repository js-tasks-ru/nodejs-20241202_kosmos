import { Injectable } from "@nestjs/common";
import { SenderEmail } from "./sender-email.class";
import { SMSGateway } from "./sms-getway.class";

@Injectable()
export class NotificationService {
  constructor(
    private readonly senderEmail: SenderEmail,
    private readonly smsGateway: SMSGateway,
  ) {}
  sendEmail(to: string, subject: string, message: string) {
    this.senderEmail.sendEmail(to, subject, message);
  }

  sendSMS(to: string, message: string) {
    this.smsGateway.sendSMS(to, message);
  }
}
