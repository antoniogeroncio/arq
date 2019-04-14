import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVersion } from 'app/shared/model/version.model';
import { VersionService } from './version.service';

@Component({
    selector: 'jhi-version-delete-dialog',
    templateUrl: './version-delete-dialog.component.html'
})
export class VersionDeleteDialogComponent {
    version: IVersion;

    constructor(protected versionService: VersionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.versionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'versionListModification',
                content: 'Deleted an version'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-version-delete-popup',
    template: ''
})
export class VersionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ version }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VersionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.version = version;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/version', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/version', { outlets: { popup: null } }]);
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
