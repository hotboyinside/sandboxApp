import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/roles.enum';
import { IRequest } from '../interfaces/request.interface';
import { ERROR_USER_IS_NOT_LOG_IN } from '../constants/errors.const';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!requiredRoles) {
			return true;
		}

		const request: IRequest = context.switchToHttp().getRequest();
		const { user } = request;

		if (!user) {
			throw new UnauthorizedException(ERROR_USER_IS_NOT_LOG_IN);
		}

		return requiredRoles.includes(user.role);
	}
}
