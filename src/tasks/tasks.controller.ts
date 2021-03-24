import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-dash.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {

  }

  @Get('/:id')
  getById(@Param('id') id: string): Task {
    return this.taskService.getById(id);
  }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] { 
    if (Object.keys(filterDto).length) {
      return this.taskService.getFilteredTasks(filterDto);
    }
    return this.taskService.getAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() task: CreateTaskDto) {    
    return this.taskService.create(task);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }

  @Patch('/:id/status')
  updateStatus(@Param('id') id, @Body('status', TaskStatusValidationPipe) status) {
    return this.taskService.updateStatus(id, status)
  }
}
