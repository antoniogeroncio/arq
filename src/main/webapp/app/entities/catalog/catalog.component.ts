import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICatalog } from 'app/shared/model/catalog.model';
import { AccountService } from 'app/core';
import { CatalogService } from './catalog.service';

@Component({
    selector: 'jhi-catalog',
    templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit, OnDestroy {
    catalogs: ICatalog[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected catalogService: CatalogService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.catalogService
            .query()
            .pipe(
                filter((res: HttpResponse<ICatalog[]>) => res.ok),
                map((res: HttpResponse<ICatalog[]>) => res.body)
            )
            .subscribe(
                (res: ICatalog[]) => {
                    this.catalogs = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCatalogs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICatalog) {
        return item.id;
    }

    registerChangeInCatalogs() {
        this.eventSubscriber = this.eventManager.subscribe('catalogListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
