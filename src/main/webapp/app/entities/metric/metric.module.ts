import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ArqApplicationSharedModule } from 'app/shared';
import {
    MetricComponent,
    MetricDetailComponent,
    MetricUpdateComponent,
    MetricDeletePopupComponent,
    MetricDeleteDialogComponent,
    metricRoute,
    metricPopupRoute
} from './';

const ENTITY_STATES = [...metricRoute, ...metricPopupRoute];

@NgModule({
    imports: [ArqApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MetricComponent, MetricDetailComponent, MetricUpdateComponent, MetricDeleteDialogComponent, MetricDeletePopupComponent],
    entryComponents: [MetricComponent, MetricUpdateComponent, MetricDeleteDialogComponent, MetricDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArqApplicationMetricModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
