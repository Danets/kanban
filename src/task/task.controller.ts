import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';

import { TaskService } from './task.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { TaskDTO } from './dto/task.dto';

@Controller('user/tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@Auth()
	async getAll(@GetUser('id') userId: string) {
		return this.taskService.getAll(userId);
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(HttpStatus.CREATED)
	@Auth()
	async create(@Body() dto: TaskDTO, @GetUser('id') userId: string) {
		return this.taskService.create(dto, userId);
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(HttpStatus.ACCEPTED)
	@Auth()
	async update(
		@Body() dto: TaskDTO,
		@Param('id') taskId: string,
		@GetUser('id') userId: string,
	) {
		return this.taskService.update(dto, taskId, userId);
	}

	@UsePipes(new ValidationPipe())
	@Delete(':id')
	@HttpCode(HttpStatus.ACCEPTED)
	@Auth()
	async delete(@Param('id') taskId: string) {
		return this.taskService.delete(taskId);
	}
}
