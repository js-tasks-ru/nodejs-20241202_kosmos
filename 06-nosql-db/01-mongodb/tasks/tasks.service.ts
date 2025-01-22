import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "./schemas/task.schema";
import { Model, ObjectId } from "mongoose";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private TaskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.TaskModel(createTaskDto);
    return newTask.save();
  }

  async findAll() {
    return this.TaskModel.find({}).exec();
  }

  async findOne(id: ObjectId) {
    const taskById = await this.TaskModel.findById(id).exec();

    if (!taskById) {
      throw new NotFoundException("Task not found");
    }

    return taskById;
  }

  async update(id: ObjectId, updateTaskDto: UpdateTaskDto) {
    const taskById = await this.findOne(id);

    const updatedTask = Object.assign(taskById, updateTaskDto);

    return updatedTask.save();
  }

  async remove(id: ObjectId) {
    const removed = await this.TaskModel.findByIdAndDelete(id).exec();

    if (!removed) {
      throw new NotFoundException("Task not found");
    }

    return removed;
  }
}
