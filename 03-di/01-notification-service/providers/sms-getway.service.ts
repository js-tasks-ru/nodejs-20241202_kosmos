import { Injectable } from "@nestjs/common";

@Injectable()
export class SMSGatewayService {
  sendSMS(to: string, message: string) {
    console.log(`SMS sent to ${to}: ${message}`);
  }
}
