import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMetric } from 'app/shared/model/metric.model';
import { MetricService } from './metric.service';

@Component({
    selector: 'jhi-metric-delete-dialog',
    templateUrl: './metric-delete-dialog.component.html'
})
export class MetricDeleteDialogComponent {
    metric: IMetric;

    constructor(protected metricService: MetricService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.metricService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'metricListModification',
                content: 'Deleted an metric'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-metric-delete-popup',
    template: ''
})
export class MetricDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ metric }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MetricDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.metric = metric;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/metric', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/metric', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
