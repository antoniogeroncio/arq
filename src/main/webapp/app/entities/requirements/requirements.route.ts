import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Requirements } from 'app/shared/model/requirements.model';
import { RequirementsService } from './requirements.service';
import { RequirementsComponent } from './requirements.component';
import { RequirementsDetailComponent } from './requirements-detail.component';
import { RequirementsUpdateComponent } from './requirements-update.component';
import { RequirementsDeletePopupComponent } from './requirements-delete-dialog.component';
import { IRequirements } from 'app/shared/model/requirements.model';

@Injectable({ providedIn: 'root' })
export class RequirementsResolve implements Resolve<IRequirements> {
    constructor(private service: RequirementsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRequirements> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Requirements>) => response.ok),
                map((requirements: HttpResponse<Requirements>) => requirements.body)
            );
        }
        return of(new Requirements());
    }
}

export const requirementsRoute: Routes = [
    {
        path: '',
        component: RequirementsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.requirements.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RequirementsDetailComponent,
        resolve: {
            requirements: RequirementsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.requirements.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RequirementsUpdateComponent,
        resolve: {
            requirements: RequirementsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.requirements.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RequirementsUpdateComponent,
        resolve: {
            requirements: RequirementsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.requirements.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const requirementsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: RequirementsDeletePopupComponent,
        resolve: {
            requirements: RequirementsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.requirements.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
