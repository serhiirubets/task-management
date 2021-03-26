import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-dash.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
    ) {}

  async getById(id: number, user: User): Promise<Task>  {
    const found = await this.taskRepository.findOne({
      where: {
        id,
        userId: user.id
      }
    });

    if (!found) {
      throw new NotFoundException(`Task with id: '${id}' not found`);
    }

    return found
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }


  create(taskData: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(taskData, user);
  }

  async delete(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: '${id}' not found`);
    }
  }

  async updateStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
