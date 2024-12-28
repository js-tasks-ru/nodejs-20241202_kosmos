import { IsOptional, IsPositive } from "class-validator";

export class TasksQueryParams {
  @IsOptional()
  @IsPositive()
  page: number;

  @IsOptional()
  @IsPositive()
  limit: number;
}
