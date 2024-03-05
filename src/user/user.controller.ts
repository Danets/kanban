import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';

@Controller('user/profile')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@Auth()
	getProfile(@GetUser('id') id: string) {
		return this.userService.getProfile(id);
	}

	@UsePipes(new ValidationPipe())
	@Put()
	@HttpCode(HttpStatus.ACCEPTED)
	@Auth()
	async update(@GetUser('id') id: string, @Body() dto: AuthDTO) {
		return this.userService.update(id, dto);
	}
}
