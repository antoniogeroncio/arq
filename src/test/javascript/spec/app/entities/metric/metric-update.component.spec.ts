/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ArqApplicationTestModule } from '../../../test.module';
import { MetricUpdateComponent } from 'app/entities/metric/metric-update.component';
import { MetricService } from 'app/entities/metric/metric.service';
import { Metric } from 'app/shared/model/metric.model';

describe('Component Tests', () => {
    describe('Metric Management Update Component', () => {
        let comp: MetricUpdateComponent;
        let fixture: ComponentFixture<MetricUpdateComponent>;
        let service: MetricService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [MetricUpdateComponent]
            })
                .overrideTemplate(MetricUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MetricUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MetricService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Metric(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.metric = entity;
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
                    const entity = new Metric();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.metric = entity;
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
