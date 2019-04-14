/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ArqApplicationTestModule } from '../../../test.module';
import { MetricComponent } from 'app/entities/metric/metric.component';
import { MetricService } from 'app/entities/metric/metric.service';
import { Metric } from 'app/shared/model/metric.model';

describe('Component Tests', () => {
    describe('Metric Management Component', () => {
        let comp: MetricComponent;
        let fixture: ComponentFixture<MetricComponent>;
        let service: MetricService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [MetricComponent],
                providers: []
            })
                .overrideTemplate(MetricComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MetricComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MetricService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Metric(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.metrics[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
