import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from 'src/app.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { RolesGuard } from 'src/common/guards/roles.guard';

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
	],
	controllers: [AuthController],
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
export class AuthModule {}
