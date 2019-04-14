export interface IVersion {
    id?: number;
    version?: string;
    codeContentType?: string;
    code?: any;
    date?: string;
}

export class Version implements IVersion {
    constructor(public id?: number, public version?: string, public codeContentType?: string, public code?: any, public date?: string) {}
}
