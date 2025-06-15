import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DotaMatch } from '../steam/types/get-player-info.type';
import { Match } from './entity/match.entity';
import { PlayerMatch } from './entity/player-match.entity';

@Injectable()
export class MatchesService {
	constructor(
		@InjectRepository(Match)
		private matchRepo: Repository<Match>,
		@InjectRepository(PlayerMatch)
		private playerMatchRepo: Repository<PlayerMatch>,
	) {}

	async createMatchWithPlayers(matchData: DotaMatch) {
		const newDotaMatch = this.matchRepo.create({
			...matchData,
		});
		await this.matchRepo.save(newDotaMatch);

		const playerMatches = matchData.players.map((player) =>
			this.playerMatchRepo.create({
				...player,
				steamId: player.steamAccountId,
				displayName: player.hero.displayName,
				matchId: matchData.id,
			}),
		);

		await this.playerMatchRepo.save(playerMatches);
		return newDotaMatch;
	}
}
