import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMetric } from 'app/shared/model/metric.model';

type EntityResponseType = HttpResponse<IMetric>;
type EntityArrayResponseType = HttpResponse<IMetric[]>;

@Injectable({ providedIn: 'root' })
export class MetricService {
    public resourceUrl = SERVER_API_URL + 'api/metrics';

    constructor(protected http: HttpClient) {}

    create(metric: IMetric): Observable<EntityResponseType> {
        return this.http.post<IMetric>(this.resourceUrl, metric, { observe: 'response' });
    }

    update(metric: IMetric): Observable<EntityResponseType> {
        return this.http.put<IMetric>(this.resourceUrl, metric, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMetric>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMetric[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
