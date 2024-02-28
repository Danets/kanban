import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDTO {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@MinLength(6, { message: 'Password must contains at least 6 characters' })
	@IsString()
	@IsNotEmpty()
	password: string;
}
