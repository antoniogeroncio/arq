import { IStyle } from 'app/shared/model/style.model';

export interface IProject {
    id?: number;
    name?: string;
    description?: string;
    style?: IStyle;
}

export class Project implements IProject {
    constructor(public id?: number, public name?: string, public description?: string, public style?: IStyle) {}
}
