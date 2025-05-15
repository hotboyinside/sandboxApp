export enum Role {
	CLIENT = 'client',
	ADMIN = 'admin',
	SUPERADMIN = 'superadmin',
}

export const ALL_ADMINS: Role[] = [Role.SUPERADMIN, Role.ADMIN];
