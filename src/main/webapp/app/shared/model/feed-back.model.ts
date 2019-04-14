import { IUserSocial } from 'app/shared/model/user-social.model';
import { IProject } from 'app/shared/model/project.model';

export interface IFeedBack {
    id?: number;
    grade?: number;
    description?: string;
    user?: IUserSocial;
    projetc?: IProject;
}

export class FeedBack implements IFeedBack {
    constructor(
        public id?: number,
        public grade?: number,
        public description?: string,
        public user?: IUserSocial,
        public projetc?: IProject
    ) {}
}
