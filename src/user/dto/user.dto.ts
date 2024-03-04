import {
	IsOptional,
	Max,
	Min,
	IsNumber,
	IsString,
	IsEmail,
	MinLength,
} from 'class-validator';

export class PomodoroSettingsDTO {
	@IsOptional()
	@IsNumber()
	@Min(1)
	workInterval?: number;

	@IsOptional()
	@IsNumber()
	@Min(1)
	breaInterval?: number;

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(10)
	intervalCount?: number;
}

export class UserDTO extends PomodoroSettingsDTO {
	@IsEmail()
	@IsOptional()
	email?: string;

	@IsString()
	@IsOptional()
	name?: string;

	@MinLength(6, { message: 'Password must contains at least 6 characters' })
	@IsString()
	@IsOptional()
	password?: string;
}
