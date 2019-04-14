import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiDataUtils } from 'ng-jhipster';
import { IVersion } from 'app/shared/model/version.model';
import { VersionService } from './version.service';

@Component({
    selector: 'jhi-version-update',
    templateUrl: './version-update.component.html'
})
export class VersionUpdateComponent implements OnInit {
    version: IVersion;
    isSaving: boolean;

    constructor(protected dataUtils: JhiDataUtils, protected versionService: VersionService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ version }) => {
            this.version = version;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.version.id !== undefined) {
            this.subscribeToSaveResponse(this.versionService.update(this.version));
        } else {
            this.subscribeToSaveResponse(this.versionService.create(this.version));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVersion>>) {
        result.subscribe((res: HttpResponse<IVersion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
