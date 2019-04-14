/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ArqApplicationTestModule } from '../../../test.module';
import { UserSocialComponent } from 'app/entities/user-social/user-social.component';
import { UserSocialService } from 'app/entities/user-social/user-social.service';
import { UserSocial } from 'app/shared/model/user-social.model';

describe('Component Tests', () => {
    describe('UserSocial Management Component', () => {
        let comp: UserSocialComponent;
        let fixture: ComponentFixture<UserSocialComponent>;
        let service: UserSocialService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [UserSocialComponent],
                providers: []
            })
                .overrideTemplate(UserSocialComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserSocialComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserSocialService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UserSocial(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.userSocials[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
