/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ArqApplicationTestModule } from '../../../test.module';
import { UserSocialDetailComponent } from 'app/entities/user-social/user-social-detail.component';
import { UserSocial } from 'app/shared/model/user-social.model';

describe('Component Tests', () => {
    describe('UserSocial Management Detail Component', () => {
        let comp: UserSocialDetailComponent;
        let fixture: ComponentFixture<UserSocialDetailComponent>;
        const route = ({ data: of({ userSocial: new UserSocial(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [UserSocialDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UserSocialDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserSocialDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.userSocial).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
