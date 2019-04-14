import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserSocial } from 'app/shared/model/user-social.model';
import { UserSocialService } from './user-social.service';

@Component({
    selector: 'jhi-user-social-delete-dialog',
    templateUrl: './user-social-delete-dialog.component.html'
})
export class UserSocialDeleteDialogComponent {
    userSocial: IUserSocial;

    constructor(
        protected userSocialService: UserSocialService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userSocialService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userSocialListModification',
                content: 'Deleted an userSocial'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-social-delete-popup',
    template: ''
})
export class UserSocialDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userSocial }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserSocialDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.userSocial = userSocial;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/user-social', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/user-social', { outlets: { popup: null } }]);
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
