import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
	constructor(private readonly usersService: UserService) {}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto) {
		return this.usersService.createUser(createUserDto);
	}

	@Get()
	async findAllUsers() {
		return this.usersService.findAllUser();
	}

	@Get(':id')
	async findOneUser(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.viewUser(id);
	}

	@Put(':id')
	async updateUser(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return this.usersService.updateUser(id, updateUserDto);
	}

	@Delete(':id')
	async deleteUser(@Param('id', ParseIntPipe) id: number) {
		return await this.usersService.removeUser(id);
	}
}
