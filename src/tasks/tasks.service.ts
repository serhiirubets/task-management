import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid} from 'uuid';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-dash.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getById(id: string): Task  {
    const found = this.tasks.find(task => task.id === id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  getAll(): Task[] {
    return this.tasks;
  }

  getFilteredTasks(filter: GetTasksFilterDto): Task[] {
    let { search, status } = filter;

    let tasks = this.getAll();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      search = search.toLocaleLowerCase();
      tasks = tasks.filter(
        ({ title, description }) => 
          title.toLocaleLowerCase().includes(search)
          || description.toLowerCase().includes(search)
      );
    }

    return tasks;
  }

  create(taskData: CreateTaskDto): Task {
    const task: Task = {
      title: taskData.title,
      description: taskData.description,
      id: uuid(),
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);
    return task;
  }

  delete(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    return id;
  }

  updateStatus(id: string, status: TaskStatus): Task {
    const task = this.getById(id);
    task.status = status;
    return task;
  }
}
