import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IRequirements } from 'app/shared/model/requirements.model';
import { RequirementsService } from './requirements.service';

@Component({
    selector: 'jhi-requirements-update',
    templateUrl: './requirements-update.component.html'
})
export class RequirementsUpdateComponent implements OnInit {
    requirements: IRequirements;
    isSaving: boolean;

    constructor(protected requirementsService: RequirementsService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ requirements }) => {
            this.requirements = requirements;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.requirements.id !== undefined) {
            this.subscribeToSaveResponse(this.requirementsService.update(this.requirements));
        } else {
            this.subscribeToSaveResponse(this.requirementsService.create(this.requirements));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRequirements>>) {
        result.subscribe((res: HttpResponse<IRequirements>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
