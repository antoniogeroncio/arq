import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Following } from 'app/shared/model/following.model';
import { FollowingService } from './following.service';
import { FollowingComponent } from './following.component';
import { FollowingDetailComponent } from './following-detail.component';
import { FollowingUpdateComponent } from './following-update.component';
import { FollowingDeletePopupComponent } from './following-delete-dialog.component';
import { IFollowing } from 'app/shared/model/following.model';

@Injectable({ providedIn: 'root' })
export class FollowingResolve implements Resolve<IFollowing> {
    constructor(private service: FollowingService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFollowing> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Following>) => response.ok),
                map((following: HttpResponse<Following>) => following.body)
            );
        }
        return of(new Following());
    }
}

export const followingRoute: Routes = [
    {
        path: '',
        component: FollowingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.following.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FollowingDetailComponent,
        resolve: {
            following: FollowingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.following.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FollowingUpdateComponent,
        resolve: {
            following: FollowingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.following.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FollowingUpdateComponent,
        resolve: {
            following: FollowingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.following.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const followingPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FollowingDeletePopupComponent,
        resolve: {
            following: FollowingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.following.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
