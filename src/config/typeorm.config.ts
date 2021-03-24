import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeConfigOrm: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'taskmanagement',
  autoLoadEntities: true,
  synchronize: true,
}