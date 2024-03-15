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

import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { PomodoroRoundDto, PomodoroSessionDto } from './dto/timer.dto';
import { TimerService } from './timer.service';

@Controller('user/timer')
export class TimerController {
	constructor(private readonly timerService: TimerService) {}

	@Get('today')
	@HttpCode(HttpStatus.OK)
	@Auth()
	async getTodaySession(@GetUser('id') userId: string) {
		return this.timerService.getTodaySession(userId);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.CREATED)
	@Post()
	@Auth()
	async create(@GetUser('id') userId: string) {
		return this.timerService.create(userId);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.ACCEPTED)
	@Put('/round/:id')
	@Auth()
	async updateRound(@Param('id') id: string, @Body() dto: PomodoroRoundDto) {
		return this.timerService.updateRound(dto, id);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.ACCEPTED)
	@Put(':id')
	@Auth()
	async update(
		@Body() dto: PomodoroSessionDto,
		@GetUser('id') userId: string,
		@Param('id') id: string,
	) {
		return this.timerService.update(dto, id, userId);
	}

	@HttpCode(HttpStatus.ACCEPTED)
	@Delete(':id')
	@Auth()
	async deleteSession(@Param('id') id: string, @GetUser('id') userId: string) {
		return this.timerService.deleteSession(id, userId);
	}
}
