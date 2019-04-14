import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStyle } from 'app/shared/model/style.model';

type EntityResponseType = HttpResponse<IStyle>;
type EntityArrayResponseType = HttpResponse<IStyle[]>;

@Injectable({ providedIn: 'root' })
export class StyleService {
    public resourceUrl = SERVER_API_URL + 'api/styles';

    constructor(protected http: HttpClient) {}

    create(style: IStyle): Observable<EntityResponseType> {
        return this.http.post<IStyle>(this.resourceUrl, style, { observe: 'response' });
    }

    update(style: IStyle): Observable<EntityResponseType> {
        return this.http.put<IStyle>(this.resourceUrl, style, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStyle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStyle[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
