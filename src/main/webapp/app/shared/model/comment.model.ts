import { IUserSocial } from 'app/shared/model/user-social.model';
import { IProject } from 'app/shared/model/project.model';

export interface IComment {
    id?: number;
    description?: string;
    user?: IUserSocial;
    projetc?: IProject;
}

export class Comment implements IComment {
    constructor(public id?: number, public description?: string, public user?: IUserSocial, public projetc?: IProject) {}
}
