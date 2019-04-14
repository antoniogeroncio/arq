import { IUserSocial } from 'app/shared/model/user-social.model';

export interface IFollowing {
    id?: number;
    follower?: IUserSocial;
    following?: IUserSocial;
}

export class Following implements IFollowing {
    constructor(public id?: number, public follower?: IUserSocial, public following?: IUserSocial) {}
}
