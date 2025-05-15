import { Role } from 'src/common/enums/roles.enum';

export interface IJwtPayload {
	sub: number;
	role: Role;
	isBanned: boolean;
}
