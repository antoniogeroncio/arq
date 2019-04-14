import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IUserSocial } from 'app/shared/model/user-social.model';
import { UserSocialService } from './user-social.service';

@Component({
    selector: 'jhi-user-social-update',
    templateUrl: './user-social-update.component.html'
})
export class UserSocialUpdateComponent implements OnInit {
    userSocial: IUserSocial;
    isSaving: boolean;

    constructor(protected userSocialService: UserSocialService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userSocial }) => {
            this.userSocial = userSocial;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userSocial.id !== undefined) {
            this.subscribeToSaveResponse(this.userSocialService.update(this.userSocial));
        } else {
            this.subscribeToSaveResponse(this.userSocialService.create(this.userSocial));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserSocial>>) {
        result.subscribe((res: HttpResponse<IUserSocial>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
