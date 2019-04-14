import { IProject } from 'app/shared/model/project.model';
import { IUserSocial } from 'app/shared/model/user-social.model';

export const enum Rating {
    PATTERNS = 'PATTERNS',
    ANTIPATTERNS = 'ANTIPATTERNS'
}

export interface ICatalog {
    id?: number;
    rating?: Rating;
    projetc?: IProject;
    user?: IUserSocial;
}

export class Catalog implements ICatalog {
    constructor(public id?: number, public rating?: Rating, public projetc?: IProject, public user?: IUserSocial) {}
}
