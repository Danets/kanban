import { Injectable } from '@nestjs/common';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import * as argon from 'argon2';

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
}
