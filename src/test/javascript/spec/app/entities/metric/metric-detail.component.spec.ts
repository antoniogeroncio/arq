/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ArqApplicationTestModule } from '../../../test.module';
import { MetricDetailComponent } from 'app/entities/metric/metric-detail.component';
import { Metric } from 'app/shared/model/metric.model';

describe('Component Tests', () => {
    describe('Metric Management Detail Component', () => {
        let comp: MetricDetailComponent;
        let fixture: ComponentFixture<MetricDetailComponent>;
        const route = ({ data: of({ metric: new Metric(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [MetricDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MetricDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MetricDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.metric).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
