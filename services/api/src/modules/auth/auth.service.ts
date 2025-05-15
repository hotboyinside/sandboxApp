import {
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
	ERROR_INVALID_PASSWORD,
	ERROR_USER_IS_BANNED,
	ERROR_USER_NOT_FOUND,
} from 'src/common/constants/errors.const';
import { ICurrentUser } from 'src/common/interfaces/user.interface';
import { UserService } from '../users/users.service';
import { LoginDto } from './dto/login-auth.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
	readonly jwtSecret: string;
	readonly jwtExpiresIn: string;
	readonly jwtRefreshSecret: string;
	readonly jwtRefreshExpiresIn: string;
	readonly cookieOptions: object;

	constructor(
		private jwtService: JwtService,
		private userService: UserService,
		private configService: ConfigService,
	) {
		this.jwtSecret = this.configService.get('jwt.secret') as string;
		this.jwtExpiresIn = this.configService.get('jwt.expiresIn') as string;
		this.jwtRefreshSecret = this.configService.get(
			'jwt.refreshSecret',
		) as string;
		this.jwtRefreshExpiresIn = this.configService.get(
			'jwt.refreshExpiresIn',
		) as string;

		this.cookieOptions = {
			httpOnly: true,
			sameSite: true,
			signed: true,
			secure: true,
		};
	}

	/**
	 * This function is used to authenticate the user by username and password.
	 * It validates the credentials and returns access & refresh tokens with user data.
	 *
	 * @param loginDto This will be of type LoginDto which contains username, password and rememberMe
	 * @returns Promise containing tokens and userData
	 */
	async login({ username, password, rememberMe }: LoginDto) {
		const user = await this.userService.viewUserByUsername(username);
		if (!user) throw new UnauthorizedException(ERROR_USER_NOT_FOUND);

		if (user?.isBanned) {
			throw new ForbiddenException(ERROR_USER_IS_BANNED);
		}

		const passwordMatches = await bcrypt.compare(password, user.password);
		if (!passwordMatches) {
			throw new UnauthorizedException(ERROR_INVALID_PASSWORD);
		}

		const tokens = await this.generateTokens(user, rememberMe);
		return { ...tokens, userData: user };
	}

	/**
	 * This function is used to verify a JWT token (access or refresh).
	 * Returns the decoded payload or null if token is invalid or expired.
	 *
	 * @param token The JWT string to be verified
	 * @param typeToken A string indicating token type: 'access' or 'refresh'
	 * @returns Promise of JwtPayload or null
	 */
	async verifyToken(
		token: string,
		typeToken: 'access' | 'refresh',
	): Promise<IJwtPayload | null> {
		const secret =
			typeToken === 'access' ? this.jwtSecret : this.jwtRefreshSecret;
		try {
			return await this.jwtService.verifyAsync<IJwtPayload>(token, {
				secret,
			});
		} catch {
			return null;
		}
	}

	/**
	 * This function generates both access and refresh tokens for a user.
	 *
	 * @param user This should be of type ICurrentUser
	 * @param rememberMe If true, the refresh token will have longer expiry
	 * @returns Promise containing accessToken and refreshToken
	 */
	async generateTokens(user: ICurrentUser, rememberMe = false) {
		const payload = this.getPayload(user);
		return {
			accessToken: await this.generateAccessToken(payload),
			refreshToken: await this.generateRefreshToken(payload, rememberMe),
		};
	}

	/**
	 * This function creates a payload for the JWT based on user data.
	 *
	 * @param user This should be of type ICurrentUser
	 * @returns JwtPayload containing sub, role, and isBanned fields
	 */
	getPayload(user: ICurrentUser): IJwtPayload {
		return {
			sub: user.id,
			role: user.role,
			isBanned: user.isBanned || false,
		};
	}

	/**
	 * This function generates a signed access token.
	 *
	 * @param payload This should be of type IJwtPayload
	 * @returns Promise resolving to a signed JWT string
	 */
	async generateAccessToken(payload: IJwtPayload) {
		return this.jwtService.signAsync(payload, {
			secret: this.jwtSecret,
			expiresIn: this.jwtExpiresIn,
		});
	}

	/**
	 * This function generates a signed refresh token.
	 * If rememberMe is true, uses extended expiration time.
	 *
	 * @param payload This should be of type IJwtPayload
	 * @param rememberMe Optional boolean for longer expiry
	 * @returns Promise resolving to a signed JWT string
	 */
	async generateRefreshToken(payload: IJwtPayload, rememberMe = false) {
		return this.jwtService.signAsync(payload, {
			secret: this.jwtRefreshSecret,
			expiresIn: rememberMe ? this.jwtRefreshExpiresIn : this.jwtExpiresIn,
		});
	}
}
