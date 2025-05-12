import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ERROR_NAME_TOO_SHORT } from 'src/common/constants/errors.const';

export class UpdateUserDto {
	@IsString()
	@MinLength(2, { message: ERROR_NAME_TOO_SHORT })
	@IsNotEmpty()
	name: string;
}
