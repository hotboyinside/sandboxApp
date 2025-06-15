import { registerAs } from '@nestjs/config';
import { parseNumber } from 'src/common/utils/parsers/parseNumber';
import { parseString } from 'src/common/utils/parsers/parseString';

export const steamConfig = registerAs('steam', () => ({
	steamApiKey: parseString(
		process.env.STEAM_API_KEY,
		'7FB8BF2994DA380F02B0B6B49C2859E6',
	),
	steamIdMaxLength: parseNumber(process.env.STEAM_ID_MAX_LENGTH, 17),
	stratzApiKey: parseString(
		process.env.STRATZ_API_KEY,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiNDU3ODhkZWQtY2QxOS00Y2E0LTgxOGUtYTcyZjg5ZmVkZDUzIiwiU3RlYW1JZCI6IjYxMzE1NDUyIiwibmJmIjoxNzQ5MTUxMjg2LCJleHAiOjE3ODA2ODcyODYsImlhdCI6MTc0OTE1MTI4NiwiaXNzIjoiaHR0cHM6Ly9hcGkuc3RyYXR6LmNvbSJ9.vpxJMBo2MbSS_06nlgMZGz6Eevak3KXCLZbMCCS6B7Q',
	),
}));
