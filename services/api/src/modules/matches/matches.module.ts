import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entity/match.entity';
import { PlayerMatch } from './entity/player-match.entity';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';

@Module({
	imports: [TypeOrmModule.forFeature([Match, PlayerMatch])],
	controllers: [MatchesController],
	providers: [MatchesService],
	exports: [MatchesService],
})
export class MatchesModule {}
