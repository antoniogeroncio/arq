import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Version } from 'app/shared/model/version.model';
import { VersionService } from './version.service';
import { VersionComponent } from './version.component';
import { VersionDetailComponent } from './version-detail.component';
import { VersionUpdateComponent } from './version-update.component';
import { VersionDeletePopupComponent } from './version-delete-dialog.component';
import { IVersion } from 'app/shared/model/version.model';

@Injectable({ providedIn: 'root' })
export class VersionResolve implements Resolve<IVersion> {
    constructor(private service: VersionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVersion> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Version>) => response.ok),
                map((version: HttpResponse<Version>) => version.body)
            );
        }
        return of(new Version());
    }
}

export const versionRoute: Routes = [
    {
        path: '',
        component: VersionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.version.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: VersionDetailComponent,
        resolve: {
            version: VersionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.version.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: VersionUpdateComponent,
        resolve: {
            version: VersionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.version.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: VersionUpdateComponent,
        resolve: {
            version: VersionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.version.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const versionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: VersionDeletePopupComponent,
        resolve: {
            version: VersionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.version.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
