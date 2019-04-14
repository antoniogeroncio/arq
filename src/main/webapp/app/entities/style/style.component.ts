import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStyle } from 'app/shared/model/style.model';
import { AccountService } from 'app/core';
import { StyleService } from './style.service';

@Component({
    selector: 'jhi-style',
    templateUrl: './style.component.html'
})
export class StyleComponent implements OnInit, OnDestroy {
    styles: IStyle[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected styleService: StyleService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.styleService
            .query()
            .pipe(
                filter((res: HttpResponse<IStyle[]>) => res.ok),
                map((res: HttpResponse<IStyle[]>) => res.body)
            )
            .subscribe(
                (res: IStyle[]) => {
                    this.styles = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInStyles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStyle) {
        return item.id;
    }

    registerChangeInStyles() {
        this.eventSubscriber = this.eventManager.subscribe('styleListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
