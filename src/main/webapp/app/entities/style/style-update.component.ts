import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IStyle } from 'app/shared/model/style.model';
import { StyleService } from './style.service';
import { ITag } from 'app/shared/model/tag.model';
import { TagService } from 'app/entities/tag';

@Component({
    selector: 'jhi-style-update',
    templateUrl: './style-update.component.html'
})
export class StyleUpdateComponent implements OnInit {
    style: IStyle;
    isSaving: boolean;

    tags: ITag[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected styleService: StyleService,
        protected tagService: TagService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ style }) => {
            this.style = style;
        });
        this.tagService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITag[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITag[]>) => response.body)
            )
            .subscribe((res: ITag[]) => (this.tags = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.style.id !== undefined) {
            this.subscribeToSaveResponse(this.styleService.update(this.style));
        } else {
            this.subscribeToSaveResponse(this.styleService.create(this.style));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStyle>>) {
        result.subscribe((res: HttpResponse<IStyle>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTagById(index: number, item: ITag) {
        return item.id;
    }
}
