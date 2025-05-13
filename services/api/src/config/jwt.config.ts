import { registerAs } from '@nestjs/config';
import { parseString } from 'src/common/utils/parsers/parseString';

export const jwtConfig = registerAs('jwt', () => ({
	secret: parseString(process.env.JWT_SECRET, 'jwt_secret_key'),
	refreshSecret: parseString(
		process.env.JWT_REFRESH_SECRET,
		'jwt_refresh_secret_key',
	),
	expiresIn: parseString(process.env.JWT_EXPIRES_IN, '1d'),
	refreshExpiresIn: parseString(process.env.JWT_REFRESH_EXPIRES_IN, '7d'),
}));
