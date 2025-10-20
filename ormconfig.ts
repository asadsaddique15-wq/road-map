import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';
import { Task } from './src/tasks/task.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.DB_PASSWORD,
  database: 'roadmap', //'roadmap' database that you created in the PGADMIN4
  entities: [User, Task],
  migrations: ['src/migrations/*.ts'],
  synchronize: true, 
});
