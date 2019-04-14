import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFeedBack } from 'app/shared/model/feed-back.model';
import { FeedBackService } from './feed-back.service';
import { IUserSocial } from 'app/shared/model/user-social.model';
import { UserSocialService } from 'app/entities/user-social';
import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from 'app/entities/project';

@Component({
    selector: 'jhi-feed-back-update',
    templateUrl: './feed-back-update.component.html'
})
export class FeedBackUpdateComponent implements OnInit {
    feedBack: IFeedBack;
    isSaving: boolean;

    usersocials: IUserSocial[];

    projects: IProject[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected feedBackService: FeedBackService,
        protected userSocialService: UserSocialService,
        protected projectService: ProjectService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ feedBack }) => {
            this.feedBack = feedBack;
        });
        this.userSocialService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUserSocial[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUserSocial[]>) => response.body)
            )
            .subscribe((res: IUserSocial[]) => (this.usersocials = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.projectService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProject[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProject[]>) => response.body)
            )
            .subscribe((res: IProject[]) => (this.projects = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.feedBack.id !== undefined) {
            this.subscribeToSaveResponse(this.feedBackService.update(this.feedBack));
        } else {
            this.subscribeToSaveResponse(this.feedBackService.create(this.feedBack));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFeedBack>>) {
        result.subscribe((res: HttpResponse<IFeedBack>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProjectById(index: number, item: IProject) {
        return item.id;
    }
}
