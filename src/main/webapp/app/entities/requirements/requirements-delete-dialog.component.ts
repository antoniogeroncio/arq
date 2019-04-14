import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRequirements } from 'app/shared/model/requirements.model';
import { RequirementsService } from './requirements.service';

@Component({
    selector: 'jhi-requirements-delete-dialog',
    templateUrl: './requirements-delete-dialog.component.html'
})
export class RequirementsDeleteDialogComponent {
    requirements: IRequirements;

    constructor(
        protected requirementsService: RequirementsService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.requirementsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'requirementsListModification',
                content: 'Deleted an requirements'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-requirements-delete-popup',
    template: ''
})
export class RequirementsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ requirements }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RequirementsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.requirements = requirements;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/requirements', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/requirements', { outlets: { popup: null } }]);
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
