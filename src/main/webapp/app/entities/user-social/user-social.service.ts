import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserSocial } from 'app/shared/model/user-social.model';

type EntityResponseType = HttpResponse<IUserSocial>;
type EntityArrayResponseType = HttpResponse<IUserSocial[]>;

@Injectable({ providedIn: 'root' })
export class UserSocialService {
    public resourceUrl = SERVER_API_URL + 'api/user-socials';

    constructor(protected http: HttpClient) {}

    create(userSocial: IUserSocial): Observable<EntityResponseType> {
        return this.http.post<IUserSocial>(this.resourceUrl, userSocial, { observe: 'response' });
    }

    update(userSocial: IUserSocial): Observable<EntityResponseType> {
        return this.http.put<IUserSocial>(this.resourceUrl, userSocial, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUserSocial>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserSocial[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
