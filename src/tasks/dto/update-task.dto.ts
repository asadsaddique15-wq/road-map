import { IsString, IsOptional } from 'class-validator';

// 🟢 DTO for updating a Task
export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
