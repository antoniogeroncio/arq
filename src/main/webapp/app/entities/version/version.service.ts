import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVersion } from 'app/shared/model/version.model';

type EntityResponseType = HttpResponse<IVersion>;
type EntityArrayResponseType = HttpResponse<IVersion[]>;

@Injectable({ providedIn: 'root' })
export class VersionService {
    public resourceUrl = SERVER_API_URL + 'api/versions';

    constructor(protected http: HttpClient) {}

    create(version: IVersion): Observable<EntityResponseType> {
        return this.http.post<IVersion>(this.resourceUrl, version, { observe: 'response' });
    }

    update(version: IVersion): Observable<EntityResponseType> {
        return this.http.put<IVersion>(this.resourceUrl, version, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVersion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVersion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
