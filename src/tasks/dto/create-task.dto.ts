//  DTO for validating Task creation input
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  userId: number; // Link to a User
}
