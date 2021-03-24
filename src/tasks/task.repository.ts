import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-dash.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./tasks.model";
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(taskData: CreateTaskDto): Promise<Task> {
      const task = new Task();

      task.title = taskData.title;
      task.description = taskData.description;
      task.status = TaskStatus.OPEN;

      await task.save();
      return task;
  }
}