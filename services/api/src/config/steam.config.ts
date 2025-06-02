import { registerAs } from '@nestjs/config';
import { parseNumber } from 'src/common/utils/parsers/parseNumber';
import { parseString } from 'src/common/utils/parsers/parseString';

export const steamConfig = registerAs('steam', () => ({
	steamApiKey: parseString(
		process.env.STEAM_API_KEY,
		'7FB8BF2994DA380F02B0B6B49C2859E6',
	),
	steamIdMaxLength: parseNumber(process.env.STEAM_ID_MAX_LENGTH, 17),
}));
