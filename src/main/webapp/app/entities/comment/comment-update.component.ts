import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IComment } from 'app/shared/model/comment.model';
import { CommentService } from './comment.service';
import { IUserSocial } from 'app/shared/model/user-social.model';
import { UserSocialService } from 'app/entities/user-social';
import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from 'app/entities/project';

@Component({
    selector: 'jhi-comment-update',
    templateUrl: './comment-update.component.html'
})
export class CommentUpdateComponent implements OnInit {
    comment: IComment;
    isSaving: boolean;

    usersocials: IUserSocial[];

    projects: IProject[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected commentService: CommentService,
        protected userSocialService: UserSocialService,
        protected projectService: ProjectService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ comment }) => {
            this.comment = comment;
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
        if (this.comment.id !== undefined) {
            this.subscribeToSaveResponse(this.commentService.update(this.comment));
        } else {
            this.subscribeToSaveResponse(this.commentService.create(this.comment));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IComment>>) {
        result.subscribe((res: HttpResponse<IComment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
