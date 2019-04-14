import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFollowing } from 'app/shared/model/following.model';
import { AccountService } from 'app/core';
import { FollowingService } from './following.service';

@Component({
    selector: 'jhi-following',
    templateUrl: './following.component.html'
})
export class FollowingComponent implements OnInit, OnDestroy {
    followings: IFollowing[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected followingService: FollowingService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.followingService
            .query()
            .pipe(
                filter((res: HttpResponse<IFollowing[]>) => res.ok),
                map((res: HttpResponse<IFollowing[]>) => res.body)
            )
            .subscribe(
                (res: IFollowing[]) => {
                    this.followings = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFollowings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFollowing) {
        return item.id;
    }

    registerChangeInFollowings() {
        this.eventSubscriber = this.eventManager.subscribe('followingListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
