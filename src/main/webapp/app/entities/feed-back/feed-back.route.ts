import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FeedBack } from 'app/shared/model/feed-back.model';
import { FeedBackService } from './feed-back.service';
import { FeedBackComponent } from './feed-back.component';
import { FeedBackDetailComponent } from './feed-back-detail.component';
import { FeedBackUpdateComponent } from './feed-back-update.component';
import { FeedBackDeletePopupComponent } from './feed-back-delete-dialog.component';
import { IFeedBack } from 'app/shared/model/feed-back.model';

@Injectable({ providedIn: 'root' })
export class FeedBackResolve implements Resolve<IFeedBack> {
    constructor(private service: FeedBackService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFeedBack> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FeedBack>) => response.ok),
                map((feedBack: HttpResponse<FeedBack>) => feedBack.body)
            );
        }
        return of(new FeedBack());
    }
}

export const feedBackRoute: Routes = [
    {
        path: '',
        component: FeedBackComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.feedBack.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FeedBackDetailComponent,
        resolve: {
            feedBack: FeedBackResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.feedBack.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FeedBackUpdateComponent,
        resolve: {
            feedBack: FeedBackResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.feedBack.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FeedBackUpdateComponent,
        resolve: {
            feedBack: FeedBackResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.feedBack.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const feedBackPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FeedBackDeletePopupComponent,
        resolve: {
            feedBack: FeedBackResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arqApplicationApp.feedBack.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
