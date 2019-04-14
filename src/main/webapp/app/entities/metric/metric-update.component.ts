import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMetric } from 'app/shared/model/metric.model';
import { MetricService } from './metric.service';
import { IVersion } from 'app/shared/model/version.model';
import { VersionService } from 'app/entities/version';
import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from 'app/entities/project';
import { IUserSocial } from 'app/shared/model/user-social.model';
import { UserSocialService } from 'app/entities/user-social';

@Component({
    selector: 'jhi-metric-update',
    templateUrl: './metric-update.component.html'
})
export class MetricUpdateComponent implements OnInit {
    metric: IMetric;
    isSaving: boolean;

    versions: IVersion[];

    projects: IProject[];

    usersocials: IUserSocial[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected metricService: MetricService,
        protected versionService: VersionService,
        protected projectService: ProjectService,
        protected userSocialService: UserSocialService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ metric }) => {
            this.metric = metric;
        });
        this.versionService
            .query({ filter: 'metric-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IVersion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IVersion[]>) => response.body)
            )
            .subscribe(
                (res: IVersion[]) => {
                    if (!this.metric.version || !this.metric.version.id) {
                        this.versions = res;
                    } else {
                        this.versionService
                            .find(this.metric.version.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IVersion>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IVersion>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IVersion) => (this.versions = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
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
        if (this.metric.id !== undefined) {
            this.subscribeToSaveResponse(this.metricService.update(this.metric));
        } else {
            this.subscribeToSaveResponse(this.metricService.create(this.metric));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMetric>>) {
        result.subscribe((res: HttpResponse<IMetric>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackVersionById(index: number, item: IVersion) {
        return item.id;
    }

    trackProjectById(index: number, item: IProject) {
        return item.id;
    }

    trackUserSocialById(index: number, item: IUserSocial) {
        return item.id;
    }
}
