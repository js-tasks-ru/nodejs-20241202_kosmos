import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, EntityNotFoundError, Repository } from "typeorm";
import { Task } from "./entities/task.entity";
import { retry } from "rxjs";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(createTaskDto);
  }

  async findAll(page: number, limit: number) {
    return this.taskRepository.find({ skip: (page - 1) * limit, take: limit });
  }

  async findOne(id: number) {
    try {
      const entity = await this.taskRepository.findOneByOrFail({ id });
      return entity;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException("Task not found");
      } else {
        throw e;
      }
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    return this.taskRepository.remove([task]);
  }
}
