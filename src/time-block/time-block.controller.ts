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

import { TimeBlockService } from './time-block.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { TimeBlockDTO } from './dto/time-block.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('user/time-blocks')
export class TimeBlockController {
	constructor(private readonly timeBlockService: TimeBlockService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@Auth()
	async getAll(@GetUser('id') userId: string) {
		return this.timeBlockService.getAll(userId);
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(HttpStatus.CREATED)
	@Auth()
	async create(@Body() dto: TimeBlockDTO, @GetUser('id') userId: string) {
		return this.timeBlockService.create(dto, userId);
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(HttpStatus.ACCEPTED)
	@Auth()
	async update(
		@Body() dto: TimeBlockDTO,
		@Param('id') id: string,
		@GetUser('id') userId: string,
	) {
		return this.timeBlockService.update(dto, id, userId);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.ACCEPTED)
	@Auth()
	async delete(@Param('id') id: string, @GetUser('id') userId: string) {
		return this.timeBlockService.delete(id, userId);
	}

	@UsePipes(new ValidationPipe())
	@Put('update-order')
	@HttpCode(HttpStatus.ACCEPTED)
	@Auth()
	updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
		return this.timeBlockService.updateOrder(updateOrderDto.ids);
	}
}
