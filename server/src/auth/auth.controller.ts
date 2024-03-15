import {
	Controller,
	Post,
	Body,
	HttpCode,
	HttpStatus,
	UsePipes,
	ValidationPipe,
	Res,
	UnauthorizedException,
	Req,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(
		@Body() dto: AuthDTO,
		@Res({ passthrough: true }) res: Response,
	) {
		const { refresh_token, ...response } = await this.authService.register(dto);
		this.authService.addRefreshTokenToResponse(res, refresh_token);
		return response;
	}

	@UsePipes(new ValidationPipe())
	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() dto: AuthDTO, @Res({ passthrough: true }) res: Response) {
		const { refresh_token, ...response } = await this.authService.login(dto);
		this.authService.addRefreshTokenToResponse(res, refresh_token);
		return response;
	}

	@Post('login/access-token')
	@HttpCode(HttpStatus.OK)
	async getNewTokens(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const refreshTokenFromCookies =
			req.cookies[this.authService.REFRESH_TOKEN_NAME];

		if (!refreshTokenFromCookies) {
			this.authService.removeRefreshTokenFromResponse(res);
			throw new UnauthorizedException('Refresh token is not passed!');
		}

		const { refresh_token, ...response } = await this.authService.getNewTokens(
			refreshTokenFromCookies,
		);
		this.authService.addRefreshTokenToResponse(res, refresh_token);
		return response;
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Res({ passthrough: true }) res: Response) {
		this.authService.removeRefreshTokenFromResponse(res);
		return true;
	}
}
