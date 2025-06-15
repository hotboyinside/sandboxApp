import {
	IsAlphanumeric,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsString,
	Length,
	Matches,
	MinLength,
	ValidateIf,
} from 'class-validator';
import {
	ERROR_STEAM_ID_INVALID_FORMAT,
	ERROR_STEAM_ID_INVALID_LENGTH,
	ERROR_USERNAME_NOT_ALPHANUMERIC,
	ERROR_USERNAME_TOO_SHORT,
} from 'src/common/constants/errors.const';
import { Role } from 'src/common/enums/roles.enum';
import { SteamAccount } from 'src/modules/steam/types/get-player-info.type';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	avatar: string;

	@IsNotEmpty()
	@MinLength(3, { message: ERROR_USERNAME_TOO_SHORT })
	@IsAlphanumeric('en-US', {
		message: ERROR_USERNAME_NOT_ALPHANUMERIC,
	})
	name: string;

	@IsNumber()
	@ValidateIf(
		(obj: SteamAccount) =>
			obj.seasonRank !== undefined && obj.seasonRank !== null,
	)
	seasonRank: number | null;

	@IsString()
	@IsNotEmpty()
	@Length(17, 17, { message: ERROR_STEAM_ID_INVALID_LENGTH })
	@Matches(/^7656119\d{10}$/, { message: ERROR_STEAM_ID_INVALID_FORMAT })
	steamId: string;

	@IsEnum(Role)
	role: Role;
}
