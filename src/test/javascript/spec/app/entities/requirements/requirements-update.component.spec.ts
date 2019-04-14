/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ArqApplicationTestModule } from '../../../test.module';
import { RequirementsUpdateComponent } from 'app/entities/requirements/requirements-update.component';
import { RequirementsService } from 'app/entities/requirements/requirements.service';
import { Requirements } from 'app/shared/model/requirements.model';

describe('Component Tests', () => {
    describe('Requirements Management Update Component', () => {
        let comp: RequirementsUpdateComponent;
        let fixture: ComponentFixture<RequirementsUpdateComponent>;
        let service: RequirementsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [RequirementsUpdateComponent]
            })
                .overrideTemplate(RequirementsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RequirementsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequirementsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Requirements(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.requirements = entity;
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
                    const entity = new Requirements();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.requirements = entity;
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
