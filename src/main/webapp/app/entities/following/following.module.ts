import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ArqApplicationSharedModule } from 'app/shared';
import {
    FollowingComponent,
    FollowingDetailComponent,
    FollowingUpdateComponent,
    FollowingDeletePopupComponent,
    FollowingDeleteDialogComponent,
    followingRoute,
    followingPopupRoute
} from './';

const ENTITY_STATES = [...followingRoute, ...followingPopupRoute];

@NgModule({
    imports: [ArqApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FollowingComponent,
        FollowingDetailComponent,
        FollowingUpdateComponent,
        FollowingDeleteDialogComponent,
        FollowingDeletePopupComponent
    ],
    entryComponents: [FollowingComponent, FollowingUpdateComponent, FollowingDeleteDialogComponent, FollowingDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArqApplicationFollowingModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
