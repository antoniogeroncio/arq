import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ArqApplicationSharedModule } from 'app/shared';
import {
    StyleComponent,
    StyleDetailComponent,
    StyleUpdateComponent,
    StyleDeletePopupComponent,
    StyleDeleteDialogComponent,
    styleRoute,
    stylePopupRoute
} from './';

const ENTITY_STATES = [...styleRoute, ...stylePopupRoute];

@NgModule({
    imports: [ArqApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [StyleComponent, StyleDetailComponent, StyleUpdateComponent, StyleDeleteDialogComponent, StyleDeletePopupComponent],
    entryComponents: [StyleComponent, StyleUpdateComponent, StyleDeleteDialogComponent, StyleDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArqApplicationStyleModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
