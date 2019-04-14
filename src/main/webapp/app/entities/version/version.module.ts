import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ArqApplicationSharedModule } from 'app/shared';
import {
    VersionComponent,
    VersionDetailComponent,
    VersionUpdateComponent,
    VersionDeletePopupComponent,
    VersionDeleteDialogComponent,
    versionRoute,
    versionPopupRoute
} from './';

const ENTITY_STATES = [...versionRoute, ...versionPopupRoute];

@NgModule({
    imports: [ArqApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VersionComponent,
        VersionDetailComponent,
        VersionUpdateComponent,
        VersionDeleteDialogComponent,
        VersionDeletePopupComponent
    ],
    entryComponents: [VersionComponent, VersionUpdateComponent, VersionDeleteDialogComponent, VersionDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArqApplicationVersionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
