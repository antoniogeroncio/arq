import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserSocial } from 'app/shared/model/user-social.model';

@Component({
    selector: 'jhi-user-social-detail',
    templateUrl: './user-social-detail.component.html'
})
export class UserSocialDetailComponent implements OnInit {
    userSocial: IUserSocial;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userSocial }) => {
            this.userSocial = userSocial;
        });
    }

    previousState() {
        window.history.back();
    }
}
