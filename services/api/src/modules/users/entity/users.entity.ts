import { Role } from 'src/common/enums/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 30 })
	realName: string;

	@Column({ type: 'varchar', length: 15 })
	username: string;

	@Column({ type: 'varchar', length: 17 })
	steamId: string;

	@Column({ type: 'varchar', nullable: true })
	password: string;

	@Column({ type: 'varchar' })
	role: Role;

	@Column({ type: 'varchar', default: false })
	isBanned: boolean;
}
