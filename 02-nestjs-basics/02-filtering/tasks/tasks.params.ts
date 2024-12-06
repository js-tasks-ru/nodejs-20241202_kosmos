import { Optional } from "@nestjs/common";
import { IsEnum, IsIn, IsOptional, IsPositive } from "class-validator";
import { Task, TaskStatus } from "./task.model";

const taskKeys: (keyof Task)[] = ["id", "title", "description", "status"];

export class TasksQueryParams {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsIn(taskKeys)
  sortBy?: keyof Task;
}
