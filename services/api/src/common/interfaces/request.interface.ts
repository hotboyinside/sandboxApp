import { ICurrentUser } from './user.interface';

export interface IRequest extends Request {
	user: ICurrentUser;
}
