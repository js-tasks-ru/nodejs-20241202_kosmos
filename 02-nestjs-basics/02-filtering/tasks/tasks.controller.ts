import { Controller, Get, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task.model";
import { TasksQueryParams } from "./tasks.params";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query() query: TasksQueryParams) {
    const { status, page, limit, sortBy } = query;

    return this.tasksService.getFilteredTasks(status, page, limit, sortBy);
  }
}
