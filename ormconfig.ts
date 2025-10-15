import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';
import { Task } from './src/tasks/task.entity';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',        // your pgAdmin username
  password: 's3tc#CYD',        // your actual password
  database: 'task_manager_db', // your database
  entities: [User, Task],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
