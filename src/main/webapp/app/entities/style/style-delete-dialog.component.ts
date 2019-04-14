import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStyle } from 'app/shared/model/style.model';
import { StyleService } from './style.service';

@Component({
    selector: 'jhi-style-delete-dialog',
    templateUrl: './style-delete-dialog.component.html'
})
export class StyleDeleteDialogComponent {
    style: IStyle;

    constructor(protected styleService: StyleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.styleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'styleListModification',
                content: 'Deleted an style'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-style-delete-popup',
    template: ''
})
export class StyleDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ style }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StyleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.style = style;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/style', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/style', { outlets: { popup: null } }]);
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
