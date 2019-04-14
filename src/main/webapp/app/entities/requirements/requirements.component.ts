import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRequirements } from 'app/shared/model/requirements.model';
import { AccountService } from 'app/core';
import { RequirementsService } from './requirements.service';

@Component({
    selector: 'jhi-requirements',
    templateUrl: './requirements.component.html'
})
export class RequirementsComponent implements OnInit, OnDestroy {
    requirements: IRequirements[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected requirementsService: RequirementsService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.requirementsService
            .query()
            .pipe(
                filter((res: HttpResponse<IRequirements[]>) => res.ok),
                map((res: HttpResponse<IRequirements[]>) => res.body)
            )
            .subscribe(
                (res: IRequirements[]) => {
                    this.requirements = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRequirements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRequirements) {
        return item.id;
    }

    registerChangeInRequirements() {
        this.eventSubscriber = this.eventManager.subscribe('requirementsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
