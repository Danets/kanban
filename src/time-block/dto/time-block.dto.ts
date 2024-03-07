import { IsOptional, IsString, IsNumber } from 'class-validator';

export class TimeBlockDTO {
	@IsString()
	name: string;

	@IsString()
	@IsOptional()
	color?: string;

	@IsNumber()
	duration: number;

	@IsNumber()
	order: number;
}
