import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './app.config';
import { databaseConfig } from './database.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [appConfig, databaseConfig],
			isGlobal: true,
		}),
	],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class AppConfigModule {}
