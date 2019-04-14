import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFollowing } from 'app/shared/model/following.model';
import { FollowingService } from './following.service';
import { IUserSocial } from 'app/shared/model/user-social.model';
import { UserSocialService } from 'app/entities/user-social';

@Component({
    selector: 'jhi-following-update',
    templateUrl: './following-update.component.html'
})
export class FollowingUpdateComponent implements OnInit {
    following: IFollowing;
    isSaving: boolean;

    usersocials: IUserSocial[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected followingService: FollowingService,
        protected userSocialService: UserSocialService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ following }) => {
            this.following = following;
        });
        this.userSocialService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUserSocial[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUserSocial[]>) => response.body)
            )
            .subscribe((res: IUserSocial[]) => (this.usersocials = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.following.id !== undefined) {
            this.subscribeToSaveResponse(this.followingService.update(this.following));
        } else {
            this.subscribeToSaveResponse(this.followingService.create(this.following));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFollowing>>) {
        result.subscribe((res: HttpResponse<IFollowing>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserSocialById(index: number, item: IUserSocial) {
        return item.id;
    }
}
