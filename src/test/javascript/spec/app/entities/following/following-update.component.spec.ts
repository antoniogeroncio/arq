/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ArqApplicationTestModule } from '../../../test.module';
import { FollowingUpdateComponent } from 'app/entities/following/following-update.component';
import { FollowingService } from 'app/entities/following/following.service';
import { Following } from 'app/shared/model/following.model';

describe('Component Tests', () => {
    describe('Following Management Update Component', () => {
        let comp: FollowingUpdateComponent;
        let fixture: ComponentFixture<FollowingUpdateComponent>;
        let service: FollowingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [FollowingUpdateComponent]
            })
                .overrideTemplate(FollowingUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FollowingUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FollowingService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Following(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.following = entity;
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
                    const entity = new Following();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.following = entity;
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
