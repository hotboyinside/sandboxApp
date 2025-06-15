import { Controller, Get, Req } from '@nestjs/common';
import { IRequest } from 'src/common/interfaces/request.interface';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Get()
	async getProfileInformation(@Req() req: IRequest) {
		return this.profileService.getProfileInformation(req.user);
	}
}
