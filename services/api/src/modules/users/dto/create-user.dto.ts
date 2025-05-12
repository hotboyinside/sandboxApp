import {
	IsAlphanumeric,
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
	MinLength,
} from 'class-validator';
import {
	ERROR_EMAIL_INVALID,
	ERROR_NAME_TOO_SHORT,
	ERROR_PASSWORD_INVALID,
	ERROR_USERNAME_NOT_ALPHANUMERIC,
	ERROR_USERNAME_TOO_SHORT,
} from 'src/common/constants/errors.const';

const passwordRegEx =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class CreateUserDto {
	@IsString()
	@MinLength(2, { message: ERROR_NAME_TOO_SHORT })
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	@MinLength(3, { message: ERROR_USERNAME_TOO_SHORT })
	@IsAlphanumeric('en-US', {
		message: ERROR_USERNAME_NOT_ALPHANUMERIC,
	})
	username: string;

	@IsNotEmpty()
	@IsEmail({}, { message: ERROR_EMAIL_INVALID })
	email: string;

	@IsNotEmpty()
	@Matches(passwordRegEx, {
		message: ERROR_PASSWORD_INVALID,
	})
	password: string;
}
