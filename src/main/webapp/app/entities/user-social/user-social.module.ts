import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ArqApplicationSharedModule } from 'app/shared';
import {
    UserSocialComponent,
    UserSocialDetailComponent,
    UserSocialUpdateComponent,
    UserSocialDeletePopupComponent,
    UserSocialDeleteDialogComponent,
    userSocialRoute,
    userSocialPopupRoute
} from './';

const ENTITY_STATES = [...userSocialRoute, ...userSocialPopupRoute];

@NgModule({
    imports: [ArqApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserSocialComponent,
        UserSocialDetailComponent,
        UserSocialUpdateComponent,
        UserSocialDeleteDialogComponent,
        UserSocialDeletePopupComponent
    ],
    entryComponents: [UserSocialComponent, UserSocialUpdateComponent, UserSocialDeleteDialogComponent, UserSocialDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArqApplicationUserSocialModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
