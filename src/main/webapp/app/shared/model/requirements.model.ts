export const enum RequirementsType {
    QA = 'QA',
    FUNCTIONAL = 'FUNCTIONAL'
}

export interface IRequirements {
    id?: number;
    description?: string;
    type?: RequirementsType;
}

export class Requirements implements IRequirements {
    constructor(public id?: number, public description?: string, public type?: RequirementsType) {}
}
