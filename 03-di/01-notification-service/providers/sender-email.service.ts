import { Injectable } from "@nestjs/common";

@Injectable()
export class SenderEmailService {
  sendEmail(to: string, subject: string, message: string) {
    console.log(`Email sent to ${to}: [${subject}] ${message}`);
  }
}
