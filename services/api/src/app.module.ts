import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesGuard } from './common/guards/roles.guard';
import { AppConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { ProfileModule } from './modules/profile/profile.module';
import { SteamModule } from './modules/steam/steam.module';
import { UserModule } from './modules/users/users.module';
import { MatchesModule } from './modules/matches/matches.module';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [AppConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('database.databaseHost') as string,
				port: configService.get('database.databasePort') as number,
				username: configService.get('database.databaseUsername') as string,
				password: configService.get('database.databasePassword') as string,
				database: configService.get('database.databaseName') as string,
				// убрать в prode
				synchronize: true,
				autoLoadEntities: true,
			}),
			inject: [ConfigService],
		}),
		UserModule,
		AuthModule,
		SteamModule,
		ProfileModule,
		MatchesModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class AppModule {}
