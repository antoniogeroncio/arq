import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Metric } from 'app/shared/model/metric.model';
import { MetricService } from './metric.service';
import { MetricComponent } from './metric.component';
import { MetricDetailComponent } from './metric-detail.component';
import { MetricUpdateComponent } from './metric-update.component';
import { MetricDeletePopupComponent } from './metric-delete-dialog.component';
import { IMetric } from 'app/shared/model/metric.model';

@Injectable({ providedIn: 'root' })
export class MetricResolve implements Resolve<IMetric> {
    constructor(private service: MetricService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMetric> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Metric>) => response.ok),
                map((metric: HttpResponse<Metric>) => metric.body)
            );
        }
        return of(new Metric());
    }
}

export const metricRoute: Routes = [
    {
        path: '',
        component: MetricComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.metric.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MetricDetailComponent,
        resolve: {
            metric: MetricResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.metric.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MetricUpdateComponent,
        resolve: {
            metric: MetricResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.metric.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MetricUpdateComponent,
        resolve: {
            metric: MetricResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.metric.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const metricPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MetricDeletePopupComponent,
        resolve: {
            metric: MetricResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.metric.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
