import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ArqApplicationSharedModule } from 'app/shared';
import {
    RequirementsComponent,
    RequirementsDetailComponent,
    RequirementsUpdateComponent,
    RequirementsDeletePopupComponent,
    RequirementsDeleteDialogComponent,
    requirementsRoute,
    requirementsPopupRoute
} from './';

const ENTITY_STATES = [...requirementsRoute, ...requirementsPopupRoute];

@NgModule({
    imports: [ArqApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RequirementsComponent,
        RequirementsDetailComponent,
        RequirementsUpdateComponent,
        RequirementsDeleteDialogComponent,
        RequirementsDeletePopupComponent
    ],
    entryComponents: [
        RequirementsComponent,
        RequirementsUpdateComponent,
        RequirementsDeleteDialogComponent,
        RequirementsDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArqApplicationRequirementsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
