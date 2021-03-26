import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-dash.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./tasks.model";
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
import { InternalServerErrorException, Logger } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch(error) {
      this.logger.error(`Failed to get task for user: ${user.username}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createTask(taskData: CreateTaskDto, user: User): Promise<Task> {
      const task = new Task();

      task.title = taskData.title;
      task.description = taskData.description;
      task.status = TaskStatus.OPEN;
      task.user = user;
 
      await task.save();
      delete task.user;
      return task;
  }
}