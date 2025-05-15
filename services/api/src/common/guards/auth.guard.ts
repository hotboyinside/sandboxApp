import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';
import { PUBLIC_KEY } from 'src/modules/auth/decorators/public.decorator';
import { UserService } from 'src/modules/users/users.service';
import { ms } from '../utils/units/ms';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) return true;

		const req = context.switchToHttp().getRequest<Request>();
		const res = context.switchToHttp().getResponse<Response>();

		const { accessToken, refreshToken } = req.signedCookies;
		if (!accessToken && !refreshToken) {
			return this.unauthorized(res, 'Tokens not found');
		}
		let payload = await this.authService.verifyToken(
			accessToken as string,
			'access',
		);
		if (!payload && refreshToken) {
			payload = await this.authService.verifyToken(
				refreshToken as string,
				'refresh',
			);
			if (payload) {
				return this.refreshAccessToken(req, res, payload.sub);
			}
		}

		if (!payload) {
			return this.unauthorized(res, 'Invalid tokens');
		}

		return this.validateUser(req, res, payload.sub);
	}

	private async refreshAccessToken(
		req: Request,
		res: Response,
		userId: number,
	) {
		const user = await this.userService.viewUser(userId);
		if (!user || user?.isBanned) {
			return this.unauthorized(res, user ? 'User is banned' : 'User not found');
		}

		const newAccessToken = await this.authService.generateAccessToken(
			this.authService.getPayload(user),
		);

		res.cookie('accessToken', newAccessToken, {
			...this.authService.cookieOptions,
			maxAge: ms(this.authService.jwtExpiresIn),
		});

		req.user = user;
		return true;
	}

	private async validateUser(req: Request, res: Response, userId: number) {
		const user = await this.userService.viewUser(userId);
		if (!user || user.isBanned) {
			return this.unauthorized(res, user ? 'User is banned' : 'User not found');
		}

		req.user = user;
		return true;
	}

	private unauthorized(res: Response, message: string): never {
		res.clearCookie('accessToken');
		res.clearCookie('refreshToken');
		throw new UnauthorizedException(message);
	}
}
