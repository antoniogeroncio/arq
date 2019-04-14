import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRequirements } from 'app/shared/model/requirements.model';

@Component({
    selector: 'jhi-requirements-detail',
    templateUrl: './requirements-detail.component.html'
})
export class RequirementsDetailComponent implements OnInit {
    requirements: IRequirements;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ requirements }) => {
            this.requirements = requirements;
        });
    }

    previousState() {
        window.history.back();
    }
}
