import {
	IsAlphanumeric,
	IsEnum,
	IsNotEmpty,
	IsString,
	Length,
	Matches,
	MinLength,
} from 'class-validator';
import {
	ERROR_NAME_TOO_SHORT,
	ERROR_STEAM_ID_INVALID_FORMAT,
	ERROR_STEAM_ID_INVALID_LENGTH,
	ERROR_USERNAME_NOT_ALPHANUMERIC,
	ERROR_USERNAME_TOO_SHORT,
} from 'src/common/constants/errors.const';
import { Role } from 'src/common/enums/roles.enum';

export class CreateUserDto {
	@IsString()
	@MinLength(2, { message: ERROR_NAME_TOO_SHORT })
	@IsNotEmpty()
	realName: string;

	@IsNotEmpty()
	@MinLength(3, { message: ERROR_USERNAME_TOO_SHORT })
	@IsAlphanumeric('en-US', {
		message: ERROR_USERNAME_NOT_ALPHANUMERIC,
	})
	username: string;

	@IsString()
	@IsNotEmpty()
	@Length(17, 17, { message: ERROR_STEAM_ID_INVALID_LENGTH })
	@Matches(/^7656119\d{10}$/, { message: ERROR_STEAM_ID_INVALID_FORMAT })
	steamId: string;

	@IsEnum(Role)
	role: Role;
}
