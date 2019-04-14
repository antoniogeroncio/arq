import { IVersion } from 'app/shared/model/version.model';
import { IProject } from 'app/shared/model/project.model';
import { IUserSocial } from 'app/shared/model/user-social.model';

export interface IMetric {
    id?: number;
    version?: IVersion;
    project?: IProject;
    user?: IUserSocial;
}

export class Metric implements IMetric {
    constructor(public id?: number, public version?: IVersion, public project?: IProject, public user?: IUserSocial) {}
}
