import { IsString, IsEmail, Length} from "class-validator";
export class CreateUserDto {
    @IsString()
    name : string;

    @IsEmail()
    email : string;

    @Length(8)
    password : string;
    
}