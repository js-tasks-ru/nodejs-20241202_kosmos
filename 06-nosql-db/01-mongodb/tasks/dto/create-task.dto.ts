import { BlobOptions } from "buffer";
import { IsBoolean, IsString, IsOptional } from "class-validator";

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;
}
