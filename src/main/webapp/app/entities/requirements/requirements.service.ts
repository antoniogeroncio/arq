import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRequirements } from 'app/shared/model/requirements.model';

type EntityResponseType = HttpResponse<IRequirements>;
type EntityArrayResponseType = HttpResponse<IRequirements[]>;

@Injectable({ providedIn: 'root' })
export class RequirementsService {
    public resourceUrl = SERVER_API_URL + 'api/requirements';

    constructor(protected http: HttpClient) {}

    create(requirements: IRequirements): Observable<EntityResponseType> {
        return this.http.post<IRequirements>(this.resourceUrl, requirements, { observe: 'response' });
    }

    update(requirements: IRequirements): Observable<EntityResponseType> {
        return this.http.put<IRequirements>(this.resourceUrl, requirements, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRequirements>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRequirements[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
