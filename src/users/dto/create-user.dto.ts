import { IsEmail, IsNotEmpty, IsString , IsNumber} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsNumber()
    @IsNotEmpty()
    employeeId: Number;

    @IsNotEmpty()
    password: string;
}