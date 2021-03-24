import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-dash.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
    ) {}

  async getById(id: number): Promise<Task>  {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with id: '${id}' not found`);
    }

    return found
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }


  create(taskData: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(taskData);
  }

  async delete(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: '${id}' not found`);
    }
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
