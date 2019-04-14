export interface ITag {
    id?: number;
    description?: string;
}

export class Tag implements ITag {
    constructor(public id?: number, public description?: string) {}
}
