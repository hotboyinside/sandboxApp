import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Match } from './match.entity';

@Entity('player_matches')
export class PlayerMatch {
	@PrimaryColumn('bigint')
	steamId: number;

	@PrimaryColumn('bigint')
	matchId: string;

	@ManyToOne(() => Match, (match) => match.players, { onDelete: 'CASCADE' })
	match: Match;

	@Column({ type: 'boolean' })
	isRadiant: boolean;

	@Column({ type: 'int' })
	kills: number;

	@Column({ type: 'int' })
	deaths: number;

	@Column({ type: 'int' })
	assists: number;

	@Column({ type: 'int' })
	goldPerMinute: number;

	@Column()
	displayName: string;
}
