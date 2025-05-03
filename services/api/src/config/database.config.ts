import { registerAs } from '@nestjs/config';
import { parseNumber } from 'src/common/utils/parsers/parseNumber';
import { parseString } from 'src/common/utils/parsers/parseString';

export const databaseConfig = registerAs('database', () => ({
  databasePort: parseNumber(process.env.DATABASE_PORT, 5432),
  databaseHost: parseString(process.env.DATABASE_HOST, 'postgres'),
  databaseUsername: parseString(process.env.DATABASE_USERNAME, 'postgres'),
  databasePassword: parseString(process.env.DATABASE_PASSWORD, 'postgres'),
  databaseName: parseString(process.env.DATABASE_NAME, 'musicApp'),
}));
