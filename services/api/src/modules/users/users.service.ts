import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
	ERROR_USER_WITH_ID_NOT_FOUND,
	ERROR_USER_WITH_USERNAME_NOT_FOUND,
} from 'src/common/constants/errors.const';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/users.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	) {}

	/**
	 * this is function is used to create User in User Entity.
	 * @param createUserDto this will type of createUserDto in which
	 * we have defined what are the keys we are expecting from body
	 * @returns promise of user
	 */
	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const user = this.userRepository.create(createUserDto);
		return this.userRepository.save(user);
	}

	/**
	 * this function is used to get all the user's list
	 * @returns promise of array of users
	 */
	async findAllUser(): Promise<User[]> {
		return this.userRepository.find();
	}

	/**
	 * this function used to get data of use whose id is passed in parameter
	 * @param id is type of number, which represent the id of user.
	 * @returns promise of user
	 */
	async findUserById(id: number): Promise<User> {
		const user = await this.userRepository.findOneBy({ id });
		if (!user) {
			throw new NotFoundException(ERROR_USER_WITH_ID_NOT_FOUND);
		}
		return user;
	}

	/**
	 * this function used to get data of use whose id is passed in parameter
	 * @param id is type of number, which represent the id of user.
	 * @returns promise of user
	 */
	async findUserBySteamId(steamId: string): Promise<User | null> {
		const user = await this.userRepository.findOneBy({ steamId });
		return user;
	}

	/**
	 * this function used to get data of use whose username is passed in parameter
	 * @param username is type of string, which represent the id of user.
	 * @returns promise of user
	 */
	async findUserByUsername(username: string): Promise<User> {
		const user = await this.userRepository.findOneBy({ name: username });
		if (!user) {
			throw new NotFoundException(ERROR_USER_WITH_USERNAME_NOT_FOUND);
		}
		return user;
	}

	/**
	 * this function is used to updated specific user whose id is passed in
	 * parameter along with passed updated data
	 * @param id is type of number, which represent the id of user.
	 * @param updateUserDto this is partial type of createUserDto.
	 * @returns promise of update user
	 */
	async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		await this.userRepository.update(id, updateUserDto);
		const updatedUser = await this.userRepository.findOneBy({ id });
		if (!updatedUser) {
			throw new NotFoundException(ERROR_USER_WITH_ID_NOT_FOUND);
		}
		return updatedUser;
	}

	/**
	 * this function is used to remove or delete user from database.
	 * @param id is the type of number, which represent id of user
	 * @returns number of rows deleted or affected
	 */
	async removeUser(id: number): Promise<DeleteResult> {
		const result = await this.userRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundException(ERROR_USER_WITH_ID_NOT_FOUND);
		}
		return result;
	}
}
