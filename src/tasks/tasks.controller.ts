import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {

  }

  @Get()
  getAll(): Task[] { 
    return this.taskService.getAll();
  }

  @Post()
  create(@Body() body: Task) {    
    return this.taskService.create(body.title, body.description);
  }
}
