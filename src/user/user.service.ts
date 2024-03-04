import { Injectable } from '@nestjs/common';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import * as argon from 'argon2';
import { startOfDay, subDays } from 'date-fns';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getById(id: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				tasks: true,
			},
		});

		return user;
	}

	async getByEmail(email: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		return user;
	}

	async register(dto: AuthDTO) {
		const hash = await argon.hash(dto.password);
		return this.prisma.user.create({
			data: {
				email: dto.email,
				name: '',
				password: hash,
			},
		});
	}

	async update(id: string, dto: AuthDTO) {
		let data = dto;
		if (dto.password) {
			data = { ...dto, password: await argon.hash(dto.password) };
		}
		return this.prisma.user.update({
			where: {
				id,
			},
			data,
		});
	}

	async getProfile(id: string) {
		const profile = await this.getById(id);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = profile;

		const totalTasks = profile.tasks.length;

		// Todo Task.servise
		const completedTasks = await this.prisma.task.count({
			where: {
				userId: id,
				isCompleted: true,
			},
		});

		const todayStart = startOfDay(new Date());
		const weekStart = startOfDay(subDays(new Date(), 7));

		const todayTasks = await this.prisma.task.count({
			where: {
				userId: id,
				createdAt: {
					gte: todayStart.toISOString(),
				},
			},
		});

		const weekTasks = await this.prisma.task.count({
			where: {
				userId: id,
				createdAt: {
					gte: weekStart.toISOString(),
				},
			},
		});

		return {
			user,
			statistics: [
				{ label: 'Total', value: totalTasks },
				{ label: 'Completed Tasks', value: completedTasks },
				{ label: 'Today Tasks', value: todayTasks },
				{ label: 'Week Tasks', value: weekTasks },
			],
		};
	}
}
