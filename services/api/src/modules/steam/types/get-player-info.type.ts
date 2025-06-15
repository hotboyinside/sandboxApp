export interface SteamAccount {
	name: string;
	avatar: string;
	seasonRank: number | null;
}

export interface DotaHeroType {
	displayName: string;
}

export interface DotaMatchPlayer {
	steamAccountId: number;
	steamAccount: SteamAccount;
	isRadiant: boolean;
	kills: number;
	deaths: number;
	assists: number;
	numDenies: number;
	goldPerMinute: number;
	hero: DotaHeroType;
}

export interface DotaMatch {
	id: string;
	didRadiantWin: boolean;
	durationSeconds: number;
	startDateTime: number;
	players: DotaMatchPlayer[];
}

export interface PlayerData {
	player: {
		steamAccount: SteamAccount;
		matches: DotaMatch[];
	};
}
