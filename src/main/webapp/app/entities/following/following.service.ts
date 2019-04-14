import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFollowing } from 'app/shared/model/following.model';

type EntityResponseType = HttpResponse<IFollowing>;
type EntityArrayResponseType = HttpResponse<IFollowing[]>;

@Injectable({ providedIn: 'root' })
export class FollowingService {
    public resourceUrl = SERVER_API_URL + 'api/followings';

    constructor(protected http: HttpClient) {}

    create(following: IFollowing): Observable<EntityResponseType> {
        return this.http.post<IFollowing>(this.resourceUrl, following, { observe: 'response' });
    }

    update(following: IFollowing): Observable<EntityResponseType> {
        return this.http.put<IFollowing>(this.resourceUrl, following, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFollowing>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFollowing[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
