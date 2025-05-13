import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);
	const port = configService.get('app.port') as number;
	const clientUrl = configService.get('app.clientUrl') as string;
	const cookieSecret = configService.get('app.cookieSecret') as string;

	app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
	app.enableCors({
		origin: [clientUrl],
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	});

	app.use(cookieParser(cookieSecret));
	app.setGlobalPrefix('api');
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1',
	});

	await app.listen(port);
}
bootstrap();
