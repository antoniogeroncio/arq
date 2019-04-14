import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStyle } from 'app/shared/model/style.model';

@Component({
    selector: 'jhi-style-detail',
    templateUrl: './style-detail.component.html'
})
export class StyleDetailComponent implements OnInit {
    style: IStyle;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ style }) => {
            this.style = style;
        });
    }

    previousState() {
        window.history.back();
    }
}
