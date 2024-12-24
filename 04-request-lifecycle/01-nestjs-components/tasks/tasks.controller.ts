import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, UpdateTaskDto } from "./task.model";
import { ParseIntPipe } from "../pipes/parse-int.pipe";
import { RolesGuard } from "../guards/roles.guard";
import { ApiVersionInterceptor } from "../interceptors/api-version.interceptor";

@UseInterceptors(ApiVersionInterceptor)
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id);
  }

  @UseGuards(RolesGuard)
  @Post()
  createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Patch(":id")
  updateTask(
    @Param("id", ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, task);
  }

  @UseGuards(RolesGuard)
  @Delete(":id")
  deleteTask(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
