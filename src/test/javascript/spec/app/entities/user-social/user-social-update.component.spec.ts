/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ArqApplicationTestModule } from '../../../test.module';
import { UserSocialUpdateComponent } from 'app/entities/user-social/user-social-update.component';
import { UserSocialService } from 'app/entities/user-social/user-social.service';
import { UserSocial } from 'app/shared/model/user-social.model';

describe('Component Tests', () => {
    describe('UserSocial Management Update Component', () => {
        let comp: UserSocialUpdateComponent;
        let fixture: ComponentFixture<UserSocialUpdateComponent>;
        let service: UserSocialService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [UserSocialUpdateComponent]
            })
                .overrideTemplate(UserSocialUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserSocialUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserSocialService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserSocial(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userSocial = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserSocial();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userSocial = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
