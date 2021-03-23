import { Injectable } from '@nestjs/common';
import { v1 as uuid} from 'uuid';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
  }

  create(title: string, description: string): Task {
    const task: Task = {
      title,
      description,
      id: uuid(),
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);
    return task;
  }
}
