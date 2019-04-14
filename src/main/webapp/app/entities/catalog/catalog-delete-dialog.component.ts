import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICatalog } from 'app/shared/model/catalog.model';
import { CatalogService } from './catalog.service';

@Component({
    selector: 'jhi-catalog-delete-dialog',
    templateUrl: './catalog-delete-dialog.component.html'
})
export class CatalogDeleteDialogComponent {
    catalog: ICatalog;

    constructor(protected catalogService: CatalogService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.catalogService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'catalogListModification',
                content: 'Deleted an catalog'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-catalog-delete-popup',
    template: ''
})
export class CatalogDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ catalog }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CatalogDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.catalog = catalog;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/catalog', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/catalog', { outlets: { popup: null } }]);
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
