import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMetric } from 'app/shared/model/metric.model';

@Component({
    selector: 'jhi-metric-detail',
    templateUrl: './metric-detail.component.html'
})
export class MetricDetailComponent implements OnInit {
    metric: IMetric;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ metric }) => {
            this.metric = metric;
        });
    }

    previousState() {
        window.history.back();
    }
}
