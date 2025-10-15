import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',           // your local DB host
      port: 5432,                  // default PostgreSQL port
      username: 'postgres',        // your pgAdmin username
      password: 's3tc#CYD',        // this is your actual password
      database: 'task_manager_db', // your existing database name
      entities: [User, Task],      // your entities
      synchronize: false,           // auto-create tables 
         migrations: ['dist/migrations/*.js'],
      migrationsRun: true,  // automatically runs pending migrations on startup
      
    }),
    UsersModule,
    TasksModule,
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
