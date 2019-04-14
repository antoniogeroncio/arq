import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ArqApplicationSharedModule } from 'app/shared';
import {
    FeedBackComponent,
    FeedBackDetailComponent,
    FeedBackUpdateComponent,
    FeedBackDeletePopupComponent,
    FeedBackDeleteDialogComponent,
    feedBackRoute,
    feedBackPopupRoute
} from './';

const ENTITY_STATES = [...feedBackRoute, ...feedBackPopupRoute];

@NgModule({
    imports: [ArqApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FeedBackComponent,
        FeedBackDetailComponent,
        FeedBackUpdateComponent,
        FeedBackDeleteDialogComponent,
        FeedBackDeletePopupComponent
    ],
    entryComponents: [FeedBackComponent, FeedBackUpdateComponent, FeedBackDeleteDialogComponent, FeedBackDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArqApplicationFeedBackModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
