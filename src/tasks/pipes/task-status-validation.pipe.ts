import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly alloswedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_PROGRESS
  ];

  private isStatusValid(status) {
    return this.alloswedStatuses.includes(status);
  }

  transform(value: string) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is invalid status`);
    }
    return value;
  }
  
}