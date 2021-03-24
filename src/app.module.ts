import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { typeConfigOrm } from './config/typeorm.config';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(typeConfigOrm)],
})
export class AppModule {}
