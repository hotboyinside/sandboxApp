import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ERROR_REQUEST_USER_NOT_FOUND } from 'src/common/constants/errors.const';
import { steam64ToSteam32 } from 'src/common/utils/steam/steam64ToSteam32';
import { fetchGraphQL } from './fetchGraphQL/fetchGraphQL';
import { GetPlayerInfoQuery } from './queries/get-player-info.query';
import { PlayerData } from './types/get-player-info.type';

@Injectable()
export class SteamService {
	private readonly stratzApiKey: string;
	private readonly stratzApiUrl = 'https://api.stratz.com/graphql';

	constructor(private configService: ConfigService) {
		this.stratzApiKey = this.configService.get('steam.stratzApiKey') as string;
	}

	async getSteamUserInfo(steamAccountId: string) {
		const steamId = steam64ToSteam32(steamAccountId);
		const query = GetPlayerInfoQuery(steamId);

		try {
			const response = await fetchGraphQL<PlayerData>(
				this.stratzApiUrl,
				this.stratzApiKey,
				query,
			);

			const result = response.data.player;

			return result;
		} catch (error) {
			console.error(error);
			throw new BadRequestException(ERROR_REQUEST_USER_NOT_FOUND);
		}
	}

	async getDotaMatchHistory() {}
}
