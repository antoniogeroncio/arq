import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFeedBack } from 'app/shared/model/feed-back.model';
import { FeedBackService } from './feed-back.service';

@Component({
    selector: 'jhi-feed-back-delete-dialog',
    templateUrl: './feed-back-delete-dialog.component.html'
})
export class FeedBackDeleteDialogComponent {
    feedBack: IFeedBack;

    constructor(protected feedBackService: FeedBackService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.feedBackService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'feedBackListModification',
                content: 'Deleted an feedBack'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-feed-back-delete-popup',
    template: ''
})
export class FeedBackDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ feedBack }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FeedBackDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.feedBack = feedBack;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/feed-back', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/feed-back', { outlets: { popup: null } }]);
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
