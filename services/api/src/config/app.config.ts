import { registerAs } from '@nestjs/config';
import { parseNumber } from 'src/common/utils/parsers/parseNumber';
import { parseString } from 'src/common/utils/parsers/parseString';

export const appConfig = registerAs('app', () => ({
  port: parseNumber(process.env.PORT, 8080),
  clientUrl: parseString(process.env.CLIENT_URL, 'http://localhost:3000'),
  cookieSecret: parseString(
    process.env.COOKIE_SECRET,
    'unsecretpleasechangewithvalue',
  ),
}));
