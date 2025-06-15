import { Injectable } from '@nestjs/common';
import { ICurrentUser } from 'src/common/interfaces/user.interface';
import { UserService } from '../users/users.service';

@Injectable()
export class ProfileService {
	constructor(private userService: UserService) {}

	async getProfileInformation(currentUser: ICurrentUser) {
		const userData = await this.userService.findUserById(currentUser.id);

		return userData;
	}
}
