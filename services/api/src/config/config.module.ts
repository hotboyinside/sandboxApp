import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './app.config';
import { databaseConfig } from './database.config';
import { jwtConfig } from './jwt.config';
import { steamConfig } from './steam.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [appConfig, databaseConfig, jwtConfig, steamConfig],
			isGlobal: true,
		}),
	],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class AppConfigModule {}
