import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { IRequest } from 'src/common/interfaces/request.interface';
import { ms } from 'src/common/utils/units/ms';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login-auth.dto';
import { LoginSteamDto } from './dto/login-steam-auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('login')
	async login(@Body() loginDto: LoginDto, @Res() res: Response) {
		const { accessToken, refreshToken, userData } =
			await this.authService.login(loginDto);
		res.cookie('accessToken', accessToken, {
			...this.authService.cookieOptions,
			maxAge: ms(this.authService.jwtExpiresIn),
		});
		res.cookie('refreshToken', refreshToken, {
			...this.authService.cookieOptions,
			maxAge: ms(this.authService.jwtRefreshExpiresIn),
		});

		return res.json({ message: 'Login successful', userData });
	}

	@Public()
	@Post('login-steam')
	async loginWithSteam(
		@Body() loginSteamDto: LoginSteamDto,
		@Res() res: Response,
	) {
		const user = await this.authService.loginWithSteam(loginSteamDto);
		return res.json({ message: 'Login successful', userData: user });
	}

	@Post('logout')
	logout(@Res() res: Response) {
		res.clearCookie('accessToken');
		res.clearCookie('refreshToken');
		return res.json({ message: 'Logout successful' });
	}

	@Get('verify')
	verifyToken(@Req() req: IRequest, @Res() res: Response) {
		return res.json({ message: 'Verify successful', role: req.user.role });
	}
}
