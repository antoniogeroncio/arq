import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserSocial } from 'app/shared/model/user-social.model';
import { UserSocialService } from './user-social.service';
import { UserSocialComponent } from './user-social.component';
import { UserSocialDetailComponent } from './user-social-detail.component';
import { UserSocialUpdateComponent } from './user-social-update.component';
import { UserSocialDeletePopupComponent } from './user-social-delete-dialog.component';
import { IUserSocial } from 'app/shared/model/user-social.model';

@Injectable({ providedIn: 'root' })
export class UserSocialResolve implements Resolve<IUserSocial> {
    constructor(private service: UserSocialService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserSocial> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<UserSocial>) => response.ok),
                map((userSocial: HttpResponse<UserSocial>) => userSocial.body)
            );
        }
        return of(new UserSocial());
    }
}

export const userSocialRoute: Routes = [
    {
        path: '',
        component: UserSocialComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.userSocial.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UserSocialDetailComponent,
        resolve: {
            userSocial: UserSocialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.userSocial.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: UserSocialUpdateComponent,
        resolve: {
            userSocial: UserSocialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.userSocial.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: UserSocialUpdateComponent,
        resolve: {
            userSocial: UserSocialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.userSocial.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userSocialPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: UserSocialDeletePopupComponent,
        resolve: {
            userSocial: UserSocialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.userSocial.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
