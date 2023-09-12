import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator'

export class RegisterDto {

    @IsString()
    @MinLength(1)
    lastName: string

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    firstName: string

    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string
}