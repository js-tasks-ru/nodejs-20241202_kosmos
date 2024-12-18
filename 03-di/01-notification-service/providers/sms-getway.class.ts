import { ILogger } from "./logger.service";

export class SMSGateway {
  constructor(private logger: ILogger) {}

  sendSMS(to: string, message: string) {
    console.log(`SMS sent to ${to}: ${message}`);

    this.logger.log(`SMS sent to ${to}: ${message}`);
  }
}
