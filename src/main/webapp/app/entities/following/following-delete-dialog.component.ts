import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFollowing } from 'app/shared/model/following.model';
import { FollowingService } from './following.service';

@Component({
    selector: 'jhi-following-delete-dialog',
    templateUrl: './following-delete-dialog.component.html'
})
export class FollowingDeleteDialogComponent {
    following: IFollowing;

    constructor(
        protected followingService: FollowingService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.followingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'followingListModification',
                content: 'Deleted an following'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-following-delete-popup',
    template: ''
})
export class FollowingDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ following }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FollowingDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.following = following;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/following', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/following', { outlets: { popup: null } }]);
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
