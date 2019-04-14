import { Moment } from 'moment';
import { IUserSocial } from 'app/shared/model/user-social.model';

export interface IMessage {
    id?: number;
    description?: string;
    sendDate?: Moment;
    sender?: IUserSocial;
    recipient?: IUserSocial;
}

export class Message implements IMessage {
    constructor(
        public id?: number,
        public description?: string,
        public sendDate?: Moment,
        public sender?: IUserSocial,
        public recipient?: IUserSocial
    ) {}
}
