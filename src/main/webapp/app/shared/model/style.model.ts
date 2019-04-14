import { ITag } from 'app/shared/model/tag.model';

export interface IStyle {
    id?: number;
    tag?: ITag;
}

export class Style implements IStyle {
    constructor(public id?: number, public tag?: ITag) {}
}
