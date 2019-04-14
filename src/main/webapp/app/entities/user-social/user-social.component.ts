import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserSocial } from 'app/shared/model/user-social.model';
import { AccountService } from 'app/core';
import { UserSocialService } from './user-social.service';

@Component({
    selector: 'jhi-user-social',
    templateUrl: './user-social.component.html'
})
export class UserSocialComponent implements OnInit, OnDestroy {
    userSocials: IUserSocial[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected userSocialService: UserSocialService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.userSocialService
            .query()
            .pipe(
                filter((res: HttpResponse<IUserSocial[]>) => res.ok),
                map((res: HttpResponse<IUserSocial[]>) => res.body)
            )
            .subscribe(
                (res: IUserSocial[]) => {
                    this.userSocials = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserSocials();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserSocial) {
        return item.id;
    }

    registerChangeInUserSocials() {
        this.eventSubscriber = this.eventManager.subscribe('userSocialListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
