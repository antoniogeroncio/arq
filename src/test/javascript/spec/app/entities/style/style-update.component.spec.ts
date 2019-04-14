/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ArqApplicationTestModule } from '../../../test.module';
import { StyleUpdateComponent } from 'app/entities/style/style-update.component';
import { StyleService } from 'app/entities/style/style.service';
import { Style } from 'app/shared/model/style.model';

describe('Component Tests', () => {
    describe('Style Management Update Component', () => {
        let comp: StyleUpdateComponent;
        let fixture: ComponentFixture<StyleUpdateComponent>;
        let service: StyleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [StyleUpdateComponent]
            })
                .overrideTemplate(StyleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StyleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StyleService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Style(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.style = entity;
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
                    const entity = new Style();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.style = entity;
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
