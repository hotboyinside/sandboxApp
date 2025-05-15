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
import {
	ERROR_INVALID_TOKEN,
	ERROR_TOKENS_NOT_FOUND,
	ERROR_USER_IS_BANNED,
	ERROR_USER_NOT_FOUND,
} from '../constants/errors.const';
import { ms } from '../utils/units/ms';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (isPublic) return true;

		const req = context.switchToHttp().getRequest<Request>();
		const res = context.switchToHttp().getResponse<Response>();
		const { accessToken, refreshToken } = req.signedCookies;

		if (!accessToken || !refreshToken) {
			return this.unauthorized(res, ERROR_TOKENS_NOT_FOUND);
		}

		const payload = await this.getValidPayload(
			accessToken as string,
			refreshToken as string,
		);

		if (!payload) {
			return this.unauthorized(res, ERROR_INVALID_TOKEN);
		}

		return this.attachUserToRequest(req, res, payload.sub, !accessToken);
	}

	private async getValidPayload(accessToken?: string, refreshToken?: string) {
		const accessPayload = accessToken
			? await this.authService.verifyToken(accessToken, 'access')
			: null;

		if (accessPayload) return accessPayload;

		const refreshPayload = refreshToken
			? await this.authService.verifyToken(refreshToken, 'refresh')
			: null;

		return refreshPayload;
	}

	private async attachUserToRequest(
		req: Request,
		res: Response,
		userId: number,
		refreshNeeded = false,
	): Promise<boolean> {
		const user = await this.userService.findUserById(userId);

		if (!user || user.isBanned) {
			return this.unauthorized(
				res,
				user ? ERROR_USER_IS_BANNED : ERROR_USER_NOT_FOUND,
			);
		}

		if (refreshNeeded) {
			const newAccessToken = await this.authService.generateAccessToken(
				this.authService.getPayload(user),
			);
			res.cookie('accessToken', newAccessToken, {
				...this.authService.cookieOptions,
				maxAge: ms(this.authService.jwtExpiresIn),
			});
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
