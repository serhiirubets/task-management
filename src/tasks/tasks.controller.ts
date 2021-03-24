import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-dash.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {

  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getById(id);
  }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> { 
    return this.taskService.getTasks(filterDto); 
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() task: CreateTaskDto) {    
    return this.taskService.create(task);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.delete(id);
  }

  @Patch('/:id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status): Promise<Task> {
    return this.taskService.updateStatus(id, status)
  }
}
