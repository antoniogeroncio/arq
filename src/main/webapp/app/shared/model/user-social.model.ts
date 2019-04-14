export interface IUserSocial {
    id?: number;
}

export class UserSocial implements IUserSocial {
    constructor(public id?: number) {}
}
