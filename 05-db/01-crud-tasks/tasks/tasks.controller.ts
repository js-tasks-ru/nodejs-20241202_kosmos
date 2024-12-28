import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksQueryParams } from "./dto/tasks.query-params";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.tasksService.create(dto);
    return newTask;
  }

  @Get()
  async findAll(@Query() tasksQueryParams: TasksQueryParams) {
    const { page = 0, limit = 100 } = tasksQueryParams;
    return this.tasksService.findAll(page, limit);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.tasksService.findOne(id);
  }

  @Patch(":id")
  async update(@Param("id") id: number, @Body() updateTaskDTO) {
    return this.tasksService.update(id, updateTaskDTO);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.tasksService.remove(id);
  }
}
