import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as argon from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthDTO } from './dto/auth.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
	EXPIRE_DAY_REFRESH_TOKEN = 1;
	REFRESH_TOKEN_NAME = 'refreshToken';

	constructor(
		private prisma: PrismaService,
		private userService: UserService,
		private jwt: JwtService,
		private config: ConfigService,
	) {}

	async register(dto: AuthDTO) {
		const userIsExist = await this.userService.getByEmail(dto.email);

		if (userIsExist) throw new BadRequestException('User already exists!');

		const newUser = await this.userService.register(dto);

		delete newUser.password;

		const tokens = this.generateTokens(newUser.id);

		return {
			newUser,
			...tokens,
		};
	}

	async login(dto: AuthDTO) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = await this.validateUser(dto);
		const tokens = this.generateTokens(user.id);

		return {
			user,
			...tokens,
		};
	}

	private generateTokens(userId: string) {
		const data = { id: userId };

		const access_token = this.jwt.sign(data, {
			expiresIn: '1h',
		});

		const refresh_token = this.jwt.sign(data, {
			expiresIn: '7d',
		});

		return {
			access_token,
			refresh_token,
		};
	}

	private async validateUser(dto: AuthDTO) {
		const user = await this.userService.getByEmail(dto.email);

		if (!user) throw new NotFoundException('User is not found!');

		const isValid = await argon.verify(user.password, dto.password);

		if (!isValid) throw new UnauthorizedException('Password is not valid!');

		return user;
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expireIn = new Date();
		expireIn.setDate(expireIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			expires: expireIn,
			httpOnly: true,
			domain: 'localhost',
			secure: true,
			// lax for Production
			sameSite: 'none',
		});
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			expires: new Date(0),
			httpOnly: true,
			domain: 'localhost',
			secure: true,
			// lax for Production
			sameSite: 'none',
		});
	}

	async getNewTokens(refreshToken: string) {
		const token = await this.jwt.verifyAsync(refreshToken);
		if (!token) throw new UnauthorizedException('Invalid refresh token');

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = await this.userService.getById(token);

		const tokens = this.generateTokens(user.id);

		return {
			user,
			...tokens,
		};
	}
}
