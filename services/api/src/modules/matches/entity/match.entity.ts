import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PlayerMatch } from './player-match.entity';

@Entity('matches')
export class Match {
	@PrimaryColumn('bigint')
	id: string;

	@Column()
	durationSeconds: number;

	@Column()
	startDateTime: number;

	@OneToMany(() => PlayerMatch, (pm) => pm.match)
	players: PlayerMatch[];
}
