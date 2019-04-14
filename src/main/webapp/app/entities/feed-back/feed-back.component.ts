import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFeedBack } from 'app/shared/model/feed-back.model';
import { AccountService } from 'app/core';
import { FeedBackService } from './feed-back.service';

@Component({
    selector: 'jhi-feed-back',
    templateUrl: './feed-back.component.html'
})
export class FeedBackComponent implements OnInit, OnDestroy {
    feedBacks: IFeedBack[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected feedBackService: FeedBackService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.feedBackService
            .query()
            .pipe(
                filter((res: HttpResponse<IFeedBack[]>) => res.ok),
                map((res: HttpResponse<IFeedBack[]>) => res.body)
            )
            .subscribe(
                (res: IFeedBack[]) => {
                    this.feedBacks = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFeedBacks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFeedBack) {
        return item.id;
    }

    registerChangeInFeedBacks() {
        this.eventSubscriber = this.eventManager.subscribe('feedBackListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
