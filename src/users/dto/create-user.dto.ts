//  DTO for validating User creation input
import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional() // means it’s not required, but allowed
  @IsString()
  phoneNumber?: string;

   role?: string;


}
