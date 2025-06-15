import { Exclude } from 'class-transformer';
import { Role } from 'src/common/enums/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 15 })
	name: string;

	@Column({ type: 'varchar', length: 17 })
	steamId: string;

	@Column({ type: 'varchar', nullable: true })
	avatar: string;

	@Column({ type: 'int', nullable: true })
	seasonRank: number | null;

	@Column({ type: 'varchar', nullable: true })
	@Exclude()
	password: string;

	@Column({ type: 'boolean', default: false })
	isBanned: boolean;

	@Column({ type: 'varchar' })
	role: Role;
}
