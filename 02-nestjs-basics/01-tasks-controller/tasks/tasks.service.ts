import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";
import { v4 as uuidv4 } from "uuid";
import { UpdateTaskDTO } from "./dto/update-task.dto";
import { CreateTaskDTO } from "./dto/create-task.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new HttpException("Task not found", 404);
    }
    return task;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const task: Task = { id: uuidv4(), ...createTaskDTO };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, update: UpdateTaskDTO): Task {
    const taskById = this.getTaskById(id);

    const updatedTask: Task = { ...taskById, ...update };

    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return updatedTask;
      }
      return task;
    });

    return updatedTask;
  }

  deleteTask(id: string): Task {
    const taskById = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return taskById;
  }
}
