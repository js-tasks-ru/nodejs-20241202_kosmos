import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import { UsersService } from "../users/users.service";
import { NotificationService } from "../providers/NotificationService";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;
    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };
    this.tasks.push(task);

    if (task.assignedTo) {
      const user = this.usersService.getUserById(task.assignedTo);
      this.notificationService.sendEmail(
        user.email,
        "Новая задача",
        `Вы назначены ответственным за задачу: "${task.title}"`,
      );
    }

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    Object.assign(task, updateTaskDto);

    if (task.assignedTo) {
      const user = this.usersService.getUserById(task.assignedTo);
      this.notificationService.sendSMS(
        user.phone,
        `Статус задачи "${task.title}" обновлён на "${task.status}"`,
      );
    }
    return task;
  }
}
