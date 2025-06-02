import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import {
	ERROR_STEAM_ID_INVALID_FORMAT,
	ERROR_STEAM_ID_INVALID_LENGTH,
} from 'src/common/constants/errors.const';

export class LoginSteamDto {
	@IsString()
	@IsNotEmpty()
	@Length(17, 17, { message: ERROR_STEAM_ID_INVALID_LENGTH })
	@Matches(/^7656119\d{10}$/, { message: ERROR_STEAM_ID_INVALID_FORMAT })
	steamId: string;
}
