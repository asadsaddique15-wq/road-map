import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { UploadModule } from './uploads/uploads.module';

import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({ isGlobal: true }),

    // PostgreSQL configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        // Production (Render / Railway)
        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            autoLoadEntities: true,
            synchronize: true,
            ssl: { rejectUnauthorized: false },
          };
        }

        // Local setup
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<string>('DB_PORT')),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [User, Task],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),

    
    // Import feature modules
    UsersModule,
    TasksModule,
    AuthModule,
    EmailModule,
    UploadModule,
     // handles scheduled & background jobs
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
