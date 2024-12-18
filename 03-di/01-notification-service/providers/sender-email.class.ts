import { ILogger } from "./logger.service";

export class SenderEmail {
  constructor(private readonly logger: ILogger) {}
  sendEmail(to: string, subject: string, message: string) {
    console.log(`Email sent to ${to}: [${subject}] ${message}`);

    this.logger.log(`Email sent to ${to}: [${subject}] ${message}`);
  }
}
