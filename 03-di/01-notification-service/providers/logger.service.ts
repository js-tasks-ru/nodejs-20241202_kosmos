import { Injectable } from "@nestjs/common";
import { appendFile } from "node:fs/promises";
import { join } from "node:path";

export interface ILogger {
  log(message: string): void;
}

@Injectable()
export class LoggerService implements ILogger {
  filepath = join(process.cwd(), "logs.txt");

  async log(message: string) {
    await appendFile(this.filepath, message + "\n", { encoding: "utf-8" });
  }
}
