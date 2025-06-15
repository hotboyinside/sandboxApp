export function steam64ToSteam32(steamId64: string): number {
	const steamId64Big = BigInt(steamId64);
	const steam32 = steamId64Big - BigInt('76561197960265728');

	return Number(steam32);
}
