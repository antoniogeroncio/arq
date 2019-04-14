import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFollowing } from 'app/shared/model/following.model';

@Component({
    selector: 'jhi-following-detail',
    templateUrl: './following-detail.component.html'
})
export class FollowingDetailComponent implements OnInit {
    following: IFollowing;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ following }) => {
            this.following = following;
        });
    }

    previousState() {
        window.history.back();
    }
}
