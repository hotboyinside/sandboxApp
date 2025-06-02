import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { GraphQLClient } from 'graphql-request';

interface SteamPlayer {
	steamid: string;
	personaname: string;
	avatarfull: string;
	profileurl: string;
	realname?: string;
	loccountrycode?: string;
}

interface SteamResponse {
	response: {
		players: SteamPlayer[];
	};
}

@Injectable()
export class SteamService {
	private readonly STEAM_API_KEY = '7FB8BF2994DA380F02B0B6B49C2859E6';
	private readonly BASE_URL = 'https://api.steampowered.com';
	private readonly STRATZ_API_KEY =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiNDU3ODhkZWQtY2QxOS00Y2E0LTgxOGUtYTcyZjg5ZmVkZDUzIiwiU3RlYW1JZCI6IjYxMzE1NDUyIiwibmJmIjoxNzQ3Njc5NDU0LCJleHAiOjE3NzkyMTU0NTQsImlhdCI6MTc0NzY3OTQ1NCwiaXNzIjoiaHR0cHM6Ly9hcGkuc3RyYXR6LmNvbSJ9.78nhnydOZCjsJAcRepSByJXblTUK1xY0wX2_pAKGwWE';
	private readonly STRATZ_GRAPHQL_ENDPOINT = 'https://api.stratz.com/graphql';
	private graphqlClient = new GraphQLClient(this.STRATZ_GRAPHQL_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${this.STRATZ_API_KEY}`,
		},
	});

	constructor() {}

	async getSteamUserInfo(steamId: string) {
		try {
			const response = await axios.get<SteamResponse>(
				`${this.BASE_URL}/ISteamUser/GetPlayerSummaries/v0002/`,
				{
					params: {
						key: this.STEAM_API_KEY,
						steamids: steamId,
					},
				},
			);

			console.log('response', response);

			const players = response.data?.response?.players;
			if (!players || players.length === 0) {
				return null;
			}

			const player = players[0];
			return {
				steamId: player.steamid,
				username: player.personaname,
				avatar: player.avatarfull,
				profileUrl: player.profileurl,
				realName: player.realname || null,
				country: player.loccountrycode || null,
			};
		} catch (err) {
			console.error('Steam API error:', err);
			throw new InternalServerErrorException('Failed to fetch Steam user info');
		}
	}

	async getDotaMatchHistory() {
		try {
			const response = await axios.get<SteamResponse>(
				`https://api.steampowered.com/IDOTA2Match_570/GetMatchHistoryBySequenceNum/v1/?key=${this.STEAM_API_KEY}`,
			);
			console.log('response', response);
		} catch (err) {
			console.error('Steam API error:', err);
			throw new InternalServerErrorException('Failed to fetch Steam user info');
		}
	}
}
