import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICatalog } from 'app/shared/model/catalog.model';
import { CatalogService } from './catalog.service';
import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from 'app/entities/project';
import { IUserSocial } from 'app/shared/model/user-social.model';
import { UserSocialService } from 'app/entities/user-social';

@Component({
    selector: 'jhi-catalog-update',
    templateUrl: './catalog-update.component.html'
})
export class CatalogUpdateComponent implements OnInit {
    catalog: ICatalog;
    isSaving: boolean;

    projects: IProject[];

    usersocials: IUserSocial[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected catalogService: CatalogService,
        protected projectService: ProjectService,
        protected userSocialService: UserSocialService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ catalog }) => {
            this.catalog = catalog;
        });
        this.projectService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProject[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProject[]>) => response.body)
            )
            .subscribe((res: IProject[]) => (this.projects = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.catalog.id !== undefined) {
            this.subscribeToSaveResponse(this.catalogService.update(this.catalog));
        } else {
            this.subscribeToSaveResponse(this.catalogService.create(this.catalog));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICatalog>>) {
        result.subscribe((res: HttpResponse<ICatalog>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProjectById(index: number, item: IProject) {
        return item.id;
    }

    trackUserSocialById(index: number, item: IUserSocial) {
        return item.id;
    }
}
