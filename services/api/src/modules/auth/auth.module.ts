import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MatchesModule } from '../matches/matches.module';
import { SteamModule } from '../steam/steam.module';
import { UserModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
	imports: [
		forwardRef(() => UserModule),
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('jwt.secret') as string,
				signOptions: {
					expiresIn: configService.get('jwt.expiresIn') as string,
				},
			}),
		}),
		SteamModule,
		MatchesModule,
	],

	controllers: [AuthController],
	providers: [AuthService, AuthGuard],
	exports: [AuthService],
})
export class AuthModule {}
