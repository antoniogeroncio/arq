import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICatalog } from 'app/shared/model/catalog.model';

@Component({
    selector: 'jhi-catalog-detail',
    templateUrl: './catalog-detail.component.html'
})
export class CatalogDetailComponent implements OnInit {
    catalog: ICatalog;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ catalog }) => {
            this.catalog = catalog;
        });
    }

    previousState() {
        window.history.back();
    }
}
