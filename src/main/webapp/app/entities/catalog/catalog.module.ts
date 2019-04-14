import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ArqApplicationSharedModule } from 'app/shared';
import {
    CatalogComponent,
    CatalogDetailComponent,
    CatalogUpdateComponent,
    CatalogDeletePopupComponent,
    CatalogDeleteDialogComponent,
    catalogRoute,
    catalogPopupRoute
} from './';

const ENTITY_STATES = [...catalogRoute, ...catalogPopupRoute];

@NgModule({
    imports: [ArqApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CatalogComponent,
        CatalogDetailComponent,
        CatalogUpdateComponent,
        CatalogDeleteDialogComponent,
        CatalogDeletePopupComponent
    ],
    entryComponents: [CatalogComponent, CatalogUpdateComponent, CatalogDeleteDialogComponent, CatalogDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArqApplicationCatalogModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
