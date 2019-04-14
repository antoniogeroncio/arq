/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ArqApplicationTestModule } from '../../../test.module';
import { RequirementsDeleteDialogComponent } from 'app/entities/requirements/requirements-delete-dialog.component';
import { RequirementsService } from 'app/entities/requirements/requirements.service';

describe('Component Tests', () => {
    describe('Requirements Management Delete Component', () => {
        let comp: RequirementsDeleteDialogComponent;
        let fixture: ComponentFixture<RequirementsDeleteDialogComponent>;
        let service: RequirementsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [RequirementsDeleteDialogComponent]
            })
                .overrideTemplate(RequirementsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RequirementsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequirementsService);
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
