import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks.model';
export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.OPEN])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}