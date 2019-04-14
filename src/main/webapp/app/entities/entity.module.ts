import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'project',
                loadChildren: './project/project.module#ArqApplicationProjectModule'
            },
            {
                path: 'catalog',
                loadChildren: './catalog/catalog.module#ArqApplicationCatalogModule'
            },
            {
                path: 'metric',
                loadChildren: './metric/metric.module#ArqApplicationMetricModule'
            },
            {
                path: 'version',
                loadChildren: './version/version.module#ArqApplicationVersionModule'
            },
            {
                path: 'style',
                loadChildren: './style/style.module#ArqApplicationStyleModule'
            },
            {
                path: 'tag',
                loadChildren: './tag/tag.module#ArqApplicationTagModule'
            },
            {
                path: 'requirements',
                loadChildren: './requirements/requirements.module#ArqApplicationRequirementsModule'
            },
            {
                path: 'feed-back',
                loadChildren: './feed-back/feed-back.module#ArqApplicationFeedBackModule'
            },
            {
                path: 'comment',
                loadChildren: './comment/comment.module#ArqApplicationCommentModule'
            },
            {
                path: 'following',
                loadChildren: './following/following.module#ArqApplicationFollowingModule'
            },
            {
                path: 'message',
                loadChildren: './message/message.module#ArqApplicationMessageModule'
            },
            {
                path: 'user-social',
                loadChildren: './user-social/user-social.module#ArqApplicationUserSocialModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArqApplicationEntityModule {}
