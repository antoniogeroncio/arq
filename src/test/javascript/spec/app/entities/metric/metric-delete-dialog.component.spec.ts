/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ArqApplicationTestModule } from '../../../test.module';
import { MetricDeleteDialogComponent } from 'app/entities/metric/metric-delete-dialog.component';
import { MetricService } from 'app/entities/metric/metric.service';

describe('Component Tests', () => {
    describe('Metric Management Delete Component', () => {
        let comp: MetricDeleteDialogComponent;
        let fixture: ComponentFixture<MetricDeleteDialogComponent>;
        let service: MetricService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [MetricDeleteDialogComponent]
            })
                .overrideTemplate(MetricDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MetricDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MetricService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
